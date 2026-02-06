'use client';

import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Quote {
  text: string;
  author: string;
  role: string;
}

const quotes: Quote[] = [
  {
    text: "Champions aren't made in gyms. Champions are made from something deep inside them: a desire, a dream, a vision.",
    author: 'ALEXANDER CHEN',
    role: 'Olympic Sprinter',
  },
  {
    text: "The only limit is the one you set yourself. Break it.",
    author: 'MAYA WILLIAMS',
    role: 'World Record Holder',
  },
];

export default function AthleteLifestyle() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-foreground">
      {/* Parallax Background Image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/lifestyle-athlete.jpg')" }}
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Quotes */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12 space-y-24">
        {quotes.map((quote, index) => (
          <QuoteCard key={index} quote={quote} index={index} />
        ))}
      </div>
    </section>
  );
}

function QuoteCard({ quote, index }: { quote: Quote; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className="max-w-4xl mx-auto text-center space-y-6"
    >
      <motion.blockquote
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delay: 0.2,
              duration: 0.8,
            },
          },
        }}
        className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-background"
      >
        "{quote.text}"
      </motion.blockquote>

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delay: 0.4,
              duration: 0.6,
            },
          },
        }}
        className="space-y-2"
      >
        <p className="text-background text-sm uppercase tracking-[0.3em] font-semibold">
          {quote.author}
        </p>
        <p className="text-background/60 text-xs uppercase tracking-[0.2em]">
          {quote.role}
        </p>
      </motion.div>
    </motion.div>
  );
}
