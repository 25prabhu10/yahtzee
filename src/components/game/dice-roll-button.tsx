import { useEffect, useRef } from 'react';

import diceAudio from '@/assets/dice-roll.mp3';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/stores/game-store';

type DiceRollButtonProps = {
  rollsLeft: number;
};

export function DiceRollButton({ rollsLeft }: DiceRollButtonProps) {
  const playAudio = useGameStore((state) => state.playAudio);
  const rollDice = useGameStore((state) => state.rollDice);

  const diceRollAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    diceRollAudioRef.current = new Audio(diceAudio);

    return () => {
      diceRollAudioRef.current?.pause();
      diceRollAudioRef.current = null;
    };
  }, []);

  function playSoundEffect() {
    if (!playAudio) {
      return;
    }

    if (!diceRollAudioRef.current) {
      diceRollAudioRef.current = new Audio(diceAudio);
    }

    const diceRollAudio = diceRollAudioRef.current;
    diceRollAudio.currentTime = 0;
    diceRollAudio.play();
  }

  return (
    <Button
      className="min-h-12 flex justify-center items-center bg-white text-xl cursor-pointer font-extrabold text-orange-500 flex-1 hover:bg-gray-100 disabled:opacity-50"
      disabled={rollsLeft === 0}
      onClick={() => {
        playSoundEffect();
        rollDice();
      }}
    >
      ROLL
      <span className="ml-2 bg-orange-500 text-gray-100 size-7 rounded-full">{rollsLeft}</span>
    </Button>
  );
}
