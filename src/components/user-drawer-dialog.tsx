import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { UserForm } from '@/components/user-form';
import { useMediaQuery } from '@/hooks/use-media-query';

type UserDrawerDialogProps = {
  openProp?: boolean;
  onOpenChange?: (open: boolean) => void;
  isNewUser?: boolean;
};

export function UserDrawerDialog({
  openProp = false,
  onOpenChange,
  isNewUser = true,
}: UserDrawerDialogProps) {
  const [open, setOpen] = useState(openProp);

  // Sync with parent's openProp changes
  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  }

  function handleSuccess() {
    handleOpenChange(false);
  }

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const title = isNewUser ? 'Welcome to Yahtzee!' : 'Edit Profile';
  const description = isNewUser
    ? "Let's start by entering your name. You can always change it later."
    : 'Update your name and save your changes.';

  if (isDesktop) {
    return (
      <Dialog onOpenChange={handleOpenChange} open={open}>
        <DialogContent
          className="data-[state=open]:slide-in-from-bottom-full! data-[state=open]:duration-600 sm:max-w-[425px]"
          onEscapeKeyDown={(e) => {
            if (isNewUser) {
              e.preventDefault(); // Prevent closing for new users
            }
          }}
          onPointerDownOutside={(e) => {
            if (isNewUser) {
              e.preventDefault(); // Prevent closing for new users
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <UserForm onSuccess={handleSuccess} />
          {!isNewUser && (
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      onOpenChange={handleOpenChange}
      open={open}
      dismissible={!isNewUser}
      modal={isNewUser}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <UserForm className="px-4" onSuccess={handleSuccess} />
        {!isNewUser && (
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
