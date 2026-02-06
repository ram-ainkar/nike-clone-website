'use client';

import { ArrowLeft, CheckCircle, Clock, Package, Truck, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZip?: string;
  shippingCountry?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  trackingNumber?: string;
  items: any[];
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }
    fetchOrder(orderId.trim());
  };

  const fetchOrder = async (id: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Order not found');
      }

      setOrder(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 text-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 text-blue-200';
      case 'shipped':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 text-green-200';
      case 'delivered':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 text-purple-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order ID to track your shipment
          </p>
        </div>

        {/* Order Search Form */}
        <form onSubmit={handleTrackOrder} className="max-w-md mx-auto mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g., ORDER-123)"
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed clickable"
            >
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </div>
          {error && (
            <p className="text-sm text-destructive text-center mt-2">{error}</p>
          )}
        </form>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Header */}
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Order Number
                  </p>
                  <p className="text-2xl font-bold">
                    #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Placed on{' '}
                    {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                  >
                    <span className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{order.customerName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{order.customerEmail}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{order.customerPhone || 'Not provided'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Shipping Address</p>
                  <p className="font-medium">{order.customerAddress}</p>
                  {order.shippingCity && (
                    <p className="text-sm text-muted-foreground">
                      {order.shippingCity}, {order.shippingState} {order.shippingZip}
                      {order.shippingCountry}
                    </p>
                  )}
                </div>
              </div>

              {/* Tracking Info */}
              {order.trackingNumber && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Truck className="w-5 h-5" />
                    Tracking Number
                  </div>
                  <p className="font-mono text-lg">
                    {order.trackingNumber}
                  </p>
                </div>
              )}

              {/* Order Items */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 bg-background rounded-lg"
                    >
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden shrink-0">
                        <img
                          src="/images/product-shoe.jpg"
                          alt={item.productId}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Product ID: {item.productId}</p>
                        <div className="flex items-center gap-4">
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Price: ${item.price.toFixed(2)}
                          </p>
                        </div>
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
                      <div className="text-right font-semibold">
                        ${(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Order Timeline */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="shrink-0 w-8">
                    <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {(order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered') && (
                  <div className="flex gap-4">
                    <div className="shrink-0 w-8">
                      <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Processing Order</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {(order.status === 'shipped' || order.status === 'delivered') && (
                  <div className="flex gap-4">
                    <div className="shrink-0 w-8">
                      <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Shipped</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {order.status === 'delivered' && (
                  <div className="flex gap-4">
                    <div className="shrink-0 w-8">
                      <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Delivered</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {order.status === 'cancelled' && (
                  <div className="flex gap-4">
                    <div className="shrink-0 w-8">
                      <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Cancelled</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Totals */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {order.total > 100 ? 'Free' : '$10.00'}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-6">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors clickable"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to My Orders
              </Link>
            </div>
            </div>
          </div>
        )}

        {!order && !loading && !error && orderId.trim() !== '' && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-4">
              Check your email for order confirmation or contact support.
            </p>
            <Link
              href="/profile"
              className="text-primary hover:underline clickable"
            >
              View My Orders
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
