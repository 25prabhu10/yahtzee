import { useGameStore } from '@/stores/game-store';

import { DiceRow } from './dice-row';
import { GameButtons } from './game-buttons';

export function GameAction() {
  const rollsLeft = useGameStore((state) => state.rollsLeft);

  return (
    <div className="w-full grid grid-cols-1 grid-rows-2">
      <DiceRow rollsLeft={rollsLeft} />
      <GameButtons rollsLeft={rollsLeft} showPlayButton={rollsLeft !== 3} />
    </div>
  );
}
