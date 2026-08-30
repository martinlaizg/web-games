export type GameCategory = 'party' | 'deduction' | 'rules' | 'utility' | 'strategy';

export interface GameInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: GameCategory;
  players: string;
  duration: string;
  icon: string;
  badge?: string;
  tags: string[];
}
