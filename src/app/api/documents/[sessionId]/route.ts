import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  try {
    const { data: documents, error } = await supabase
      .from('regshield_documents')
      .select('id, doc_type, generated_at')
      .eq('session_id', sessionId)
      .order('doc_type');

    if (error) throw error;

    return NextResponse.json({ documents: documents || [] });
  } catch (err) {
    console.error('Fetch documents error:', err);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
