import { useNavigate } from '@tanstack/react-router';

import { cn } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function UserForm({ className }: React.ComponentProps<'form'>) {
  const navigate = useNavigate();
  const setPlayerName = useGameStore((state) => state.setPlayerName);

  function handleSaveName(formData: FormData) {
    const name = formData.get('name') as string;
    if (name !== '') {
      setPlayerName(name);
      navigate({
        to: '/game',
      });
    }
  }

  return (
    <form
      action={handleSaveName}
      className={cn('grid items-start gap-6', className)}
      id="user-profile"
    >
      <div className="group/field-group @container/field-group flex w-full flex-col gap-7">
        <div
          className="group/field flex w-full gap-3 flex-col *:w-full [&>.sr-only]:w-auto"
          role="group"
        >
          <Label htmlFor="name">Name:</Label>
          <Input
            autoComplete="given-name"
            autoFocus
            id="name"
            maxLength={250}
            minLength={1}
            name="name"
            placeholder="Enter your name"
            required
            type="text"
          />
        </div>
        <div
          className="group/field flex w-full gap-3 flex-col *:w-full [&>.sr-only]:w-auto"
          role="group"
        >
          <Button variant="default">Save</Button>
        </div>
      </div>
    </form>
  );
}
