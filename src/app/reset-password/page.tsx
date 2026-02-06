'use client';

import { useState } from 'react';
import Link from 'next/navigation';
import { Lock, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setStatus('error');
      setMessage('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Password reset successful! You can now login with your new password.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to reset password');
      }
    } catch (error: any) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="max-w-md w-full space-y-8">
        {status === 'success' ? (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Password Reset Successful</h1>
            <p className="text-muted-foreground">
              {message}
            </p>
            <Link
              href="/login"
              className="text-primary hover:underline clickable inline-block"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <Lock className="w-16 h-16 mx-auto text-foreground mb-4" />
              <h1 className="text-3xl font-bold mb-2">Set New Password</h1>
              <p className="text-muted-foreground">
                Enter your new password below
              </p>
            </div>

            {!token ? (
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  No reset token found. Request a new reset link.
                </p>
                <Link
                  href="/forgot-password"
                  className="text-primary hover:underline clickable inline-block"
                >
                  Request Reset Link
                </Link>
              </div>
            ) : (
              <div className="bg-muted/50 p-8 rounded-lg">
                {status === 'error' && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg mb-6">
                    <p className="text-sm text-destructive">{message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      New Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                      placeholder="•••••••••••••"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                      placeholder="••••••••••••"
                    />
                  </div>

                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <ul className="list-disc pl-5">
                      <li>At least 6 characters</li>
                      <li>Include numbers and letters</li>
                      <li>At least one uppercase letter</li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed clickable flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>

                  <Link
                    href="/login"
                    className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors clickable"
                  >
                    Cancel
                  </Link>
                </form>
              </div>
            )}
          </>
        )}

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors clickable"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
