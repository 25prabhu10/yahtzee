import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useGameStore } from '@/stores/game-store';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';

type FinalScoreCardProps = {
  openProp?: boolean;
};

export function FinalScoreCard({ openProp }: FinalScoreCardProps) {
  const [open, setOpen] = useState(openProp ?? false);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button className="hidden" variant="outline">
            Open Final Score
          </Button>
        </DialogTrigger>
        <DialogContent className="data-[state=open]:slide-in-from-bottom-full! data-[state=open]:duration-600 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Final Score</DialogTitle>
            <DialogDescription>
              Review your game performance and start a new game if desired.
            </DialogDescription>
          </DialogHeader>
          <FinalScore />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button className="hidden" variant="outline">
          n Final Score
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Game Settings</DrawerTitle>
          <DrawerDescription>
            Review your game performance and start a new game if desired.
          </DrawerDescription>
        </DrawerHeader>
        <FinalScore />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function FinalScore() {
  const totalScore = useGameStore((state) => state.player.totalScore);
  const resetGame = useGameStore((state) => state.resetGame);

  return (
    <>
      <div className="grid items-start gap-6 px-4">
        <div className="flex flex-col items-center justify-between rounded-xl border border-slate-200 hover:bg-slate-50/70 p-3">
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
            🎲
          </div>
          <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
            Yahtzee
          </h3>
          <p className="text-center text-6xl text-gray-900 font-bold">{totalScore}</p>
        </div>
        <Button onClick={resetGame}>Start New Game</Button>
      </div>
    </>
  );
}
