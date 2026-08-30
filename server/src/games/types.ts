// ─────────────────────────────────────────────────────────────────────────────
// Shared types between server and client
// ─────────────────────────────────────────────────────────────────────────────

export type GameName = 'impostor';
export type GamePhase = 'waiting' | 'reveal' | 'discussion' | 'vote' | 'finished';
export type ImpostorWordDifficulty = 'facil' | 'medio' | 'dificil';

// ── Room ─────────────────────────────────────────────────────────────────────

export interface RoomPlayer {
  socketId: string;
  name: string;
  isHost: boolean;
  connected: boolean;
}

export interface RoomPublicInfo {
  /** Host name is the unique room ID */
  hostName: string;
  gameName: GameName;
  playerCount: number;
  maxPlayers: number;
  phase: GamePhase;
  createdAt: number;
}

// ── Impostor Game ─────────────────────────────────────────────────────────────

export interface ImpostorServerConfig {
  impostorCount: number;
  selectedCategories: string[];
  selectedDifficulties: ImpostorWordDifficulty[];
  hintMode: 'none' | 'category';
  timerDurationSeconds: number;
}

export interface ImpostorPlayerState {
  name: string;
  isImpostor: boolean;
  score: number;
}

export interface ImpostorPublicState {
  phase: GamePhase;
  players: Array<{ name: string; score: number }>;
  startingPlayerName: string;
  categoryName: string;
  /** Only populated in 'finished' phase */
  secretWord?: string;
  /** Only populated in 'finished' phase */
  result?: 'innocents_win' | 'impostor_guessed';
  votedPlayerName?: string;
  impostorNames?: string[]; // revealed after game ends
}

// ── Socket Events ─────────────────────────────────────────────────────────────

// Client → Server
export interface ClientToServerEvents {
  'rooms:list': (cb: (rooms: RoomPublicInfo[]) => void) => void;
  'room:create': (
    payload: { hostName: string; gameName: GameName },
    cb: (res: { ok: true } | { ok: false; error: string }) => void
  ) => void;
  'room:join': (
    payload: { hostName: string; playerName: string },
    cb: (res: { ok: true } | { ok: false; error: string }) => void
  ) => void;
  'room:leave': (payload: { hostName: string }) => void;
  'game:start': (
    payload: { hostName: string; config: ImpostorServerConfig },
    cb: (res: { ok: true } | { ok: false; error: string }) => void
  ) => void;
  'game:action': (payload: {
    hostName: string;
    action: 'go_to_vote' | 'cast_vote' | 'impostor_guess' | 'play_again';
    data?: Record<string, unknown>;
  }) => void;
}

// Server → Client
export interface ServerToClientEvents {
  'rooms:updated': (rooms: RoomPublicInfo[]) => void;
  'room:updated': (players: Array<{ name: string; isHost: boolean; connected: boolean }>) => void;
  'player:role': (role: {
    isImpostor: boolean;
    /** Only for non-impostors */
    secretWord?: string;
    /** Only for impostors when hintMode === 'category' */
    categoryHint?: string;
    categoryName: string;
  }) => void;
  'game:state': (state: ImpostorPublicState) => void;
  'error': (msg: string) => void;
}
