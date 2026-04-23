import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";

type DrawerLeftProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DrawerLeft({ isOpen, onClose }: DrawerLeftProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Drawer open={isOpen} onClose={onClose} position="left">
        <DrawerHeader title="About me" />
        <DrawerItems>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Contenu About Me.
          </p>
        </DrawerItems>
      </Drawer>
    </>
  );
}
