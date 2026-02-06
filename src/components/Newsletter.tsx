'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  dark?: boolean;
}

export default function NewsletterSection({
  title = 'Subscribe to Our Newsletter',
  description = 'Get exclusive offers, new arrivals, and insider access.',
  dark = false,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStatus('success');
      setSuccess(true);
      setSuccessMessage('Welcome to the Nike family!');
      setEmail('');
    } catch (error) {
      setStatus('error');
    } finally {
      if (status !== 'loading') {
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      }
    }
  };

  return (
    <section
      className={`py-16 px-4 ${dark ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              {title}
            </h2>
            <p className="text-lg md:text-xl opacity-80">
              {description}
            </p>
          </div>

          {/* Right Side - Newsletter Form */}
          <div>
            {showSuccess ? (
              <div className="bg-white/10 dark:bg-foreground/10 p-8 rounded-2xl text-center">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">You're In!</h3>
              <p className="text-muted-foreground mb-4">{successMessage}</p>
            </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                {status === 'error' && (
                  <p className="text-sm text-red-500 text-center mb-4">
                    Something went wrong. Please try again.
                  </p>
                )}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 text-lg border border-2 focus:outline-none focus:ring-4 focus:ring-foreground/20 placeholder:text-muted/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed clickable flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-2 border-current border-foreground border-r-foreground animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  By subscribing, you agree to our Privacy Policy
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
