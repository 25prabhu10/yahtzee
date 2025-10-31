import { cn, getDisplayContent } from '@/lib/utils';
import { type Category } from '@/stores/game-store';

interface ScoreBoardRowProps extends React.HTMLAttributes<HTMLDivElement> {
  cat: Category;
  score: number | null;
  yahtzeeCount: number;
  rollsLeft: number;
  isSelected: boolean;
  potentialScore: number;
  setSelectedCategory: (cat: Category) => void;
}

export default function ScoreBoardRow({
  cat,
  className,
  isSelected,
  potentialScore,
  rollsLeft,
  score,
  setSelectedCategory,
  yahtzeeCount,
  ...props
}: ScoreBoardRowProps) {
  const isScored = score !== null;
  const canScore = !isScored && rollsLeft < 3;
  const isDisabled = isScored || !canScore;

  return (
    <div
      className={cn(
        'grid grid-cols-2 grid-rows-1 gap-1 xs:gap-2 text-base md:text-xl rounded-md',
        className
      )}
      {...props}
    >
      <button
        className={cn(
          'justify-self-end flex items-center justify-center font-bold text-wrap bg-amber-200 aspect-square rounded-md shadow-md cursor-pointer transition-colors max-h-[calc(100vh/12)]',
          isScored ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        )}
        disabled={isDisabled}
        onClick={() => {
          if (!isDisabled) {
            setSelectedCategory(cat);
          }
        }}
      >
        {getDisplayContent(cat, yahtzeeCount)}
      </button>
      <button
        className={cn(
          'justify-self-start flex items-center justify-center font-bold text-wrap bg-amber-200 aspect-square rounded-md shadow-md cursor-pointer transition-colors max-h-[calc(100vh/12)]',
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
    </div>
  );
}
