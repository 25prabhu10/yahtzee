import { calculateScore, cn } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';
import type { Category } from '@/types';

type ScoreButtonProps = {
  cat: Category;
  isScored: boolean;
  isDisabled: boolean;
  score: number | null;
  canScore: boolean;
  setSelectedCategory: (cat: Category) => void;
};

export function ScoreButton({
  isScored,
  isDisabled,
  setSelectedCategory,
  cat,
  score,
  canScore,
}: ScoreButtonProps) {
  const isSelected = useGameStore((state) => state.selectedCategory === cat);
  const potentialScore = useGameStore((state) =>
    state.player.scores[cat] !== null
      ? 0
      : calculateScore(cat, state.dice, state.player.yahtzeeCount > 0)
  );

  function handleScoring() {
    if (!isDisabled) {
      setSelectedCategory(cat);
    }
  }

  return (
    <button
      className={cn(
        'justify-self-start flex items-center justify-center font-bold text-wrap bg-amber-200 aspect-square rounded-md shadow-md cursor-pointer transition-colors max-h-[calc(100vh/12)]',
        isScored
          ? 'cursor-not-allowed bg-fuchsia-200'
          : 'cursor-pointer bg-blue-50 hover:bg-blue-100',
        isSelected && 'shadow-lg bg-white ring-4 ring-blue-800/50'
      )}
      disabled={isDisabled}
      onClick={handleScoring}
    >
      {isScored ? (
        score
      ) : canScore ? (
        <span className={isSelected ? 'text-blue-600' : 'text-green-600'}>{potentialScore}</span>
      ) : (
        ''
      )}
    </button>
  );
}
