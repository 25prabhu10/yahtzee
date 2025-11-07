import { motion } from 'motion/react';

import { getDisplayContent } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';
import type { Category } from '@/types';

type DiceProps = {
  index: number;
  toggleHold: (id: number) => void;
};

export function Dice({ index, toggleHold }: DiceProps) {
  const die = useGameStore((state) => state.dice[index]);
  const isHeld = useGameStore((state) => state.heldDice[index]);
  const rollsLeft = useGameStore((state) => state.rollsLeft);

  function handleToggle() {
    toggleHold(index);
  }

  const animationKey = `${index}-${3 - rollsLeft}`;

  const randomRotateX = Math.random() * 720 + 360;
  const randomRotateY = Math.random() * 720 + 360;
  const randomRotateZ = Math.random() * 360;

  return (
    <motion.button
      key={animationKey}
      animate={{
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        y: 0,
      }}
      className={`aspect-square font-bold rounded-md cursor-pointer shadow-md max-h-[calc(100vh/12)] justify-self-center ${isHeld
        ? 'bg-orange-500 ring-4 ring-orange-200/50'
        : 'bg-orange-50 hover:-translate-y-1 hover:shadow-lg active:scale-95'
        }`}
      exit={{
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 },
      }}
      initial={{
        opacity: 0,
        rotateX: randomRotateX,
        rotateY: randomRotateY,
        rotateZ: randomRotateZ,
        scale: 0.5,
        y: -50,
      }}
      onClick={handleToggle}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      transition={{
        delay: index * 0.08, // Stagger each die
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1], // Custom easing for bounce effect
        opacity: { duration: 0.3 },
        rotateX: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
          mass: 1,
        },
        rotateY: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
          mass: 1,
        },
        scale: {
          type: 'spring',
          stiffness: 200,
          damping: 12,
        },
        y: {
          type: 'spring',
          stiffness: 150,
          damping: 10,
        },
      }}
      whileTap={!isHeld ? { scale: 0.95 } : undefined}
    >
      {getDisplayContent(`${die}` as Category, 0, isHeld)}
    </motion.button>
  );
}
