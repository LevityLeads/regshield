import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { firmData, email } = await req.json();

    if (!firmData || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('regshield_sessions')
      .insert({ firm_data: firmData, email })
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({ sessionId: data.id });
  } catch (err) {
    console.error('Session creation error:', err);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
