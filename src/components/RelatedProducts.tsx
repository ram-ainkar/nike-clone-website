'use client';

import Link from 'next/link';
import { ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
}

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export default function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">You May Also Like</h2>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors clickable"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-muted/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square bg-muted">
                <Link href={`/product/${product.id}`} className="clickable">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <button
                  onClick={() => toggleWishlist({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                  })}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-colors z-10 clickable ${
                    isInWishlist(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 hover:bg-white text-foreground'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isInWishlist(product.id) ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-xs text-muted-foreground uppercase">
                  {product.category}
                </p>
                <Link href={`/product/${product.id}`} className="clickable">
                  <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      addItem({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                      });
                      openCart();
                    }}
                    className="ml-auto p-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors clickable"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
