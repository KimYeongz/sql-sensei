import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        // Check if user exists
        let { data: user, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('display_name', name)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
            throw error;
        }

        if (!user) {
            // Create new user
            const { data: newUser, error: createError } = await supabase
                .from('user_profiles')
                .insert([{ display_name: name }])
                .select()
                .single();

            if (createError) throw createError;
            user = newUser;
        }

        // Get user achievements
        const { data: achievementRows, error: achievementError } = await supabase
            .from('user_achievements')
            .select('achievement_id')
            .eq('user_id', user.user_id);

        if (achievementError) throw achievementError;

        const achievements = achievementRows ? achievementRows.map((row: any) => row.achievement_id) : [];

        return NextResponse.json({
            user,
            achievements
        });

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
