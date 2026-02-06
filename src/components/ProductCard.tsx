'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import RatingStars from './RatingStars';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    comparePrice?: number;
    image: string;
    rating: number;
    reviewCount?: number;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    openCart();
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.id}`} className="block group">
        <div className="relative overflow-hidden rounded-lg bg-muted">
          {/* Product Image */}
          <div className="aspect-square relative overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Discount Badge */}
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            )}

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full backdrop-blur-sm transition-colors clickable ${
                  isInWishlist(product.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/80 hover:bg-white'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-white' : ''}`}
                />
              </button>
              <button
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors clickable"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="text-xs text-muted-foreground uppercase mb-1">
              {product.category}
            </p>
            <h3 className="font-semibold mb-2 line-clamp-2 group-hover:underline">
              {product.title}
            </h3>
            
            {/* Rating */}
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={14} />

            {/* Price */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
