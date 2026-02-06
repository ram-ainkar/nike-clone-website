# Nike E-Commerce - Complete Implementation Guide

This guide covers implementing all remaining e-commerce features for the Nike-inspired website.

## ✅ Already Completed

- ✅ 34 products seeded in database (Men: 12, Women: 12, Kids: 10)
- ✅ Prisma schema with ratings, reviews, wishlist, order tracking
- ✅ Shopping cart system
- ✅ Admin panel
- ✅ Basic checkout

## 🎯 Remaining Features to Implement

### 1. Category Pages (Men, Women, Kids)

#### Create Category Page Template

Create `src/app/shop/[category]/page.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cart';
import { ShoppingBag, Star, Heart, Filter } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  comparePrice: number | null;
  image: string;
  category: string;
  subcategory: string | null;
  brand: string | null;
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
}

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    subcategory: 'all',
    priceRange: 'all',
    rating: 'all',
  });
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, [category, filters]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products?category=${category}`);
      let data = await res.json();

      // Apply filters
      if (filters.subcategory !== 'all') {
        data = data.filter((p: Product) => p.subcategory === filters.subcategory);
      }
      if (filters.rating !== 'all') {
        data = data.filter((p: Product) => p.rating >= parseFloat(filters.rating));
      }

      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    openCart();
  };

  const getCategoryTitle = () => {
    const titles: Record<string, string> = {
      'men': 'Men\'s Collection',
      'women': 'Women\'s Collection',
      'kids': 'Kids\' Collection',
    };
    return titles[category] || 'Shop';
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 uppercase">{getCategoryTitle()}</h1>
          <p className="text-xl opacity-80">Discover premium athletic wear</p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4 items-center">
          <Filter className="w-5 h-5" />
          <select
            value={filters.subcategory}
            onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}
            className="px-4 py-2 border border-border rounded-lg"
          >
            <option value="all">All Subcategories</option>
            <option value="Shoes">Shoes</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
          </select>
          <select
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            className="px-4 py-2 border border-border rounded-lg"
          >
            <option value="all">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 pb-16">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="bg-muted/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-white relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {product.featured && (
                      <span className="absolute top-2 left-2 bg-foreground text-background text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg">${product.price}</p>
                        {product.comparePrice && (
                          <p className="text-sm text-muted-foreground line-through">${product.comparePrice}</p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className="p-2 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 2. Product Detail Page

Create `src/app/product/[id]/page.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { ShoppingBag, Star, Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  comparePrice: number | null;
  image: string;
  category: string;
  subcategory: string | null;
  brand: string | null;
  stock: number;
  rating: number;
  reviewCount: number;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    if (params.id) {
      fetchProduct();
      fetchReviews();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    openCart();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-3xl font-bold">${product.price}</p>
              {product.comparePrice && (
                <>
                  <p className="text-xl text-muted-foreground line-through">${product.comparePrice}</p>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="font-semibold mb-3">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg ${
                      selectedSize === size
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-semibold mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border rounded-lg hover:bg-muted"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border rounded-lg hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">100% protected transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{review.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 3. Update API to Support Filters

Update `src/app/api/products/route.ts`:

```tsx
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    const where: any = {};

    if (category) {
      where.category = category;
    }
    if (featured === 'true') {
      where.featured = true;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await db.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, price, comparePrice, image, category, subcategory, brand, stock, rating, featured } = body;

    const product = await db.product.create({
      data: {
        title,
        description: description || '',
        price: parseFloat(price),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        image,
        category,
        subcategory,
        brand,
        stock: stock || 0,
        rating: rating || 0,
        reviewCount: 0,
        featured: featured || false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
```

### 4. Add Reviews API

Create `src/app/api/products/[id]/reviews/route.ts`:

```tsx
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reviews = await db.review.findMany({
      where: { productId: params.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, email, rating, comment } = body;

    const review = await db.review.create({
      data: {
        productId: params.id,
        name,
        email,
        rating: parseInt(rating),
        comment,
      },
    });

    // Update product rating
    const allReviews = await db.review.findMany({
      where: { productId: params.id },
    });
    const avgRating = allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length;

    await db.product.update({
      where: { id: params.id },
      data: {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: allReviews.length,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
```

### 5. Update Navigation

Update `src/components/Navigation.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { ShoppingBag, Settings, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';

export default function Navigation() {
  const { openCart, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          JUST DO IT.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop/men" className="hover:text-primary transition-colors">Men</Link>
          <Link href="/shop/women" className="hover:text-primary transition-colors">Women</Link>
          <Link href="/shop/kids" className="hover:text-primary transition-colors">Kids</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </Link>
          <Link
            href="/admin"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            title="Admin Dashboard"
          >
            <Settings className="w-5 h-5" />
          </Link>
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[499] bg-background pt-20 px-6 md:hidden">
          <div className="flex flex-col space-y-6">
            <Link href="/shop/men" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Men</Link>
            <Link href="/shop/women" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Women</Link>
            <Link href="/shop/kids" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Kids</Link>
            <Link href="/about" className="text-xl" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </>
  );
}
```

### 6. Create Search Page

Create `src/app/search/page.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Star } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  price: number;
  comparePrice: number | null;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    if (query.length >= 2) {
      searchProducts();
    } else {
      setProducts([]);
    }
  }, [query]);

  const searchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${query}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-center mb-8">Search Products</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-12 pr-4 py-4 border border-border rounded-lg text-lg"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center">Searching...</div>
        ) : query.length >= 2 ? (
          <>
            <p className="text-muted-foreground mb-6">
              {products.length} result{products.length !== 1 ? 's' : ''} for "{query}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group"
                >
                  <div className="bg-muted/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-white">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-1 capitalize">{product.category}</p>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-lg">${product.price}</p>
                          {product.comparePrice && (
                            <p className="text-sm text-muted-foreground line-through">${product.comparePrice}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-muted-foreground">
            Start typing to search for products...
          </div>
        )}
      </div>
    </div>
  );
}
```

### 7. Create Additional Pages

#### About Page - `src/app/about/page.tsx`:

```tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center mb-8">About Us</h1>
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p>
            Welcome to our Nike-inspired e-commerce platform. We are passionate about bringing you the best athletic wear and equipment.
          </p>
          <p>
            Our mission is to inspire athletes everywhere with innovative products that help them reach their full potential.
          </p>
          <h2>Our Story</h2>
          <p>
            Founded with a vision to revolutionize athletic footwear and apparel, we've grown into a global brand that champions performance and style.
          </p>
          <h2>Our Values</h2>
          <ul>
            <li>Innovation in every product</li>
            <li>Sustainability and responsibility</li>
            <li>Community and empowerment</li>
            <li>Excellence in quality and service</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

#### Contact Page - `src/app/contact/page.tsx`:

```tsx
'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center mb-8">Contact Us</h1>
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="bg-green-100 text-green-800 p-6 rounded-lg text-center">
              Thank you! Your message has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 8. Create Policy Pages

Create these pages with appropriate content:
- `src/app/privacy/page.tsx` - Privacy Policy
- `src/app/terms/page.tsx` - Terms of Service
- `src/app/shipping/page.tsx` - Shipping Policy
- `src/app/returns/page.tsx` - Returns & Refunds Policy

### 9. Update Footer with Links

Update `src/components/sections/Footer.tsx` to include links to all new pages.

### 10. Stripe Integration (Optional)

To integrate Stripe payment:

1. Install Stripe:
```bash
npm install stripe @stripe/stripe-js
```

2. Create `.env.local`:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

3. Create checkout API route `src/app/api/checkout/route.ts`

4. Update checkout page to use Stripe

## 📋 Summary of All Features

### ✅ Completed
- ✅ 34 products in database
- ✅ Shopping cart
- ✅ Admin panel
- ✅ Order management
- ✅ Database schema with all e-commerce features

### 🎯 To Implement (using code above)
- Category pages (Men, Women, Kids)
- Product detail page
- Rating and review system
- Search functionality
- Navigation with all links
- About page
- Contact page
- Policy pages
- Mobile responsive menu

## 🚀 Next Steps

1. Copy the code from this file to create the new pages
2. Update the API routes as shown
3. Update Navigation component
4. Test all features
5. Deploy your website

## 📝 Notes

- All product images in the seed script use placeholder paths
- You can replace them with real images in the `public/images/` folder
- The Stripe integration is optional - the current checkout works in demo mode
- All pages are responsive and work on mobile devices

---

This guide provides all the code you need to complete the e-commerce website. Let me know if you need help with any specific part!
