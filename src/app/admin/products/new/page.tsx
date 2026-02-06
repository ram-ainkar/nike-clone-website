'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    comparePrice: '',
    image: '',
    category: '',
    subcategory: '',
    brand: '',
    stock: '',
    featured: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setImageUrls([...imageUrls, url]);
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
          image: formData.image || '/images/product-shoe.jpg',
          category: formData.category,
          subcategory: formData.subcategory || null,
          brand: formData.brand || null,
          stock: parseInt(formData.stock) || 0,
          featured: formData.featured,
          images: [...imageUrls],
        }),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        alert('Failed to create product. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-muted rounded-lg transition-colors clickable"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="Air Max Pulse"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                required
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="180.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
              placeholder="Product description..."
            />
          </div>

          {/* Pricing & Inventory */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Compare Price ($)
              </label>
              <input
                type="number"
                name="comparePrice"
                step="0.01"
                min="0"
                value={formData.comparePrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="199.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="100"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-5 h-5 accent-foreground rounded focus:ring-2 focus:ring-foreground/20"
                />
                <span className="text-sm text-muted-foreground">
                  Featured
                </span>
              </label>
            </div>
          </div>

          {/* Category & Brand */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
              >
                <option value="">Select a category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Subcategory
              </label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="Running shoes, basketball, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="Nike, Adidas, Jordan"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Main Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">
                  Additional Images
                </label>
                <span className="text-xs text-muted-foreground">
                  ({imageUrls.length} added)
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Image URL"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleAddImage();
                      e.currentTarget.value = '';
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 bg-muted hover:bg-muted/80 transition-colors rounded-lg clickable"
                >
                  Add Image
                </button>
              </div>

              {imageUrls.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                    <img
                      src={url}
                      alt={`Additional ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-all clickable z-10"
                    title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          {formData.image && (
            <div>
              <p className="text-sm font-medium mb-2">Main Image Preview:</p>
              <div className="w-48 h-48 bg-muted rounded-lg overflow-hidden">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Additional Images Preview */}
          {imageUrls.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">
                Additional Images Preview:
              </p>
              <div className="flex flex-wrap gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="w-24 h-24 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={url}
                      alt={`Additional ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed clickable"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Create Product'}
            </button>

            <Link
              href="/admin/products"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors clickable"
            >
              <X className="w-4 h-4" />
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
