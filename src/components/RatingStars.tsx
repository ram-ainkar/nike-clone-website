'use client';

import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showCount?: boolean;
  className?: string;
}

export default function RatingStars({
  rating,
  reviewCount,
  size = 16,
  showCount = true,
  className = '',
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="fill-yellow-400 text-yellow-400"
          size={size}
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <StarHalf
          className="fill-yellow-400 text-yellow-400"
          size={size}
        />
      )}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="text-gray-300"
          size={size}
        />
      ))}

      {/* Review Count */}
      {showCount && reviewCount !== undefined && (
        <span className="text-sm text-muted-foreground ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
