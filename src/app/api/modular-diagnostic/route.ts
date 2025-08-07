import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  return NextResponse.json({ 
    message: 'Modular diagnostic API placeholder',
    status: 'development' 
  });
}

export async function POST(_request: NextRequest) {
  return NextResponse.json({ 
    message: 'Modular diagnostic functionality coming soon',
    status: 'development' 
  });
}
