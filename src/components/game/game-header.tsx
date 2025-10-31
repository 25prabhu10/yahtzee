import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { HighScoreBadge } from '@/components/high-score-badge';
import { Button } from '@/components/ui/button';

import { GameSettings } from './game-settings';
import { ScoreBoard } from './score-board';

export function GameHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white/70 px-2 shadow-xl w-full">
      <Button asChild size="icon" variant="ghost">
        <Link className="active:bg-grey-50" to="/">
          <ArrowLeft className="size-5" />
        </Link>
      </Button>
      <ScoreBoard />
      <div className="hidden md:flex">
        <HighScoreBadge />
      </div>
      <GameSettings />
    </header>
  );
}
