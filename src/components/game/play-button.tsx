import { Button } from '@components/ui/button';

import { useGameStore } from '@/stores/game-store';

export function PlayButton() {
  const isCategorySelected = useGameStore((state) => state.selectedCategory !== null);
  const scoreCategory = useGameStore((state) => state.scoreCategory);

  return (
    <Button
      className="min-h-12 bg-emerald-600 text-xl font-extrabold text-white cursor-pointer flex-1 hover:bg-emerald-700 disabled:opacity-50"
      disabled={!isCategorySelected}
      onClick={scoreCategory}
    >
      Play
    </Button>
  );
}
