import type { Category, UpperSection } from '@/types';

export const defaultPlayerName = 'Guest Roller';

export const categories: Category[] = [
  '1',
  '3x',
  '2',
  '4x',
  '3',
  '🏠',
  '4',
  'Small',
  '5',
  'Large',
  '6',
  'Yahtzee',
  '?',
] as const;

export const diceValues: UpperSection[] = ['1', '2', '3', '4', '5', '6'] as const;
export const initialDice = [1, 2, 3, 4, 5];
export const initialHeldDice = initialDice.map(() => false);
