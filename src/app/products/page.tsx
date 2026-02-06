'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, Star, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useAuth } from '@/contexts/AuthContext';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, [category, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/api/products';
      const params = new URLSearchParams();

      if (category !== 'all') {
        params.append('category', category);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      let data = await response.json();

      // Apply sorting
      if (sortBy === 'price-low') {
        data = data.sort((a: any, b: any) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        data = data.sort((a: any, b: any) => b.price - a.price);
      } else if (sortBy === 'rating') {
        data = data.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
      } else if (sortBy === 'newest') {
        data = data.sort((a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      // Apply price filter
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        data = data.filter((p: any) => p.price >= min && p.price <= max);
      }

      // Apply search
      if (search) {
        data = data.filter((p: any) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Browse our collection of premium athletic gear
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <form onSubmit={handleSearch} className="relative max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 pl-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </form>

          <div className="flex flex-wrap gap-4 items-center">
            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors clickable"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className={`${showFilters ? 'block' : 'hidden lg:flex'} flex-wrap gap-4`}>
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 clickable"
                >
                  <option value="all">All Categories</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 clickable"
                >
                  <option value="all">All Prices</option>
                  <option value="0-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-500">$200 - $500</option>
                  <option value="500-1000">$500+</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 clickable"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Results Count */}
            <p className="ml-auto text-sm text-muted-foreground">
              {loading ? 'Loading...' : `${products.length} products`}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setCategory('all');
                setPriceRange('all');
                setSearch('');
                setSortBy('newest');
              }}
              className="text-primary hover:underline clickable"
            >
              Clear all filters
            </button>
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
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="px-4 py-2 bg-foreground text-background text-sm font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
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
                  {product.comparePrice && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-background text-xs font-bold rounded">
                      SALE
                    </div>
                  )}
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
                        if (product.stock > 0) {
                          addItem({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            image: product.image,
                          });
                          openCart();
                        }
                      }}
                      disabled={product.stock === 0}
                      className={`p-2 rounded-lg transition-colors clickable ${
                        product.stock === 0
                          ? 'bg-muted text-muted-foreground cursor-not-allowed'
                          : 'bg-foreground text-background hover:bg-foreground/90'
                      }`}
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
