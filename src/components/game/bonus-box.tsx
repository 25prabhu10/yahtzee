import { useGameStore } from '@/stores/game-store';

export function BonusBox() {
  const upperSectionScore = useGameStore((state) => state.player.upperSectionScore);

  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-2 text-base md:text-x">
      <p
        className={`justify-self-end flex items-center justify-center font-bold text-wrap text-white text-xl aspect-square size-14 xs:size-16 sm:size-18 md:size-22 lg:size-30 rounded-md shadow-md ${upperSectionScore >= 63 ? 'bg-green-600' : 'bg-blue-600/50'
          }`}
      >
        +35
      </p>
      <p className="justify-self-start flex items-center justify-center text-center font-extrabold outline-2 border-blue-900 text-sm rounded-full bg-blue-100 shadow-md aspect-square size-14 xs:size-16 sm:size-18 md:size-22 lg:size-30">
        {upperSectionScore}/63
      </p>
    </div>
  );
}
