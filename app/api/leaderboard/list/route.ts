import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const examId = searchParams.get('examId');

        if (!examId) {
            return NextResponse.json({ error: 'Exam ID is required' }, { status: 400 });
        }

        // Fetch top 10 scores
        const { data, error } = await supabase
            .from('exam_results')
            .select('score, time_taken_seconds, created_at, user_profiles(display_name, current_level)')
            .eq('exam_id', examId)
            .order('score', { ascending: false })
            .order('time_taken_seconds', { ascending: true })
            .limit(20);

        if (error) throw error;

        return NextResponse.json({ leaderboard: data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
