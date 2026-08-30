import { io, Socket } from 'socket.io-client';
import type { RoomPublicInfo, ImpostorPublicState, GameName, ImpostorServerConfig } from '../../server/src/games/types';

export type { RoomPublicInfo, ImpostorPublicState, GameName, ImpostorServerConfig };

// ── Singleton socket ──────────────────────────────────────────────────────────

// En producción el proxy inverso sirve la API y Socket.IO desde el mismo origen.
// VITE_SERVER_URL sigue permitiendo apuntar a un servidor remoto cuando sea necesario.
const SERVER_URL = import.meta.env.VITE_SERVER_URL || window.location.origin;

// We type the socket loosely here since the strict generic types require TS 5+
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppSocket = Socket<any, any>;

let _socket: AppSocket | null = null;

export function getSocket(): AppSocket {
  if (!_socket) {
    _socket = io(SERVER_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
    });
  }
  return _socket;
}

// ── Typed helpers (wraps raw socket calls with callbacks) ─────────────────────

export const socketApi = {
  listRooms(): Promise<RoomPublicInfo[]> {
    return new Promise((resolve) => {
      getSocket().emit('rooms:list', resolve);
    });
  },

  createRoom(hostName: string, gameName: GameName): Promise<{ ok: true } | { ok: false; error: string }> {
    return new Promise((resolve) => {
      getSocket().emit('room:create', { hostName, gameName }, resolve);
    });
  },

  joinRoom(hostName: string, playerName: string): Promise<{ ok: true } | { ok: false; error: string }> {
    return new Promise((resolve) => {
      getSocket().emit('room:join', { hostName, playerName }, resolve);
    });
  },

  leaveRoom(hostName: string) {
    getSocket().emit('room:leave', { hostName });
  },

  startGame(hostName: string, config: ImpostorServerConfig): Promise<{ ok: true } | { ok: false; error: string }> {
    return new Promise((resolve) => {
      getSocket().emit('game:start', { hostName, config }, resolve);
    });
  },

  gameAction(hostName: string, action: string, data?: Record<string, unknown>) {
    getSocket().emit('game:action', { hostName, action, data });
  },
};
