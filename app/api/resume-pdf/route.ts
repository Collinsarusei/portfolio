import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // For now, we'll redirect to the HTML version
    // We'll implement proper PDF generation
    return new NextResponse('PDF generation endpoint', {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    return new NextResponse('Error generating PDF', { status: 500 });
  }
}
