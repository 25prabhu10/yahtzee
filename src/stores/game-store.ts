import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { defaultPlayerName } from '@/lib/constants';

export interface Die {
  id: number;
  value: number;
  isHeld: boolean;
}

export type Category =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '3x'
  | '4x'
  | '🏠'
  | 'Small'
  | 'Large'
  | 'Yahtzee'
  | '?';

export interface Player {
  name: string;
  scores: Record<Category, number | null>;
  totalScore: number;
  upperSectionScore: number;
  yahtzeeBonus: number;
  yahtzeeCount: number;
}

type GameState = {
  dice: Die[];
  diceValues: number[];
  highestScore: number;
  playAudio: boolean;
  player: Player;
  rollsLeft: number;
  selectedCategory: Category | null;
};

type GameActions = {
  resetGame: () => void;
  rollDice: () => void;
  scoreCategory: () => void;
  setHighestScore: (newScore: number) => void;
  setPlayerName: (name: string) => void;
  setSelectedCategory: (cat: Category) => void;
  toggleAudio: () => void;
  toggleHold: (id: number) => void;
};

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

export function calculateScore(
  category: Category,
  values: number[],
  hasYahtzeeBonus: boolean
): number {
  const counts = Array(7).fill(0);
  values.forEach((v) => counts[v]++);

  const isYahtzeeBonus = counts.some((c) => c === 5);

  switch (category) {
    case '1':
      return values.filter((v) => v === 1).reduce((a, b) => a + b, 0);
    case '2':
      return values.filter((v) => v === 2).reduce((a, b) => a + b, 0);
    case '3':
      return values.filter((v) => v === 3).reduce((a, b) => a + b, 0);
    case '4':
      return values.filter((v) => v === 4).reduce((a, b) => a + b, 0);
    case '5':
      return values.filter((v) => v === 5).reduce((a, b) => a + b, 0);
    case '6':
      return values.filter((v) => v === 6).reduce((a, b) => a + b, 0);
    case '3x':
      return counts.some((c) => c >= 3) ? values.reduce((a, b) => a + b, 0) : 0;
    case '4x':
      return counts.some((c) => c >= 4) ? values.reduce((a, b) => a + b, 0) : 0;
    case '🏠':
      return isYahtzeeBonus && hasYahtzeeBonus
        ? 25
        : counts.includes(3) && counts.includes(2)
          ? 25
          : 0;
    case 'Small':
      return isYahtzeeBonus && hasYahtzeeBonus
        ? 30
        : /1234|2345|3456/.test(counts.map((c, i) => (c > 0 ? i : '')).join(''))
          ? 30
          : 0;
    case 'Large':
      return isYahtzeeBonus && hasYahtzeeBonus
        ? 40
        : /12345|23456/.test(counts.map((c, i) => (c > 0 ? i : '')).join(''))
          ? 40
          : 0;
    case 'Yahtzee':
      return isYahtzeeBonus ? 50 : 0;
    case '?':
      return values.reduce((a, b) => a + b, 0);
    default:
      return 0;
  }
}

function calculateTotalScore(player: Player): number {
  let total = 0;
  let upperSectionSum = 0;

  // Upper section
  const upperCategories: Category[] = ['1', '2', '3', '4', '5', '6'];
  upperCategories.forEach((category) => {
    const score = player.scores[category];
    if (score !== null) {
      total += score;
      upperSectionSum += score;
    }
  });

  // Upper section bonus
  if (upperSectionSum >= 63) {
    total += 35;
  }

  // Lower section
  const lowerCategories: Category[] = ['3x', '4x', '🏠', 'Small', 'Large', 'Yahtzee', '?'];
  lowerCategories.forEach((category) => {
    const score = player.scores[category];
    if (score !== null) {
      total += score;
    }
  });

  return total;
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function getDice() {
  return Array(5)
    .fill(null)
    .map((_, i) => ({ id: i, isHeld: false, value: i }));
}

const initialGameState: GameState = {
  dice: getDice(),
  diceValues: getDice().map((d) => d.value),
  highestScore: 0,
  playAudio: true,
  player: {
    name: defaultPlayerName,
    scores: {
      '?': null,
      '1': null,
      '2': null,
      '3': null,
      '3x': null,
      '4': null,
      '4x': null,
      '5': null,
      '6': null,
      Large: null,
      Small: null,
      Yahtzee: null,
      '🏠': null,
    },
    totalScore: 0,
    upperSectionScore: 0,
    yahtzeeBonus: 0,
    yahtzeeCount: 0,
  },
  rollsLeft: 3,
  selectedCategory: null,
};

export const useGameStore = create<GameState & GameActions>()(
  persist(
    combine(initialGameState, (set, get) => ({
      resetGame: () =>
        set((state) => ({
          ...initialGameState,
          highestScore: state.highestScore,
          playAudio: state.playAudio,
          player: { ...initialGameState.player, name: state.player.name },
        })),
      rollDice: () => {
        const { rollsLeft, dice } = get();

        // if no rolls left, do nothing
        if (rollsLeft === 0) {
          return;
        }

        const newDice = dice.map((die) => (die.isHeld ? die : { ...die, value: rollDie() }));

        set(() => ({
          dice: newDice,
          diceValues: newDice.map((d) => d.value),
          rollsLeft: rollsLeft > 0 ? rollsLeft - 1 : 0,
        }));
      },
      scoreCategory: () => {
        const { player, diceValues, selectedCategory, dice, highestScore } = get();
        const category = selectedCategory;
        if (category === null || player.scores[category] !== null) return;

        const score = calculateScore(category, diceValues, player.yahtzeeCount > 0);

        const isYahtzee = diceValues.every((value) => value === dice[0].value);

        let bonus = 0;
        let yahtzeeCount = player.yahtzeeCount;

        if (isYahtzee) {
          if (yahtzeeCount >= 1) {
            bonus = 50;
          }
          yahtzeeCount += 1;
        }

        const updatedPlayer = {
          ...player,
          scores: { ...player.scores, [category]: score },
          yahtzeeCount,
        };

        updatedPlayer.yahtzeeBonus += bonus;
        updatedPlayer.totalScore = calculateTotalScore(updatedPlayer) + updatedPlayer.yahtzeeBonus;
        updatedPlayer.upperSectionScore = ['1', '2', '3', '4', '5', '6'].reduce(
          (sum, cat) => sum + (updatedPlayer.scores[cat as Category] || 0),
          0
        );

        set({
          dice: getDice(),
          diceValues: getDice().map((d) => d.value),
          highestScore:
            updatedPlayer.totalScore > highestScore ? updatedPlayer.totalScore : highestScore,
          player: updatedPlayer,
          rollsLeft: 3,
          selectedCategory: null,
        });
      },
      setHighestScore: (newScore) => set({ highestScore: newScore }),
      setPlayerName: (name: string) =>
        set((state) => ({
          player: {
            ...state.player,
            name,
          },
        })),
      setSelectedCategory: (selectedCategory: Category) => set({ selectedCategory }),
      toggleAudio: () => set((state) => ({ playAudio: !state.playAudio })),
      toggleHold: (id) =>
        set((state) => ({
          dice: state.dice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die)),
        })),
    })),
    {
      name: 'game-storage',
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);
