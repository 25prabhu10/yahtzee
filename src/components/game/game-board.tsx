import { categories, useGameStore } from '@/stores/game-store';

import { BonusBox } from './bonus-box';
import { ScoreBoardRow } from './scoreboard-row';

export function GameBoard() {
  const setSelectedCategory = useGameStore((state) => state.setSelectedCategory);

  const scoreBoards = categories.map((cat, idx) => {
    return (
      <ScoreBoardRow
        cat={cat}
        className={idx === categories.length - 1 ? 'order-last' : ''}
        key={cat}
        setSelectedCategory={setSelectedCategory}
      />
    );
  });

  return (
    <div className="w-full shadow-xl bg-chart-2/10 rounded-md py-4 px-2 min-h-0 grid grid-cols-2 grid-rows-7 gap-1 xs:gap-2 md:gap-3">
      {scoreBoards}
      <BonusBox />
    </div>
  );
}
