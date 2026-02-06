'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const words = ['JUST.', 'DO.', 'IT.'];

  useEffect(() => {
    // Text animation sequence
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    // Hide preloader after text animation
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1600);

    return () => {
      clearInterval(textInterval);
      clearTimeout(hideTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="preloader"
        >
          <div className="preloader-text">
            <AnimatePresence mode="popLayout">
              {words.map((word, index) => (
                index === textIndex && (
                  <motion.span
                    key={word}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                )
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
