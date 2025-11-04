import { cn } from '@/lib/utils';
import { type Category, useGameStore } from '@/stores/game-store';

type ScoreButtonProps = {
  cat: Category;
  isScored: boolean;
  isDisabled: boolean;
  score: number | null;
  canScore: boolean;
  potentialScore: number;
  setSelectedCategory: (cat: Category) => void;
};

export function ScoreButton({
  isScored,
  isDisabled,
  setSelectedCategory,
  cat,
  score,
  potentialScore,
  canScore,
}: ScoreButtonProps) {
  const isSelected = useGameStore((state) => state.selectedCategory === cat);

  return (
    <button
      className={cn(
        'flex items-center justify-center font-bold text-wrap bg-amber-200 aspect-square rounded-md shadow-md cursor-pointer transition-colors max-h-[calc(100vh/12)]',
        isScored
          ? 'cursor-not-allowed bg-fuchsia-200'
          : 'cursor-pointer bg-blue-50 hover:bg-blue-100',
        isSelected && 'shadow-lg bg-white ring-4 ring-blue-800/50'
      )}
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          setSelectedCategory(cat);
        }
      }}
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
