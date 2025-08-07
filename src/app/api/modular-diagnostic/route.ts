import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Modular diagnostic API placeholder',
    status: 'development' 
  });
}

export async function POST() {
  return NextResponse.json({ 
    message: 'Modular diagnostic functionality coming soon',
    status: 'development' 
  });
}
