import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { userId, xp, level, achievements } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Update Profile
        const { error: updateError } = await supabase
            .from('user_profiles')
            .update({
                current_xp: xp,
                current_level: level,
                last_activity_date: new Date().toISOString()
            })
            .eq('user_id', userId);

        if (updateError) throw updateError;

        // Sync Achievements
        if (achievements && achievements.length > 0) {
            // Prepare rows for upsert
            const rows = achievements.map((id: string) => ({
                user_id: userId,
                achievement_id: id
            }));

            // Upsert (ignore duplicates)
            const { error: insertError } = await supabase
                .from('user_achievements')
                .upsert(rows, { onConflict: 'user_id, achievement_id', ignoreDuplicates: true });

            if (insertError) throw insertError;
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Sync error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
