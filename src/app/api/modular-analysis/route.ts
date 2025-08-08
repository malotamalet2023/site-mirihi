import { NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini-diagnostic-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { moduleId, answers, categoryScores } = body || {};
    if (!moduleId || !answers) {
      return NextResponse.json({ error: 'Missing moduleId or answers' }, { status: 400 });
    }

    const data = await geminiService.generateEnhancedRecommendations({
      moduleType: moduleId,
      userResponses: { answers, categoryScores },
      excelContext: '',
      userProfile: {}
    });

    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Internal error' }, { status: 500 });
  }
}
