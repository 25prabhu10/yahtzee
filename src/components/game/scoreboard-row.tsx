import { cn } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';
import type { Category } from '@/types';

import { IconButton } from './icon-button';
import { ScoreButton } from './score-button';

interface ScoreBoardRowProps extends React.HTMLAttributes<HTMLDivElement> {
  cat: Category;
  setSelectedCategory: (cat: Category) => void;
}

export function ScoreBoardRow({
  cat,
  className,
  setSelectedCategory,
  ...props
}: ScoreBoardRowProps) {
  const rollingStarted = useGameStore((state) => state.rollsLeft < 3);
  const score = useGameStore((state) => state.player.scores[cat]);

  const isScored = score !== null;
  const canScore = !isScored && rollingStarted;
  const isDisabled = isScored || !canScore;

  return (
    <div
      className={cn(
        'grid grid-cols-2 grid-rows-1 gap-1 xs:gap-2 text-base md:text-xl rounded-md',
        className
      )}
      {...props}
    >
      <IconButton
        cat={cat}
        isDisabled={isDisabled}
        isScored={isScored}
        setSelectedCategory={setSelectedCategory}
      />
      <ScoreButton
        canScore={canScore}
        cat={cat}
        isDisabled={isDisabled}
        isScored={isScored}
        score={score}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}
