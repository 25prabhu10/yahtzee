import { cn, getDisplayContent } from '@/lib/utils';
import { type Category, useGameStore } from '@/stores/game-store';

type IconButtonProps = {
  cat: Category;
  isScored: boolean;
  isDisabled: boolean;
  setSelectedCategory: (cat: Category) => void;
};

export function IconButton({ isScored, isDisabled, setSelectedCategory, cat }: IconButtonProps) {
  const yahtzeeCount = useGameStore((state) => state.player.yahtzeeCount);

  return (
    <button
      className={cn(
        'flex items-center justify-center font-bold text-wrap bg-amber-200 aspect-square rounded-md shadow-md cursor-pointer transition-colors max-h-[calc(100vh/12)]',
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
  );
}
