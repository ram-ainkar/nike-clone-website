'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
      ]);

      const products = await productsRes.json();
      const orders = await ordersRes.json();

      const totalRevenue = orders.reduce(
        (sum: number, order: any) => sum + order.total,
        0
      );

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
        ]);

        const products = await productsRes.json();
        const orders = await ordersRes.json();

        const totalRevenue = orders.reduce(
          (sum: number, order: any) => sum + order.total,
          0
        );

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalRevenue,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors clickable"
          >
            Back to Store
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted/50 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <Package className="w-10 h-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-3xl font-bold">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <ShoppingCart className="w-10 h-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <DollarSign className="w-10 h-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold">
                  ${stats.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-4 p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors clickable"
          >
            <Package className="w-8 h-8" />
            <div>
              <h3 className="font-semibold">Manage Products</h3>
              <p className="text-sm text-muted-foreground">
                Add, edit, or remove products
              </p>
            </div>
            <TrendingUp className="w-8 h-8 ml-auto" />
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-4 p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors clickable"
          >
            <ShoppingCart className="w-8 h-8" />
            <div>
              <h3 className="font-semibold">View Orders</h3>
              <p className="text-sm text-muted-foreground">
                Manage and track orders
              </p>
            </div>
            <TrendingUp className="w-8 h-8 ml-auto" />
          </Link>
        </div>
      </main>
    </div>
  );
}
