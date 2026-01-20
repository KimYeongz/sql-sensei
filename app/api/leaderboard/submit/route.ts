import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { userId, examId, score, maxScore, timeTaken } = await req.json();

        if (!userId || !examId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert result
        const { error } = await supabase
            .from('exam_results')
            .insert([{
                user_id: userId,
                exam_id: examId,
                score: score,
                max_score: maxScore,
                time_taken_seconds: timeTaken
            }]);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
