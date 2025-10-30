import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface FinalScoreProps {
  children: ReactNode;
}

export default function FinalScore({ children, ...props }: FinalScoreProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="relative z-10"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      {...props}
    >
      <div aria-hidden="true" className="fixed inset-0 bg-gray-500/75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-svh items-center justify-center text-center sm:items-center sm:p-0">
          <motion.dialog
            animate="visible"
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all py-2 md:py-4 px-8 md:my-8 min-w-80 md:max-w-lg"
            exit="exit"
            initial="hidden"
            open
            variants={{
              exit: {
                opacity: 0,
                y: '100vh',
              },
              hidden: {
                opacity: 0,
                y: '100vh',
              },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.2,
                  type: 'spring',
                },
                y: '0',
              },
            }}
          >
            {children}
          </motion.dialog>
        </div>
      </div>
    </motion.div>
  );
}
