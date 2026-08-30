import { GameName, GamePhase, RoomPlayer, RoomPublicInfo } from '../games/types';
import { ImpostorGameState, ImpostorServerConfig } from '../games/impostor';

// ── Room state ────────────────────────────────────────────────────────────────

export interface RoomState {
  hostName: string;
  gameName: GameName;
  players: RoomPlayer[];
  phase: GamePhase;
  maxPlayers: number;
  createdAt: number;
  lastActivity: number;
  gameState?: ImpostorGameState;
  impostorConfig?: ImpostorServerConfig;
}

// ── Manager ───────────────────────────────────────────────────────────────────

const ROOM_TTL_MS = 60 * 60 * 1000; // 1 hour inactivity

class RoomManager {
  private rooms = new Map<string, RoomState>();

  // ── Queries ────────────────────────────────────────────────────────────────

  getRoom(hostName: string): RoomState | undefined {
    return this.rooms.get(hostName.toLowerCase());
  }

  getAllPublic(): RoomPublicInfo[] {
    return Array.from(this.rooms.values()).map((r) => this.toPublic(r));
  }

  getRoomBySocketId(socketId: string): RoomState | undefined {
    for (const room of this.rooms.values()) {
      if (room.players.some((p) => p.socketId === socketId)) return room;
    }
    return undefined;
  }

  // ── Mutations ──────────────────────────────────────────────────────────────

  create(hostName: string, socketId: string, gameName: GameName): { ok: true; room: RoomState } | { ok: false; error: string } {
    const key = hostName.toLowerCase();

    if (this.rooms.has(key)) {
      return { ok: false, error: `Ya existe una sala creada por "${hostName}". Elige otro nombre.` };
    }

    const room: RoomState = {
      hostName,
      gameName,
      players: [{ socketId, name: hostName, isHost: true, connected: true }],
      phase: 'waiting',
      maxPlayers: 20,
      createdAt: Date.now(),
      lastActivity: Date.now(),
    };

    this.rooms.set(key, room);
    return { ok: true, room };
  }

  join(hostName: string, socketId: string, playerName: string): { ok: true; room: RoomState } | { ok: false; error: string } {
    const key = hostName.toLowerCase();
    const room = this.rooms.get(key);

    if (!room) return { ok: false, error: `La sala de "${hostName}" no existe.` };
    if (room.phase !== 'waiting') return { ok: false, error: 'La partida ya ha comenzado.' };
    if (room.players.some((p) => p.name.toLowerCase() === playerName.toLowerCase() && p.connected)) {
      return { ok: false, error: `El nombre "${playerName}" ya está en uso en esta sala.` };
    }

    // If same name reconnecting (disconnected), update socketId
    const existing = room.players.find((p) => p.name.toLowerCase() === playerName.toLowerCase());
    if (existing) {
      existing.socketId = socketId;
      existing.connected = true;
    } else {
      room.players.push({ socketId, name: playerName, isHost: false, connected: true });
    }

    room.lastActivity = Date.now();
    return { ok: true, room };
  }

  leave(socketId: string): RoomState | undefined {
    const room = this.getRoomBySocketId(socketId);
    if (!room) return undefined;

    const player = room.players.find((p) => p.socketId === socketId);
    if (player) player.connected = false;

    room.lastActivity = Date.now();

    // If host disconnects and no one is connected, delete the room
    const anyConnected = room.players.some((p) => p.connected);
    if (!anyConnected) {
      this.rooms.delete(room.hostName.toLowerCase());
      return undefined; // room is gone
    }

    // If host left, promote next connected player
    if (player?.isHost) {
      const nextHost = room.players.find((p) => p.connected && !p.isHost);
      if (nextHost) {
        player.isHost = false;
        nextHost.isHost = true;
        room.hostName = nextHost.name;
      }
    }

    return room;
  }

  updateGameState(hostName: string, gameState: ImpostorGameState): void {
    const room = this.rooms.get(hostName.toLowerCase());
    if (room) {
      room.gameState = gameState;
      room.phase = gameState.phase;
      room.lastActivity = Date.now();
    }
  }

  setImpostorConfig(hostName: string, config: ImpostorServerConfig): void {
    const room = this.rooms.get(hostName.toLowerCase());
    if (room) room.impostorConfig = config;
  }

  // ── Cleanup ────────────────────────────────────────────────────────────────

  pruneStale(): void {
    const now = Date.now();
    for (const [key, room] of this.rooms.entries()) {
      if (now - room.lastActivity > ROOM_TTL_MS) {
        this.rooms.delete(key);
      }
    }
  }

  // ── Utils ──────────────────────────────────────────────────────────────────

  private toPublic(room: RoomState): RoomPublicInfo {
    return {
      hostName: room.hostName,
      gameName: room.gameName,
      playerCount: room.players.filter((p) => p.connected).length,
      maxPlayers: room.maxPlayers,
      phase: room.phase,
      createdAt: room.createdAt,
    };
  }
}

export const roomManager = new RoomManager();

// Prune stale rooms every 10 minutes
setInterval(() => roomManager.pruneStale(), 10 * 60 * 1000);
