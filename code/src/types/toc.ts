export type TocCardValue = 
  | 'A' 
  | '2' 
  | '3' 
  | '4' 
  | '5' 
  | '6' 
  | '7' 
  | '8' 
  | '9' 
  | '10' 
  | 'J' 
  | 'Q' 
  | 'K' 
  | 'Joker';

export interface TocCardRule {
  id: TocCardValue;
  name: string;
  shortEffect: string;
  fullEffect: string;
  isSpecial: boolean;
  canExitBase: boolean;
  strategyTip?: string;
  example?: string;
  highlightTag?: string;
}

export interface TocFaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'cards' | 'teams' | 'board' | 'general';
  tags: string[];
}
