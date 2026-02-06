'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function PremiumCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full bg-background flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 1,
                staggerChildren: 0.15,
              },
            },
          }}
          className="space-y-12"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="text-display-lg md:text-display-hero text-foreground leading-tight"
          >
            You don't wait.
            <br />
            You do.
          </motion.h2>

          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="magnetic-button clickable px-16 py-5 bg-foreground text-background text-sm uppercase tracking-[0.2em] font-semibold hover:bg-foreground/90 transition-colors"
          >
            Shop the Drop
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={controls}
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: {
              delay: 0.8,
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }}
        className="absolute bottom-0 left-0 w-full h-px bg-foreground/20 origin-left"
      />
    </section>
  );
}
