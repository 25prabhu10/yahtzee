import { DiceRollButton } from './dice-roll-button';
import { PlayButton } from './play-button';

type GameActionsProps = {
  rollsLeft: number;
  showPlayButton: boolean;
};

export function GameButtons({ rollsLeft, showPlayButton }: GameActionsProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <DiceRollButton rollsLeft={rollsLeft} />
      {showPlayButton ? <PlayButton /> : null}
    </div>
  );
}
