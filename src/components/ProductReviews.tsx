'use client';

import { Star, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: string;
  productRating: number;
  reviewCount: number;
}

export default function ProductReviews({ productId, productRating, reviewCount }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`);
      if (!response.ok) {
        console.error('Failed to fetch reviews');
        setReviews([]);
        return;
      }
      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          ...formData,
        }),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', rating: 5, comment: '' });
        setShowForm(false);
        fetchReviews();
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-muted/50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Customer Reviews</h3>
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(Math.round(productRating))}
              </div>
              <span className="text-lg font-semibold">
                {productRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({reviewCount} reviews)
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors clickable"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-muted/50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Write Your Review</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="clickable"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="Share your experience with this product..."
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors clickable"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-muted/50 p-6 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center text-background font-bold">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              {review.comment && (
                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
              )}
              <button className="mt-3 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors clickable">
                <ThumbsUp className="w-4 h-4" />
                Helpful
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
