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
  return (
    <div
      className={cn(
        `grid grid-cols-2 grid-rows-1 gap-2 text-base md:text-xl rounded-md`,

        className
      )}
      {...props}
    >
      <button
        className={cn(
          'justify-self-end flex items-center justify-center font-bold text-wrap bg-amber-200 aspect-square size-14 xs:size-16 sm:size-18 md:size-22 lg:size-30 rounded-md shadow-md cursor-pointer',
          isScored && 'cursor-not-allowed'
        )}
        onClick={() => {
          if (!isScored && canScore) {
            setSelectedCategory(cat);
          }
        }}
      >
        {getDisplayContent(cat, yahtzeeCount)}
      </button>
      <button
        className={cn(
          'justify-self-start flex items-center justify-center text-center font-extrabold rounded-md shadow-md aspect-square size-14 xs:size-16 sm:size-18 md:size-22 lg:size-30 cursor-pointer',
          isScored ? 'cursor-not-allowed bg-fuchsia-200' : 'bg-blue-50',
          isSelected && 'shadow-md bg-white ring-4 ring-blue-800/50'
        )}
        onClick={() => {
          if (!isScored && canScore) {
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
