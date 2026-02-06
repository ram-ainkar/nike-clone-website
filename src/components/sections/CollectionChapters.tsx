'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Collection {
  title: string;
  subtitle: string;
  image: string;
  reverse?: boolean;
}

const collections: Collection[] = [
  {
    title: 'MEN',
    subtitle: 'Push boundaries. Break limits.',
    image: '/images/collection-men.jpg',
  },
  {
    title: 'WOMEN',
    subtitle: 'Unleash your potential.',
    image: '/images/collection-women.jpg',
    reverse: true,
  },
  {
    title: 'KIDS',
    subtitle: 'The future starts now.',
    image: '/images/collection-kids.jpg',
  },
];

function CollectionCard({ collection, index }: { collection: Collection; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 1,
            staggerChildren: 0.2,
          },
        },
      }}
      className={`relative h-screen w-full overflow-hidden ${
        collection.reverse ? 'bg-background' : 'bg-foreground'
      }`}
    >
      <div
        className={`grid lg:grid-cols-2 h-full ${
          collection.reverse ? 'lg:grid-flow-col-dense' : ''
        }`}
      >
        {/* Image Side */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 1.1 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          className={`relative h-1/2 lg:h-full ${collection.reverse ? 'lg:order-2' : ''}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${collection.image}')` }}
          />
          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`magnetic-button clickable px-10 py-4 border-2 text-sm uppercase tracking-[0.2em] font-semibold ${
                collection.reverse
                  ? 'bg-background text-foreground border-background'
                  : 'bg-foreground text-background border-foreground'
              }`}
            >
              Explore
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Text Side */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          className={`flex flex-col justify-center items-center px-6 md:px-12 h-1/2 lg:h-full ${
            collection.reverse ? 'lg:order-1' : ''
          }`}
        >
          <div className="text-center space-y-6">
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.5,
                    duration: 0.6,
                  },
                },
              }}
              className={`text-xs uppercase tracking-[0.4em] ${
                collection.reverse ? 'text-foreground/60' : 'text-background/60'
              }`}
            >
              Collection 0{index + 1}
            </motion.p>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.6,
                    duration: 0.8,
                  },
                },
              }}
              className={`text-display-lg ${
                collection.reverse ? 'text-foreground' : 'text-background'
              }`}
            >
              {collection.title}
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.7,
                    duration: 0.6,
                  },
                },
              }}
              className={`text-xl md:text-2xl ${
                collection.reverse
                  ? 'text-foreground/80'
                  : 'text-background/80'
              }`}
            >
              {collection.subtitle}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function CollectionChapters() {
  return (
    <section>
      {collections.map((collection, index) => (
        <CollectionCard
          key={collection.title}
          collection={collection}
          index={index}
        />
      ))}
    </section>
  );
}
