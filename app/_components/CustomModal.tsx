import { type ReactNode } from 'react';

interface CustomModalProps {
  children: ReactNode;
}

function CustomModal({ children }: CustomModalProps) {
  return (
    <div id="overlay" className="fixed left-0 top-0 z-[100] h-screen w-screen bg-black/50">
      <div className="absolute left-2/4 top-[10%] flex h-[50rem] w-[80rem] -translate-x-2/4 flex-col bg-white">
        {children}
      </div>
    </div>
  );
}

export default CustomModal;
