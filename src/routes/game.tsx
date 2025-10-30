import { createFileRoute } from '@tanstack/react-router';
import { createPortal } from 'react-dom';

import FinalScore from '@/components/final-score';
import { GameAction } from '@/components/game/game-actions';
import { GameBoard } from '@/components/game/game-board';
import { GameHeader } from '@/components/game/game-header';
import { useGameStore } from '@/stores/game-store';

export const Route = createFileRoute('/game')({
  component: Game,
});

function Game() {
  const isGameOver = useGameStore((store) =>
    Object.values(store.player.scores).every((score) => score !== null)
  );
  const resetGame = useGameStore((store) => store.resetGame);

  return (
    <>
      <section className="container max-w-2xl mx-auto flex flex-col items-center justify-between min-h-svh gap-2 xs:gap-4 p-4">
        <GameHeader />
        <GameBoard />
        <GameAction />
      </section>

      {isGameOver &&
        createPortal(
          <FinalScore>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col justify-center items-center">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                  🎲
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
                    Yahtzee
                  </h3>
                  <div className="mt-2">
                    {/* <p className="text-center text-6xl text-gray-900 font-bold">
                      {player.totalScore}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center px-4 py-3 sm:px-6">
              <button
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:w-auto"
                onClick={resetGame}
              >
                Start New Game
              </button>
            </div>
          </FinalScore>,
          document.body
        )}
    </>
  );
}
