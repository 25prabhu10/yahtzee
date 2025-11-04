import { createFileRoute } from '@tanstack/react-router';

import { FinalScoreCard } from '@/components/final-score';
import { GameAction } from '@/components/game/game-actions';
import { GameBoard } from '@/components/game/game-board';
import { GameHeader } from '@/components/game/game-header';
import { useGameStore } from '@/stores/game-store';

export const Route = createFileRoute('/game')({
  component: Game,
  head: () => ({
    meta: [
      {
        title: 'Yahtzee | Game',
      },
    ],
  }),
});

function Game() {
  const isGameOver = useGameStore((store) =>
    Object.values(store.player.scores).every((score) => score !== null)
  );

  return (
    <>
      <section className="container max-w-2xl mx-auto flex flex-col items-center justify-between min-h-svh gap-2 xs:gap-4 p-4">
        <GameHeader />
        <GameBoard />
        <GameAction />
      </section>

      {isGameOver && <FinalScoreCard openProp={true} />}
    </>
  );
}
