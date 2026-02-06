'use client';

import AmbientNoiseToggle from '@/components/AmbientNoiseToggle';
import CartSidebar from '@/components/CartSidebar';
import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';
import WishlistSidebar from '@/components/WishlistSidebar';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import components that need to avoid SSR issues
const Navigation = dynamic(() => import('@/components/Navigation'), {
  ssr: false,
});

const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), {
  ssr: false,
});

const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
});

const ScrollStorytelling = dynamic(
  () => import('@/components/sections/ScrollStorytelling'),
  { ssr: false }
);

const ProductShowcase = dynamic(
  () => import('@/components/sections/ProductShowcase'),
  { ssr: false }
);

const CollectionChapters = dynamic(
  () => import('@/components/sections/CollectionChapters'),
  { ssr: false }
);

const AthleteLifestyle = dynamic(
  () => import('@/components/sections/AthleteLifestyle'),
  { ssr: false }
);

const PremiumCTA = dynamic(() => import('@/components/sections/PremiumCTA'), {
  ssr: false,
});

const Footer = dynamic(() => import('@/components/sections/Footer'), {
  ssr: false,
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloadComplete = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={handlePreloadComplete} />

      {/* Global Components */}
      <ScrollProgress />
      {/* <CustomCursor /> */}
      <ThemeToggle />
      <AmbientNoiseToggle />
      <Navigation />
      <CartSidebar />
      <WishlistSidebar />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Main Content */}
      {isLoaded && (
        <SmoothScroll>
          <main className="min-h-screen pt-16">
            <Hero />
            <ScrollStorytelling />
            <ProductShowcase />
            <CollectionChapters />
            <AthleteLifestyle />
            <PremiumCTA />
            <Footer />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
