import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import dice1 from '@/assets/dice-1.svg';
import dice2 from '@/assets/dice-2.svg';
import dice3 from '@/assets/dice-3.svg';
import dice4 from '@/assets/dice-4.svg';
import dice5 from '@/assets/dice-5.svg';
import dice6 from '@/assets/dice-6.svg';
import { type Category } from '@/store/game-store';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDisplayContent(
  cat: Category | string,
  yahtzeeCount: number = 0,
  invertColor: boolean = false
) {
  switch (cat) {
    case '1':
      return (
        <img
          alt="dice face 1"
          className={`pointer-events-none ${invertColor ? 'invert' : ''}`}
          src={dice1}
        />
      );
    case '2':
      return (
        <img
          alt="dice face 2"
          className={`pointer-events-none ${invertColor ? 'invert' : ''}`}
          src={dice2}
        />
      );
    case '3':
      return (
        <img
          alt="dice face 3"
          className={`pointer-events-none ${invertColor ? 'invert' : ''}`}
          src={dice3}
        />
      );
    case '4':
      return (
        <img
          alt="dice face 4"
          className={`pointer-events-none ${invertColor ? 'invert' : ''}`}
          src={dice4}
        />
      );
    case '5':
      return (
        <img
          alt="dice face 5"
          className={`pointer-events-none ${invertColor ? 'invert' : ''}`}
          src={dice5}
        />
      );
    case '6':
      return (
        <img
          alt="dice face 6"
          className={`pointer-events-none ${invertColor ? 'invert' : ''}`}
          src={dice6}
        />
      );
    case '3x':
    case '4x':
    case '?':
      return <span className="text-2xl">{cat}</span>;
    case 'Small':
    case 'Large':
      return cat;
    case '🏠':
      return (
        <span aria-label="Full House" className="text-2xl" role="img">
          {cat}
        </span>
      );
    case 'Yahtzee':
      return yahtzeeCount > 1 ? (
        <div className="inline-flex flex-col md:gap-1">
          <span className="text-lg">Yatzy</span>
          <span className="text-lg">{yahtzeeCount}</span>
        </div>
      ) : (
        'Yatzy'
      );
    default:
      return '';
  }
}
