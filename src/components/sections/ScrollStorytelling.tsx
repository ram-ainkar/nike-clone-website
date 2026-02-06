'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StoryPhrase {
  text: string;
  backgroundColor: string;
}

const phrases: StoryPhrase[] = [
  { text: 'Speed is earned.', backgroundColor: 'bg-background' },
  { text: 'Power is trained.', backgroundColor: 'bg-foreground' },
  { text: 'Greatness is built.', backgroundColor: 'bg-background' },
];

function WordReveal({ text, textColor = 'text-foreground' }: { text: string; textColor?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const words = text.split(' ');

  return (
    <div ref={ref} className={`${textColor}`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden mr-3"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { y: '100%' },
            visible: { y: '0%' },
          }}
          transition={{
            delay: index * 0.1,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '100%' },
              visible: { y: '0%' },
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
}

export default function ScrollStorytelling() {
  return (
    <section className="relative">
      {phrases.map((phrase, index) => (
        <div
          key={index}
          className={`h-screen w-full flex items-center justify-center ${phrase.backgroundColor} transition-colors duration-700`}
        >
          <div className="px-6 md:px-12">
            <h2 className="text-display-lg text-center">
              <WordReveal
                text={phrase.text}
                textColor={phrase.backgroundColor === 'bg-foreground' ? 'text-background' : 'text-foreground'}
              />
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
}
