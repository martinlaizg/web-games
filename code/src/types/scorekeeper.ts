export type ScorekeeperPhase = 'setup' | 'playing' | 'summary';
export type CounterKind = 'points' | 'life' | 'resource';
export type VictoryMode = 'highest' | 'lowest' | 'target';
export type PlayerStatus = 'active' | 'turn' | 'paused' | 'eliminated' | 'winner';

export interface PlayerProfile {
  id: string;
  name: string;
  avatar: string;
  color: string;
  stats: { gamesPlayed: number; wins: number };
}

export interface CounterConfig {
  id: string;
  name: string;
  kind: CounterKind;
  initialValue: number;
  hidden: boolean;
  eliminationAtZero?: boolean;
}

export interface ScorekeeperConfig {
  name: string;
  mainCounter: CounterConfig;
  secondaryCounters: CounterConfig[];
  scoreCategories: string[];
  victoryMode: VictoryMode;
  targetScore?: number;
  phases: string[];
  turnSeconds: number;
}

export interface ScorekeeperPlayer {
  id: string;
  profileId?: string;
  name: string;
  avatar: string;
  color: string;
  role: string;
  status: PlayerStatus;
  counters: Record<string, number>;
  scoreCategories: Record<string, number>;
  turnSeconds: number;
}

export interface ScorekeeperAction {
  id: string;
  label: string;
  at: string;
  before: Pick<ScorekeeperSession, 'players' | 'turnIndex' | 'round' | 'phaseIndex'>;
  after: Pick<ScorekeeperSession, 'players' | 'turnIndex' | 'round' | 'phaseIndex'>;
}

export interface ScorekeeperSession {
  id: string;
  phase: ScorekeeperPhase;
  config: ScorekeeperConfig;
  players: ScorekeeperPlayer[];
  turnIndex: number;
  round: number;
  phaseIndex: number;
  startedAt: string;
  elapsedSeconds: number;
  isPaused: boolean;
  history: ScorekeeperAction[];
  redoStack: ScorekeeperAction[];
  diceResult?: { sides: number; rolls: number[]; at: string };
  winnerIds: string[];
}

export interface ScorekeeperPreset {
  id: string;
  name: string;
  config: ScorekeeperConfig;
  builtIn?: boolean;
}

export interface CompletedScorekeeperGame {
  id: string;
  name: string;
  completedAt: string;
  durationSeconds: number;
  players: ScorekeeperPlayer[];
  winnerIds: string[];
}
