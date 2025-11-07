import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import dice1 from '@/assets/dice-1.svg';
import dice2 from '@/assets/dice-2.svg';
import dice3 from '@/assets/dice-3.svg';
import dice4 from '@/assets/dice-4.svg';
import dice5 from '@/assets/dice-5.svg';
import dice6 from '@/assets/dice-6.svg';
import type { Category, LowerSection, Scores, UpperSection } from '@/types';
import { diceValues } from '@/lib/constants';

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
  return (diceValues).reduce(
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

const DICE_IMAGES: Record<UpperSection, string> = {
  '1': dice1,
  '2': dice2,
  '3': dice3,
  '4': dice4,
  '5': dice5,
  '6': dice6,
} as const;

const CATEGORY_DISPLAY_CONFIG: Record<
  Category,
  {
    label: string;
    ariaLabel: string;
    className?: string;
  }
> = {
  '1': { label: 'Ones', ariaLabel: 'Ones - dice face with one dot' },
  '2': { label: 'Twos', ariaLabel: 'Twos - dice face with two dots' },
  '3': { label: 'Threes', ariaLabel: 'Threes - dice face with three dots' },
  '4': { label: 'Fours', ariaLabel: 'Fours - dice face with four dots' },
  '5': { label: 'Fives', ariaLabel: 'Fives - dice face with five dots' },
  '6': { label: 'Sixes', ariaLabel: 'Sixes - dice face with six dots' },
  '3x': { label: '3x', ariaLabel: 'Three of a kind', className: 'text-2xl' },
  '4x': { label: '4x', ariaLabel: 'Four of a kind', className: 'text-2xl' },
  '?': { label: '?', ariaLabel: 'Chance - any combination', className: 'text-2xl' },
  Small: { label: 'Small', ariaLabel: 'Small straight - sequence of four' },
  Large: { label: 'Large', ariaLabel: 'Large straight - sequence of five' },
  '🏠': { label: '🏠', ariaLabel: 'Full House - three of a kind plus a pair', className: 'text-2xl' },
  Yahtzee: { label: 'Yatzy', ariaLabel: 'Yahtzee - five of a kind' },
} as const;


function renderDiceFace(value: UpperSection, invertColor: boolean) {
  const config = CATEGORY_DISPLAY_CONFIG[value];
  const imageSrc = DICE_IMAGES[value];

  if (!imageSrc) {
    console.error(`Missing dice image for value: ${value}`);
    return (
      <span className="text-2xl font-bold" role="img" aria-label={config.ariaLabel}>
        {value}
      </span>
    );
  }

  return (
    <img
      alt={config.ariaLabel}
      className={cn('pointer-events-none select-none', invertColor && 'invert')}
      src={imageSrc}
      loading="lazy"
      decoding="async"
    />
  );
}

export function getDisplayContent(
  cat: Category,
  yahtzeeCount: number = 0,
  invertColor: boolean = false
): React.ReactNode {
  if (diceValues.includes(cat as UpperSection)) {
    return renderDiceFace(cat as UpperSection, invertColor);
  }

  const config = CATEGORY_DISPLAY_CONFIG[cat as Category];

  if (cat === 'Yahtzee' && yahtzeeCount > 1) {
    return (
      <div className="inline-flex flex-col md:gap-1" role="group" aria-label={`${config.ariaLabel}, ${yahtzeeCount} times`}>
        <span className="text-lg leading-tight">{config.label}</span>
        <span className="text-lg leading-tight font-bold">{yahtzeeCount}</span>
      </div>
    );
  }

  if ((['🏠', '3x', '4x', '?'] as LowerSection[]).includes(cat as LowerSection)) {
    return (
      <span className={cn(config.className)} role="img" aria-label={config.ariaLabel}>
        {config.label}
      </span>
    );
  }

  return (
    <span className={cn(config.className)} aria-label={config.ariaLabel}>
      {config.label}
    </span>
  );
} 