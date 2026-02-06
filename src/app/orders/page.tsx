'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, CheckCircle, Clock, Mail, MapPin, Package, Phone, Truck, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  paymentMethod?: string;
  total: number;
  status: string;
  trackingNumber?: string;
  items: {
    id: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export default function OrderTrackingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }

    if (user) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`/api/orders?userId=${user.id}`);
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      };
      fetchOrders();
    }
  }, [user, loading, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/profile"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors clickable"
          >
            ← Back to Profile
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Order Tracking</h1>
          <p className="text-muted-foreground">
            Track all your orders in one place
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-4">
              Start shopping to see your orders here
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors clickable"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-muted/50 p-6 rounded-lg space-y-6"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">
                      Order #{order.id.slice(-8)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">
                      ${order.total.toFixed(2)}
                    </p>
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                    >
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pb-6 border-b border-border">
                  <div className="flex items-start gap-2">
                    <User className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{order.customerName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{order.customerEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">
                        {order.customerPhone || 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ship To</p>
                      <p className="font-medium text-sm">
                        {order.shippingCity}, {order.shippingState} {order.shippingZip}
                      </p>
                      {order.shippingCountry && (
                        <p className="text-sm text-muted-foreground">
                          {order.shippingCountry}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Order Items</h4>
                  <div className="bg-background rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left px-6 py-3 font-semibold">
                            Product
                          </th>
                          <th className="text-right px-6 py-3 font-semibold">
                            Price
                          </th>
                          <th className="text-center px-6 py-3 font-semibold">
                            Qty
                          </th>
                          <th className="text-right px-6 py-3 font-semibold">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item.id} className="border-t border-border">
                            <td className="px-6 py-4">
                              <p className="font-medium">Product ID: {item.productId}</p>
                            </td>
                            <td className="text-right px-6 py-4 font-semibold">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="text-center px-6 py-4">
                              {item.quantity}
                            </td>
                            <td className="text-right px-6 py-4 font-bold">
                              ${(item.quantity * item.price).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {order.trackingNumber && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg">
                      <Truck className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Tracking Number</p>
                        <p className="font-semibold">{order.trackingNumber}</p>
                      </div>
                    </div>
                  )}

                  {order.status === 'pending' && (
                    <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors clickable">
                      Cancel Order
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors clickable"
                  >
                    {selectedOrder?.id === order.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {/* Order Details (Collapsible) */}
                {selectedOrder && selectedOrder.id === order.id && (
                  <div className="mt-6 p-6 bg-background rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Order Details</h3>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="text-muted-foreground hover:text-foreground clickable"
                      >
                        Close
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Order ID
                        </p>
                        <p className="font-mono text-xs">
                          {selectedOrder.id}
                        </p>

                        <p className="text-sm text-muted-foreground mb-1">
                          Order Date
                        </p>
                        <p className="font-mono text-xs">
                          {new Date(selectedOrder.createdAt).toLocaleString()}
                        </p>

                        <p className="text-sm text-muted-foreground mb-1">
                          Order Total
                        </p>
                        <p className="text-2xl font-bold">
                          ${selectedOrder.total.toFixed(2)}
                        </p>

                        <p className="text-sm text-muted-foreground mb-1">
                          Payment Method
                        </p>
                        <p className="font-mono text-xs uppercase">
                          {selectedOrder.paymentMethod || 'Card'}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Shipping Address
                        </p>
                        <p className="font-mono text-xs max-w-xs">
                          {selectedOrder.customerAddress}
                        </p>

                        <p className="text-sm text-muted-foreground mb-1">
                          Delivery Address
                        </p>
                        <p className="font-mono text-xs max-w-xs">
                          {selectedOrder.shippingCity}, {selectedOrder.shippingState} {selectedOrder.shippingZip}
                        </p>
                        {selectedOrder.shippingCountry && (
                          <p className="font-mono text-xs max-w-xs">
                            {selectedOrder.shippingCountry}
                          </p>
                        )}

                        {selectedOrder.customerPhone && (
                          <>
                            <p className="text-sm text-muted-foreground mb-1">
                              Phone
                            </p>
                            <p className="font-mono text-xs">
                              {selectedOrder.customerPhone}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Order Status
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-block px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}
                            >
                              {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        {selectedOrder.trackingNumber && (
                          <div className="p-4 bg-muted/50 rounded-lg border border-border">
                            <p className="text-sm text-muted-foreground mb-1">
                              Tracking Number
                            </p>
                            <p className="font-mono text-lg">
                              {selectedOrder.trackingNumber}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Track your package at
                            </p>
                          </div>
                        )}

                        <div className="p-4 bg-muted/50 rounded-lg border-border">
                          <p className="text-sm text-muted-foreground mb-2">
                            Estimated Delivery
                          </p>
                          <p className="font-semibold">
                            3-5 Business Days
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Free Shipping on orders over $100
                          </p>
                        </div>

                        <div className="text-sm">
                          <p className="text-muted-foreground mb-2">
                            Need Help?
                          </p>
                          <Link
                            href="/contact"
                            className="text-primary hover:underline clickable"
                          >
                            Contact Support
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <Link
                        href="/products"
                        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors clickable"
                      >
                        Continue Shopping
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Nike-Inspired E-Commerce. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
