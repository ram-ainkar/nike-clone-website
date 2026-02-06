'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    // Show CTA after 2 seconds
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const words = ['JUST', 'DO', 'IT.'];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Image with Blur-to-Sharp Animation */}
      <motion.div
        initial={{ filter: 'blur(30px)', scale: 1.1, opacity: 0 }}
        animate={{ filter: 'blur(0px)', scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-athlete.jpg')",
          }}
        />
      </motion.div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        {/* Massive Typography */}
        <div className="flex flex-col items-center gap-0 md:gap-2">
          {words.map((word, index) => (
            <motion.h1
              key={word}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.5 + index * 0.15,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-display-hero text-background"
            >
              {word}
            </motion.h1>
          ))}
        </div>

        {/* CTA Button - Appears after delay */}
        {showCTA && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="magnetic-button clickable mt-16 px-12 py-4 bg-background text-foreground text-sm uppercase tracking-[0.2em] font-semibold border-2 border-transparent hover:border-foreground/20 transition-colors"
          >
            Explore Collection
          </motion.button>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-background/80 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-background/80"
        />
      </motion.div>
    </section>
  );
}
