export type ImpostorHintMode = 'none' | 'category' | 'similar_hint';
export type ImpostorWordDifficulty = 'facil' | 'medio' | 'dificil';

export interface ImpostorPlayer {
  id: string;
  name: string;
  isImpostor: boolean;
  score: number;
  hasViewedRole?: boolean;
}

export interface ImpostorWord {
  text: string;
  difficulty: ImpostorWordDifficulty;
}

export interface ImpostorCategory {
  id: string;
  name: string;
  icon: string;
  words: ImpostorWord[];
}

export interface ImpostorConfig {
  players: string[];
  impostorCount: number;
  selectedCategories: string[];
  selectedDifficulties: ImpostorWordDifficulty[];
  hintMode: ImpostorHintMode;
  timerDurationSeconds: number; // 0 = no timer
  customWords: string[];
}

export type ImpostorGameState = 'setup' | 'reveal' | 'discussion';

export interface ImpostorGameSession {
  state: ImpostorGameState;
  players: ImpostorPlayer[];
  currentRevealIndex: number;
  secretWord: string;
  currentCategoryName: string;
  startingPlayerIndex: number;
  impostorGuessedWord?: string;
  impostorWon?: boolean;
  votedPlayerId?: string;
  scores: Record<string, number>;
}
