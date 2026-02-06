import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST create review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, userId, name, email, rating, comment } = body;

    if (!productId || !name || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Missing required fields or invalid rating' },
        { status: 400 }
      );
    }

    // Create review
    const review = await db.review.create({
      data: {
        productId,
        userId: userId || null,
        name,
        email: email || null,
        rating: parseInt(rating),
        comment: comment || null,
      },
    });

    // Update product rating and review count
    const allReviews = await db.review.findMany({
      where: { productId },
    });

    const avgRating = allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length;

    await db.product.update({
      where: { id: productId },
      data: {
        rating: avgRating,
        reviewCount: allReviews.length,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Review creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

// GET reviews for a product
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const reviews = await db.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
