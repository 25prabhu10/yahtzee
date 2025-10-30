import { Menu, Volume2, VolumeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useGameStore } from '@/stores/game-store';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

export function GameSettings() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <Menu className="size-5" />
            <span className="sr-only">Open settings</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="data-[state=open]:zoom-in-0! data-[state=open]:duration-600 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Game Settings</DialogTitle>
            <DialogDescription>
              Adjust preferences without interrupting your game.
            </DialogDescription>
          </DialogHeader>
          <Settings />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost">
          <Menu className="size-5" />
          <span className="sr-only">Open settings</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Game Settings</DrawerTitle>
          <DrawerDescription>Adjust preferences without interrupting your game.</DrawerDescription>
        </DrawerHeader>
        <Settings />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Settings() {
  const playAudio = useGameStore((state) => state.playAudio);
  const resetGame = useGameStore((state) => state.resetGame);
  const toggleAudio = useGameStore((state) => state.toggleAudio);

  return (
    <div className="grid items-start gap-6 px-4">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 hover:bg-slate-50/70 p-3">
        <div>
          <p className="text-sm font-medium text-slate-900">Sound effects</p>
          <p className="text-xs text-slate-500">Toggle dice roll audio feedback.</p>
        </div>
        <Button onClick={toggleAudio} size="icon" variant="default">
          {playAudio ? <Volume2 className="size-5" /> : <VolumeOff className="size-5" />}
          <span className="sr-only">Toggle sound</span>
        </Button>
      </div>
      <Button onClick={resetGame} variant="destructive">
        Restart round
      </Button>
    </div>
  );
}
