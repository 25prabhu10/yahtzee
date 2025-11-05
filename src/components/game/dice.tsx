import { motion } from 'motion/react';

import { getDisplayContent } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';

type DiceProps = {
  index: number;
  toggleHold: (id: number) => void;
};

export function Dice({ index, toggleHold }: DiceProps) {
  const die = useGameStore((state) => state.dice[index]);
  const isHeld = useGameStore((state) => state.heldDice[index]);

  function handleToggle() {
    toggleHold(index);
  }

  return (
    <motion.button
      animate={{ opacity: 1, rotateX: 0 }}
      className={`aspect-square font-bold rounded-md cursor-pointer shadow-md transition-transform duration-200 max-h-[calc(100vh/12)]  justify-self-center ${
        isHeld ? 'bg-orange-500 ring-4 ring-orange-200/50' : 'bg-orange-50 hover:-translate-y-1'
      }`}
      exit={{ opacity: 0, rotateX: 0 }}
      initial={{ opacity: 0, rotateX: -50 }}
      onClick={handleToggle}
      transition={{
        duration: 0.5,
        type: 'spring',
      }}
    >
      {getDisplayContent(`${die}`, 0, isHeld)}
    </motion.button>
  );
}
