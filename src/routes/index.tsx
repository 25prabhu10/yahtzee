import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useState } from 'react';

import { Quotes } from '@/components/home/quotes';
import { Button } from '@/components/ui/button';
import { UserDrawerDialog } from '@/components/user-drawer-dialog';
import { defaultPlayerName } from '@/lib/constants';
import { useGameStore } from '@/stores/game-store';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [showNameForm, setShowNameForm] = useState(false);
  const resetGame = useGameStore((state) => state.resetGame);
  const playerName = useGameStore((state) => state.player.name);
  const highestScore = useGameStore((state) => state.highestScore);

  const navigate = useNavigate({ from: '/' });

  function handleClick() {
    resetGame();

    if (playerName === defaultPlayerName) {
      setShowNameForm(true);
    } else {
      navigate({
        to: '/game',
      });
    }
  }

  return (
    <section className="flex items-center justify-center min-h-svh bg-linear-to-br from-blue-200 to-purple-300">
      <div className="container max-w-2xl flex flex-col items-center gap-6 text-center">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-6 md:ga-8 border border-white/40">
          <h1 className="text-5xl font-bold mb-6 text-gray-800 text-center transition-transform duration-600">
            <motion.div
              animate={{
                borderRadius: ['0%', '0%', '50%', '50%', '0%'],
                rotate: [0, 0, 180, 180, 0],
                scale: [1, 2, 2, 1, 1],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 5,
                times: [0, 0.2, 0.5, 0.8, 1],
              }}
            >
              🎲
            </motion.div>
            <span className="block mt-4">Yahtzee</span>
          </h1>
          <Quotes />
          <Button
            className="bg-purple-600 font-bold tracking-wide text-lg hover:bg-purple-700 active:scale-90"
            onClick={handleClick}
          >
            Start Game
          </Button>
          <div className="grid w-full gap-3 sm:grid-cols-2">
            <p className="rounded-2xl border border-purple-200/60 bg-purple-50/60 px-4 py-3 text-sm text-purple-700 shadow-inner">
              <span className="font-semibold">High Score:</span> {highestScore}
            </p>
            <p className="rounded-2xl border border-blue-200/60 bg-blue-50/60 px-4 py-3 text-sm text-blue-700 shadow-inner truncate">
              <span className="font-semibold">Player:</span> {playerName || 'Guest Roller'}
            </p>
          </div>
        </div>
        <div className="max-w-md rounded-full bg-white/70 px-6 py-3 text-center text-xs font-medium text-gray-600 shadow-lg">
          Tip: Tap dice to hold them between rolls. Legendary streaks earn a burst of confetti.
        </div>
      </div>
      <UserDrawerDialog onOpenChange={setShowNameForm} openProp={showNameForm} />
    </section>
  );
}
