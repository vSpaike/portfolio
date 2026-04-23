import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";

type DrawerLeftProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DrawerLeft({ isOpen, onClose }: DrawerLeftProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Drawer open={isOpen} onClose={onClose} position="left" className="bg-white/10 h-screen">
        <DrawerItems>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-white text-xl">Hi, I'm vSpyke,</label>
          </div>
        </DrawerItems>
      </Drawer>
    </>
  );
}
