import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { roomManager } from './rooms/roomManager';
import {
  createImpostorGame,
  toDiscussion,
  toVote,
  castVote,
  toPublicState,
  ImpostorServerConfig,
} from './games/impostor';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  ImpostorPlayerState,
} from './games/types';

const PORT = process.env.PORT || 4000;

// ── Express ───────────────────────────────────────────────────────────────────

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, rooms: roomManager.getAllPublic().length });
});

app.get('/api/rooms', (_req, res) => {
  res.json(roomManager.getAllPublic());
});

// ── HTTP + Socket.io ──────────────────────────────────────────────────────────

const httpServer = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// ── Helper: broadcast updated room list to everyone ───────────────────────────

function broadcastRoomList() {
  io.emit('rooms:updated', roomManager.getAllPublic());
}

// ── Helper: broadcast updated room players to everyone in the room ─────────────

function broadcastRoomPlayers(hostName: string) {
  const room = roomManager.getRoom(hostName);
  if (!room) return;

  const connectedPlayers = room.players
    .filter((p) => p.connected)
    .map((p) => ({ name: p.name, isHost: p.isHost, connected: p.connected }));

  io.to(hostName.toLowerCase()).emit('room:updated', connectedPlayers);
}

// ── Socket events ─────────────────────────────────────────────────────────────

io.on('connection', (socket) => {
  console.log(`[+] Socket connected: ${socket.id}`);

  // ── List rooms ─────────────────────────────────────────────────────────────
  socket.on('rooms:list', (cb) => {
    cb(roomManager.getAllPublic());
  });

  // ── Create room ───────────────────────────────────────────────────────────
  socket.on('room:create', ({ hostName, gameName }, cb) => {
    const result = roomManager.create(hostName, socket.id, gameName);
    if (!result.ok) {
      cb({ ok: false, error: result.error });
      return;
    }
    const key = hostName.toLowerCase();
    socket.join(key);
    console.log(`[room] Created: "${hostName}"`);
    broadcastRoomList();
    broadcastRoomPlayers(hostName);
    cb({ ok: true });
  });

  // ── Join room ─────────────────────────────────────────────────────────────
  socket.on('room:join', ({ hostName, playerName }, cb) => {
    const result = roomManager.join(hostName, socket.id, playerName);
    if (!result.ok) {
      cb({ ok: false, error: result.error });
      return;
    }
    const key = hostName.toLowerCase();
    socket.join(key);
    console.log(`[room] "${playerName}" joined "${hostName}"`);
    broadcastRoomList();
    broadcastRoomPlayers(hostName);
    cb({ ok: true });
  });

  // ── Leave room ────────────────────────────────────────────────────────────
  socket.on('room:leave', ({ hostName }) => {
    socket.leave(hostName.toLowerCase());
    roomManager.leave(socket.id);
    broadcastRoomList();
    broadcastRoomPlayers(hostName);
    console.log(`[room] Socket ${socket.id} left "${hostName}"`);
  });

  // ── Start game ────────────────────────────────────────────────────────────
  socket.on('game:start', ({ hostName, config }, cb) => {
    const room = roomManager.getRoom(hostName);
    if (!room) { cb({ ok: false, error: 'Sala no encontrada.' }); return; }

    const hostPlayer = room.players.find((p) => p.socketId === socket.id);
    if (!hostPlayer?.isHost) { cb({ ok: false, error: 'Solo el anfitrión puede iniciar la partida.' }); return; }
    if (room.players.filter((p) => p.connected).length < 3) {
      cb({ ok: false, error: 'Se necesitan al menos 3 jugadores para empezar.' }); return;
    }

    const playerNames = room.players.filter((p) => p.connected).map((p) => p.name);
    const gameState = createImpostorGame(playerNames, config);

    roomManager.updateGameState(hostName, gameState);
    roomManager.setImpostorConfig(hostName, config);

    // Emit public state to everyone in the room
    io.to(hostName.toLowerCase()).emit('game:state', toPublicState(gameState));

    // Emit private role to each player individually
    for (const player of room.players.filter((p) => p.connected)) {
      const playerState = gameState.players.find((ps) => ps.name === player.name);
      if (!playerState) continue;

      const rolePayload = playerState.isImpostor
        ? {
            isImpostor: true,
            categoryHint: config.hintMode === 'category' ? gameState.categoryName : undefined,
            categoryName: gameState.categoryName,
          }
        : {
            isImpostor: false,
            secretWord: gameState.secretWord,
            categoryName: gameState.categoryName,
          };

      io.to(player.socketId).emit('player:role', rolePayload);
    }

    broadcastRoomList();
    console.log(`[game] Impostor started in "${hostName}", word: "${gameState.secretWord}"`);
    cb({ ok: true });
  });

  // ── Game action ───────────────────────────────────────────────────────────
  socket.on('game:action', ({ hostName, action, data }) => {
    const room = roomManager.getRoom(hostName);
    if (!room?.gameState) return;

    let newState = room.gameState;

    switch (action) {
      case 'go_to_vote':
        newState = toVote(newState);
        break;

      case 'cast_vote': {
        const votedPlayerName = data?.votedPlayerName as string | undefined;
        if (!votedPlayerName) return;
        // First update phase to vote if not already there
        newState = castVote(newState, votedPlayerName);
        break;
      }

      case 'impostor_guess': {
        // Called after cast_vote when impostor was caught
        const guessedRight = data?.guessedRight as boolean | undefined;
        const votedName = newState.votedPlayerName;
        if (!votedName) return;
        newState = castVote(room.gameState, votedName, guessedRight ?? false);
        break;
      }

      case 'play_again': {
        // Restart with the same players and config
        if (!room.impostorConfig) return;
        const playerNames = room.players.filter((p) => p.connected).map((p) => p.name);
        // Carry over scores
        const oldScores: Record<string, number> = {};
        newState.players.forEach((p: ImpostorPlayerState) => { oldScores[p.name] = p.score; });
        newState = createImpostorGame(playerNames, room.impostorConfig);
        newState.players = newState.players.map((p: ImpostorPlayerState) => ({
          ...p,
          score: (oldScores[p.name] ?? 0) + p.score,
        }));

        // Emit new private roles
        for (const player of room.players.filter((p) => p.connected)) {
          const ps = newState.players.find((x: ImpostorPlayerState) => x.name === player.name);
          if (!ps) continue;
          const rolePayload = ps.isImpostor
            ? {
                isImpostor: true,
                categoryHint: room.impostorConfig.hintMode === 'category' ? newState.categoryName : undefined,
                categoryName: newState.categoryName,
              }
            : {
                isImpostor: false,
                secretWord: newState.secretWord,
                categoryName: newState.categoryName,
              };
          io.to(player.socketId).emit('player:role', rolePayload);
        }
        break;
      }
    }

    roomManager.updateGameState(hostName, newState);
    io.to(hostName.toLowerCase()).emit('game:state', toPublicState(newState));
    broadcastRoomList();
  });

  // ── Disconnect ────────────────────────────────────────────────────────────
  socket.on('disconnect', () => {
    const room = roomManager.leave(socket.id);
    if (room) {
      broadcastRoomPlayers(room.hostName);
    }
    broadcastRoomList();
    console.log(`[-] Socket disconnected: ${socket.id}`);
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────

httpServer.listen(PORT, () => {
  console.log(`✅ MesaHub server running on http://localhost:${PORT}`);
});
