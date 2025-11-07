import { useNavigate } from '@tanstack/react-router';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';

type UserFormProps = Omit<React.ComponentProps<'form'>, 'onSubmit'> & {
  onSuccess?: () => void;
};

export function UserForm({ className, onSuccess, ...props }: UserFormProps) {
  const navigate = useNavigate();
  const setPlayerName = useGameStore((state) => state.setPlayerName);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSaveName(formData: FormData) {
    setIsSubmitting(true);
    setError('');

    try {
      const name = formData.get('name') as string;
      const trimmedName = name.trim();

      setPlayerName(trimmedName);

      onSuccess?.();

      await new Promise((resolve) => setTimeout(resolve, 100));

      navigate({
        to: '/game',
      });
    } catch (err) {
      console.error('Error saving name:', err);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  }

  function handleSubmit(_e: FormEvent<HTMLFormElement>) {
    setError('');
  }

  return (
    <form
      action={handleSaveName}
      className={cn('grid items-start gap-6', className)}
      id="user-profile"
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="group/field-group @container/field-group flex w-full flex-col gap-7">
        <div
          className="group/field flex w-full gap-3 flex-col *:w-full [&>.sr-only]:w-auto"
          role="group"
        >
          <Label htmlFor="name">Name:</Label>
          <Input
            aria-describedby={error ? 'name-error' : undefined}
            aria-invalid={error ? 'true' : 'false'}
            autoComplete="given-name"
            autoFocus
            disabled={isSubmitting}
            id="name"
            maxLength={250}
            minLength={1}
            name="name"
            placeholder="Enter your name"
            required
            type="text"
          />
          {error && (
            <p className="text-sm text-red-600 font-medium" id="name-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <div
          className="group/field flex w-full gap-3 flex-col *:w-full [&>.sr-only]:w-auto"
          role="group"
        >
          <Button disabled={isSubmitting} type="submit" variant="default">
            {isSubmitting ? 'Saving...' : 'Save and Start Game'}
          </Button>
        </div>
      </div>
    </form>
  );
}
