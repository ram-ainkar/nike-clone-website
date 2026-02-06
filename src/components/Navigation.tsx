'use client';

import Link from 'next/link';
import { ShoppingBag, Settings, Menu, X, Heart, User, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import SearchBar from './SearchBar';

export default function Navigation() {
  const { openCart, getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight clickable hidden md:block"
          >
            JUST DO IT.
          </Link>
          <Link
            href="/"
            className="text-xl font-bold tracking-tight clickable md:hidden"
          >
            NIKE
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/products"
              className="text-sm font-medium hover:text-primary transition-colors clickable"
            >
              Shop
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium hover:text-primary transition-colors clickable"
            >
              Search
            </Link>
            <Link
              href="/#men"
              className="text-sm font-medium hover:text-primary transition-colors clickable"
            >
              Men
            </Link>
            <Link
              href="/#women"
              className="text-sm font-medium hover:text-primary transition-colors clickable"
            >
              Women
            </Link>
            <Link
              href="/#kids"
              className="text-sm font-medium hover:text-primary transition-colors clickable"
            >
              Kids
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Bar - Desktop */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Search Button - Mobile */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors clickable"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors clickable"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {user ? (
            <>
              <Link
                href="/profile"
                className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors clickable"
              >
                <User className="w-5 h-5" />
                <span className="text-sm">{user.name || 'Account'}</span>
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden md:block px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors clickable text-sm font-medium"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/admin"
            className="hidden md:block p-2 hover:bg-muted rounded-lg transition-colors clickable"
            title="Admin Dashboard"
          >
            <Settings className="w-5 h-5" />
          </Link>

          <button
            onClick={() => {
              if (wishlistItems.length > 0) {
                // Open wishlist sidebar/modal here if needed
                alert('Wishlist feature coming soon!');
              }
            }}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors clickable"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-background text-xs font-bold rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </button>

          <button
            onClick={openCart}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors clickable"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Search Bar - Mobile */}
      {searchOpen && (
        <div className="fixed top-16 left-0 right-0 z-[499] p-4 bg-background border-b border-border md:hidden">
          <SearchBar />
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[499] pt-20 px-6 bg-background md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium py-2 hover:text-primary transition-colors clickable"
            >
              Shop
            </Link>
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium py-2 hover:text-primary transition-colors clickable"
            >
              Search
            </Link>
            <Link
              href="/#men"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium py-2 hover:text-primary transition-colors clickable"
            >
              Men
            </Link>
            <Link
              href="/#women"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium py-2 hover:text-primary transition-colors clickable"
            >
              Women
            </Link>
            <Link
              href="/#kids"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium py-2 hover:text-primary transition-colors clickable"
            >
              Kids
            </Link>
            <hr className="border-border" />
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 hover:text-primary transition-colors clickable flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  {user.name || 'My Account'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-lg font-medium py-2 hover:text-primary transition-colors clickable flex items-center gap-2 text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 hover:text-primary transition-colors clickable"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 hover:text-primary transition-colors clickable"
                >
                  Create Account
                </Link>
              </>
            )}
            <hr className="border-border" />
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium py-2 hover:text-primary transition-colors clickable"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
