'use client';

import { ReactNode } from 'react';
import Lenis from '@studio-freight/react-lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <Lenis
      root
      duration={1.2}
      easing={(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}
      orientation="vertical"
      gestureOrientation="vertical"
      smoothWheel
      mouseMultiplier={1}
      touchMultiplier={2}
      infinite={false}
    >
      {children}
    </Lenis>
  );
}
