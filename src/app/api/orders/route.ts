import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// POST create order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry,
      paymentMethod,
      paymentId,
      items,
      subtotal,
      shipping,
      tax,
      total,
    } = body;

    if (!customerName || !customerEmail || !customerAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create order with items
    const order = await db.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        shippingCity,
        shippingState,
        shippingZip,
        shippingCountry,
        paymentMethod,
        paymentId,
        subtotal: parseFloat(subtotal),
        shipping: parseFloat(shipping),
        tax: parseFloat(tax),
        total: parseFloat(total),
        items: {
          create: items.map((item: any) => ({
            quantity: item.quantity,
            price: item.price,
            product: {
              connect: { id: item.id }
            },
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
