import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import dice1 from '@/assets/dice-1.svg';
import dice2 from '@/assets/dice-2.svg';
import dice3 from '@/assets/dice-3.svg';
import dice4 from '@/assets/dice-4.svg';
import dice5 from '@/assets/dice-5.svg';
import dice6 from '@/assets/dice-6.svg';
import type { Category, LowerSection, Scores, UpperSection } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateScore(
  category: Category,
  values: number[],
  hasYahtzeeBonus: boolean
): number {
  const counts = Array(7).fill(0);
  values.forEach((v) => counts[v]++);

  const isYahtzeeBonus = counts.some((c) => c === 5);

  switch (category) {
    case '1':
      return values.filter((v) => v === 1).length * 1;
    case '2':
      return values.filter((v) => v === 2).length * 2;
    case '3':
      return values.filter((v) => v === 3).length * 3;
    case '4':
      return values.filter((v) => v === 4).length * 4;
    case '5':
      return values.filter((v) => v === 5).length * 5;
    case '6':
      return values.filter((v) => v === 6).length * 6;
    case '3x':
      return counts.some((c) => c >= 3) ? values.reduce((a, b) => a + b, 0) : 0;
    case '4x':
      return counts.some((c) => c >= 4) ? values.reduce((a, b) => a + b, 0) : 0;
    case '🏠':
      return isYahtzeeBonus && hasYahtzeeBonus
        ? 25
        : counts.includes(3) && counts.includes(2)
          ? 25
          : 0;
    case 'Small':
      return isYahtzeeBonus && hasYahtzeeBonus
        ? 30
        : /1234|2345|3456/.test(counts.map((c, i) => (c > 0 ? i : '')).join(''))
          ? 30
          : 0;
    case 'Large':
      return isYahtzeeBonus && hasYahtzeeBonus
        ? 40
        : /12345|23456/.test(counts.map((c, i) => (c > 0 ? i : '')).join(''))
          ? 40
          : 0;
    case 'Yahtzee':
      return isYahtzeeBonus ? 50 : 0;
    case '?':
      return values.reduce((a, b) => a + b, 0);
    default:
      return 0;
  }
}

export function upperSectionTotalScore(scores: Scores) {
  return (['1', '2', '3', '4', '5', '6'] as UpperSection[]).reduce(
    (sum, cat) => sum + (scores[cat] || 0),
    0
  );
}

export function lowerSectionTotalScore(scores: Scores): number {
  return (['3x', '4x', '🏠', 'Small', 'Large', 'Yahtzee', '?'] as LowerSection[]).reduce(
    (sum, cat) => sum + (scores[cat] || 0),
    0
  );
}

export function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

export function getDiceDots(value: number) {
  const patterns: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };
  return patterns[value] || [];
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
