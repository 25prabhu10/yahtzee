import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import { Badge } from '@/components/ui/badge';
import '@/styles.css';

import '../../styles-test-setup.css';

describe('Badge', () => {
  test('renders with default variant', async () => {
    const { getByText } = await render(<Badge>Default Badge</Badge>);
    await expect.element(getByText('Default Badge')).toBeInTheDocument();
    await expect
      .element(getByText('Default Badge'))
      .toHaveClass(
        'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90'
      );
  });

  test('renders with destructive variant', async () => {
    const { getByText } = await render(<Badge variant="destructive">Destructive Badge</Badge>);
    await expect.element(getByText('Destructive Badge')).toBeInTheDocument();
    await expect
      .element(getByText('Destructive Badge'))
      .toHaveClass(
        'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60'
      );
  });

  test('renders with outline variant', async () => {
    const { getByText } = await render(<Badge variant="outline">Outline Badge</Badge>);
    await expect.element(getByText('Outline Badge')).toBeInTheDocument();
    await expect
      .element(getByText('Outline Badge'))
      .toHaveClass(
        'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
      );
  });

  test('renders with secondary variant', async () => {
    const { getByText } = await render(<Badge variant="secondary">Secondary Badge</Badge>);
    await expect.element(getByText('Secondary Badge')).toBeInTheDocument();
    await expect
      .element(getByText('Secondary Badge'))
      .toHaveClass(
        'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90'
      );
  });
});
