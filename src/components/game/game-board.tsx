import { calculateScore, categories, useGameStore } from '@/stores/game-store';

import { BonusBox } from './bonus-box';
import ScoreBoardRow from './scoreboard-row';

export function GameBoard() {
  const rollsLeft = useGameStore((state) => state.rollsLeft);
  const selectedCategory = useGameStore((state) => state.selectedCategory);
  const setSelectedCategory = useGameStore((state) => state.setSelectedCategory);
  const yahtzeeCount = useGameStore((state) => state.player.yahtzeeCount);
  const scores = useGameStore((state) => state.player.scores);
  const diceValues = useGameStore((state) => state.diceValues);

  const scoreBoards = categories.map((cat, idx) => {
    const score = scores[cat];
    const potentialScore = score !== null ? 0 : calculateScore(cat, diceValues, yahtzeeCount > 0);
    return (
      <ScoreBoardRow
        cat={cat}
        className={idx === categories.length - 1 ? 'order-last' : ''}
        isSelected={selectedCategory === cat}
        key={cat}
        potentialScore={potentialScore}
        rollsLeft={rollsLeft}
        score={score}
        setSelectedCategory={setSelectedCategory}
        yahtzeeCount={yahtzeeCount}
      />
    );
  });

  return (
    <div className="w-full grid grid-cols-2 grid-rows-7 gap-2">
      {scoreBoards}
      <BonusBox />
    </div>
  );
}
