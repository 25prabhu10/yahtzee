import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const funnyMessages = [
  '🎲 Where luck meets skill... mostly luck though',
  '🎯 Five dice, infinite possibilities, questionable decisions',
  '⚡ Roll your way to glory (or spectacular failure)',
  '🏆 Yahtzee: Making statisticians cry since 1956',
];

export function Quotes() {
  const [currentMessageNumber, setCurrentMessage] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % funnyMessages.length);
    }, 5000);

    return () => {
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        initial={{ opacity: 0, y: 10 }}
        key={currentMessageNumber ? currentMessageNumber : 'empty'}
        transition={{ duration: 0.2 }}
      >
        <p className="text-lg text-gray-700 mb-8 transition-all md:min-w-[60ch] min-h-24">
          {funnyMessages[currentMessageNumber]}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
