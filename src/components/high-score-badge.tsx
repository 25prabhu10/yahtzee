import { useGameStore } from '@/stores/game-store';

import { Badge } from './ui/badge';

export function HighScoreBadge() {
  const highestScore = useGameStore((state) => state.highestScore);

  return (
    <Badge className="bg-yellow-400/20 text-yellow-800 border-0 px-3 py-1 font-semibold">
      High Score: {highestScore}
    </Badge>
  );
}
