'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, Star } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    if (query) {
      fetchProducts();
    }
  }, [query]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Search className="w-4 h-4" />
            <span className="text-sm">Search results for:</span>
          </div>
          <h1 className="text-3xl font-bold">{query}</h1>
          <p className="text-muted-foreground mt-1">
            {loading ? 'Searching...' : `${products.length} products found`}
          </p>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <p>Searching...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-4">
              Try searching for something else
            </p>
            <Link
              href="/"
              className="text-primary hover:underline clickable"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-muted/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square bg-muted">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleWishlist({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                    })}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-colors clickable ${
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
                  <h3 className="font-semibold line-clamp-2 min-h-[2.5rem]">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 0)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product.reviewCount || 0})
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      {product.comparePrice && (
                        <span className="text-sm text-muted-foreground line-through mr-2">
                          ${product.comparePrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
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
                      className="p-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors clickable"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
