'use client';

import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cart';
import { ShoppingBag } from 'lucide-react';

export default function ProductShowcase() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });
  const controls = useAnimation();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const handleAddToCart = () => {
    addItem({
      id: 'product-1',
      title: 'AIR MAX PULSE',
      price: 180,
      image: '/images/product-shoe.jpg',
    });
    openCart();
  };

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Product Image */}
          <motion.div
            className="relative"
            style={{ rotateY, scale, opacity }}
          >
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="aspect-square relative"
            >
              {/* Image Reveal Effect */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={controls}
                variants={{
                  hidden: { scaleX: 1 },
                  visible: {
                    scaleX: 0,
                    transition: {
                      delay: 0.5,
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="absolute inset-0 bg-foreground origin-right z-10"
              />

              <img
                src="/images/product-shoe.jpg"
                alt="Signature Product"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 0.8,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="absolute -top-8 -left-8 w-24 h-24 border-2 border-foreground/10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 0.9,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-foreground/10"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.6,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="space-y-8"
          >
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: 0.7,
                      duration: 0.6,
                    },
                  },
                }}
                className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4"
              >
                Signature Collection
              </motion.p>
              <h2 className="text-display-md">
                AIR MAX PULSE
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.8,
                    duration: 0.6,
                  },
                },
              }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Engineered for peak performance. Designed for those who demand excellence. Every detail crafted with precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.9,
                    duration: 0.6,
                  },
                },
              }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm uppercase tracking-wider text-muted-foreground">
                  Price
                </span>
                <span className="text-2xl font-semibold">
                  $180
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="magnetic-button clickable flex items-center justify-center gap-2 w-full md:w-auto px-12 py-5 bg-foreground text-background text-sm uppercase tracking-[0.2em] font-semibold hover:bg-foreground/90 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
