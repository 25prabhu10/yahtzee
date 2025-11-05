import confetti from 'canvas-confetti';
import { AnimatePresence } from 'motion/react';
import { type RefObject, useEffect, useRef } from 'react';

import { useGameStore } from '@/stores/game-store';

import { Dice } from './dice';

type DiceRowProps = {
  rollsLeft: number;
};

const squares = [0, 1, 2, 3, 4];

export function DiceRow({ rollsLeft }: DiceRowProps) {
  const diceRowRef = useRef<HTMLDivElement>(null);
  const toggleHold = useGameStore((state) => state.toggleHold);
  const achievedYahtzee = useGameStore((state) => {
    return state.dice.every((value) => value === state.dice[0]);
  });

  useEffect(() => {
    if (!achievedYahtzee) {
      return;
    }

    async function throwConfetti(element: RefObject<HTMLDivElement | null>) {
      try {
        if (element.current) {
          const rect = element.current.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;

          await confetti({
            origin: {
              x: x / window.innerWidth,
              y: y / window.innerHeight,
            },
          });
        }
      } catch (error) {
        console.error('Confetti button error:', error);
      }
    }

    throwConfetti(diceRowRef);
  }, [achievedYahtzee]);

  const diceSquares = squares.map((idx) => <Dice index={idx} key={idx} toggleHold={toggleHold} />);

  return (
    <div
      className="w-full grid grid-cols-5 grid-rows-1 gap-1 xs:gap-2 md:gap-3 items-center justify-center"
      ref={diceRowRef}
    >
      {rollsLeft === 3 ? (
        squares.map((idx) => (
          <div
            className="aspect-square text-xs xs:text-sm text-blue-800 font-bold rounded-md shadow-inner border border-dashed border-blue-800 transition inline-flex justify-center items-center p-4 bg-blue-50 max-h-[calc(100vh/12)]"
            key={idx}
          >
            READY
          </div>
        ))
      ) : (
        <AnimatePresence>{rollsLeft !== 3 && diceSquares}</AnimatePresence>
      )}
    </div>
  );
}
