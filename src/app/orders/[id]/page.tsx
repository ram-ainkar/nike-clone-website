'use client';

import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Download,
  Package,
  Truck
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone?: string | null;
  shippingCity?: string | null;
  shippingState?: string | null;
  shippingZip?: string | null;
  shippingCountry?: string | null;
  paymentMethod?: string | null;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  trackingNumber?: string | null;
  items: any[];
  createdAt: string;
  updatedAt: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-green-100 text-green-800',
  delivered: 'bg-gray-100 text-gray-800',
};

const statusSteps = {
  pending: 'Order Placed',
  processing: 'Processing',
  shipped: 'On the Way',
  delivered: 'Delivered',
};

export default function TrackOrderPage() {
  const { user, loading } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    if (!params || !params.id || typeof params.id !== 'string') {
      router.push('/profile');
      return;
    }
    fetchOrder();
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        router.push('/profile');
        return;
      }

      setOrder(data);
    } catch (error) {
      console.error('Failed to fetch order:', error);
      router.push('/profile');
    } finally {
      setLoadingOrder(false);
    }
  };

  const statusStep = statusSteps[order?.status as keyof typeof statusSteps] || 'pending';

  if (loading || loadingOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order information...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl mb-4">Order not found</p>
          <Link
            href="/profile"
            className="text-primary hover:underline clickable"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const formatAddress = (address: string, city?: string | null, state?: string | null, zip?: string | null) => {
    const parts = [address];
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (zip) parts.push(zip);
    return parts.join(', ');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-0 clickable"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <h1 className="text-2xl font-bold">Track Order #{order.id.slice(-8)}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Status */}
          <div className="lg:col-span-1">
            <div
              className={`p-4 rounded-lg ${statusColors[order.status as keyof typeof statusColors]}`}
            >
              <div className="flex items-center gap-3 mb-2">
                {order.status === 'pending' && <Clock className="w-6 h-6" />}
                {order.status === 'processing' && <Package className="w-6 h-6" />}
                {order.status === 'shipped' && <Truck className="w-6 h-6" />}
                {order.status === 'delivered' && <CheckCircle className="w-6 h-6" />}
              </div>
              <p className="text-lg font-semibold">
                {statusStep}
              </p>
            </div>

            <div className="space-y-6 mt-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Order Placed</p>
                <p className="text-lg font-semibold">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Order Total</p>
                <p className="text-3xl font-bold">
                  ${order.total.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Order ID</p>
                <p className="font-mono text-sm">
                  {order.id}
                </p>
              </div>

              {order.trackingNumber && (
                <div className="p-4 bg-muted/50 border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Tracking Number</p>
                  <p className="font-mono text-lg">
                    {order.trackingNumber}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Order Details */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-6">Order Details</h2>

              <div className="space-y-4 bg-muted/50 p-6 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Customer</p>
                  <p className="font-semibold">{order.customerName}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Contact</p>
                  <p className="font-medium">{order.customerEmail}</p>
                  {order.customerPhone && (
                    <p className="font-medium">{order.customerPhone}</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
                  <p className="font-medium">
                    {formatAddress(order.customerAddress, order.shippingCity, order.shippingState, order.shippingZip)}
                  </p>
                  {order.shippingCountry && (
                    <p className="text-sm text-muted-foreground">
                      {order.shippingCountry}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Payment</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-medium">
                      {order.paymentMethod || 'Card'}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">
                      ${order.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className={order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}>
                      {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax:</span>
                    <span className="font-medium">
                      ${order.tax.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-4">Items ({order.items.length})</h3>
                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || '/images/product-shoe.jpg'}
                          alt={item.productId}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold">Product #{item.productId.slice(-8)}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                        {item.size && (
                          <p className="text-xs text-muted-foreground">
                            Size: {item.size}
                          </p>
                        )}
                        {item.color && (
                          <p className="text-xs text-muted-foreground">
                            Color: {item.color}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div className="lg:col-span-1">
            <div className="bg-muted/50 p-6 rounded-lg sticky top-8">
              <h2 className="text-xl font-bold mb-6">Order Timeline</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-600 text-background flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div className="flex-1 pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                    <p className="font-semibold">Order Placed</p>
                  </div>
                </div>

                {order.status !== 'pending' && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-background flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div className="flex-1 pb-4 border-b border-border">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.updatedAt)}
                      </p>
                      <p className="font-semibold">Processing</p>
                    </div>
                  </div>
                )}

                {order.status === 'shipped' && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-background flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div className="flex-1 pb-4 border-b border-border">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.updatedAt)}
                      </p>
                      <p className="font-semibold">On the Way</p>
                      {order.trackingNumber && (
                        <p className="font-mono text-sm">
                          Track: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {order.status === 'delivered' && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-600 text-background flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <div className="flex-1 pb-4 border-b border-border">
                      <p className="text-sm text-muted-foreground">
                        Delivered on {formatDate(order.updatedAt)}
                      </p>
                      <p className="font-semibold">Delivered</p>
                      <p className="text-sm text-muted-foreground">
                        Thank you for your purchase!
                      </p>
                    </div>
                  </div>
                )}

                {order.status === 'pending' && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-600 text-background flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div className="flex-1 pb-4 border-b border-border">
                      <p className="text-sm text-muted-foreground">
                        Awaiting confirmation
                      </p>
                      <p className="font-semibold">Awaiting Confirmation</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Download Invoice Button */}
          <div className="lg:col-span-3">
            <button className="w-full py-3 border-2 border-border rounded-lg hover:bg-foreground hover:text-background transition-colors clickable flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
