import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all coupons or validate a coupon
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
      // Validate a specific coupon
      const coupon = await db.coupon.findUnique({
        where: { code: code.toUpperCase() },
      });

      if (!coupon) {
        return NextResponse.json(
          { error: 'Invalid coupon code' },
          { status: 404 }
        );
      }

      // Check if coupon is still valid
      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
        return NextResponse.json(
          { error: 'Coupon has expired' },
          { status: 400 }
        );
      }

      if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
        return NextResponse.json(
          { error: 'Coupon has reached maximum uses' },
          { status: 400 }
        );
      }

      return NextResponse.json(coupon);
    } else {
      // Get all coupons (admin)
      const coupons = await db.coupon.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(coupons);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

// POST create coupon (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, discountType, discountValue, minOrderAmount, maxUses, expiresAt } = body;

    if (!code || !discountType || !discountValue) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const coupon = await db.coupon.create({
      data: {
        code: code.toUpperCase(),
        discountType,
        discountValue: parseFloat(discountValue),
        minOrderAmount: minOrderAmount ? parseFloat(minOrderAmount) : null,
        maxUses: maxUses ? parseInt(maxUses) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        usedCount: 0,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    console.error('Coupon creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create coupon' },
      { status: 500 }
    );
  }
}
