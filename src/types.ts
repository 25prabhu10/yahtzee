export type UpperSection = '1' | '2' | '3' | '4' | '5' | '6';
export type LowerSection = '3x' | '4x' | '🏠' | 'Small' | 'Large' | 'Yahtzee' | '?';
export type Category = UpperSection | LowerSection;

export type Scores = Record<Category, number | null>;

export interface Player {
  name: string;
  scores: Scores;
  totalScore: number;
  upperSectionScore: number;
  yahtzeeBonus: number;
  yahtzeeCount: number;
}
