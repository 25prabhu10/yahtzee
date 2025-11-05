import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { defaultPlayerName, initialDice, initialHeldDice } from '@/lib/constants';
import {
  calculateScore,
  lowerSectionTotalScore,
  rollDie,
  upperSectionTotalScore,
} from '@/lib/utils';
import type { Category, Player } from '@/types';

type GameState = {
  dice: number[];
  heldDice: boolean[];
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

const initialGameState: GameState = {
  dice: initialDice,
  heldDice: initialHeldDice,
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
        const { rollsLeft, dice, heldDice } = get();

        // if no rolls left, do nothing
        if (rollsLeft === 0) {
          return;
        }

        const newDice = dice.map((die, idx) => (heldDice[idx] ? die : rollDie()));

        set(() => ({
          dice: newDice,
          rollsLeft: rollsLeft > 0 ? rollsLeft - 1 : 0,
        }));
      },
      scoreCategory: () => {
        const { player, selectedCategory, dice, highestScore } = get();
        const category = selectedCategory;
        if (category === null || player.scores[category] !== null) return;

        const score = calculateScore(category, dice, player.yahtzeeCount > 0);

        const isYahtzee = dice.every((value) => value === dice[0]);

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
        updatedPlayer.upperSectionScore = upperSectionTotalScore(updatedPlayer.scores);

        // Upper section bonus
        let upperSectionBonus = 0;
        if (updatedPlayer.upperSectionScore >= 63) {
          upperSectionBonus += 35;
        }

        updatedPlayer.totalScore =
          lowerSectionTotalScore(updatedPlayer.scores) +
          updatedPlayer.upperSectionScore +
          upperSectionBonus +
          updatedPlayer.yahtzeeBonus;

        set({
          dice: initialDice,
          heldDice: initialHeldDice,
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
          heldDice: state.heldDice.map((x, idx) => (idx === id ? !x : x)),
        })),
    })),
    {
      name: 'game-storage',
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);
