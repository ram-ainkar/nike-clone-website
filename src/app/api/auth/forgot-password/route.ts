import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST send password reset link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists (security)
      return NextResponse.json({
        message: 'If an account exists with this email, a password reset link will be sent.',
      });
    }

    // In production, send actual email here
    // For demo, we'll just return success
    return NextResponse.json({
      message: 'Password reset link sent to your email',
      demoNote: 'In production, an actual email with reset link would be sent',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to send reset link' },
      { status: 500 }
    );
  }
}
