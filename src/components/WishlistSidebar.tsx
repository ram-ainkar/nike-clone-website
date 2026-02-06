'use client';

import { useWishlistStore } from '@/store/wishlist';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';

export default function WishlistSidebar() {
  const { items, isOpen, closeCart, removeItem, toggleItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const moveToCart = (item: any) => {
    addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    });
    removeItem(item.id);
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[1000]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-[1001] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                Wishlist ({items.length})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-muted rounded-full transition-colors clickable"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Heart className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your wishlist is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.category}
                        </p>
                        <p className="font-bold">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => toggleItem(item)}
                          className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors clickable"
                          title="Remove from wishlist"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveToCart(item)}
                          className="p-2 hover:bg-foreground hover:text-background rounded-lg transition-colors clickable"
                          title="Move to cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors clickable"
                >
                  View All Wishlist Items
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
