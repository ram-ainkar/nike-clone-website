import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST reset password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    // In production, you would validate the token and reset the password
    // For demo, we'll just return success
    return NextResponse.json({
      message: 'Password reset successful (Demo mode)',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
