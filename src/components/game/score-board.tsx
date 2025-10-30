import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect } from 'react';

import { useGameStore } from '@/stores/game-store';

export function ScoreBoard() {
  const name = useGameStore((state) => state.player.name);
  const totalScore = useGameStore((state) => state.player.totalScore);

  const count = useMotionValue(totalScore);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, totalScore, { duration: 1 });
    return () => controls.stop();
  }, [totalScore, count]);

  return (
    <div className="text-center max-w-[10ch] xs:max-w-[20ch] sm:max-w-[35ch]">
      <p className="text-sm uppercase text-slate-500 truncate">{name}</p>
      <motion.pre className="inline-block tracking-wider tabular-nums text-xl font-bold text-slate-900">
        {rounded}
      </motion.pre>
    </div>
  );
}
