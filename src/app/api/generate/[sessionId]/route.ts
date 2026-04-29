import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateAllDocuments } from '@/lib/generate';
import type { FirmData, DocumentType } from '@/lib/types';

export const maxDuration = 60; // Vercel Pro allows up to 60s

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  try {
    // Get the session
    const { data: session, error: sessionError } = await supabase
      .from('regshield_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Check if already generated
    const { data: existingDocs } = await supabase
      .from('regshield_documents')
      .select('id')
      .eq('session_id', sessionId);

    if (existingDocs && existingDocs.length >= 4) {
      return NextResponse.json({ status: 'already_generated' });
    }

    // Check if paid (or dev mode)
    if (!session.paid) {
      return NextResponse.json({ error: 'Payment required' }, { status: 402 });
    }

    const firmData = session.firm_data as FirmData;

    // Generate all 4 documents in parallel
    const docs = await generateAllDocuments(firmData);

    // Store in database
    const inserts = Object.entries(docs).map(([type, sections]) => ({
      session_id: sessionId,
      doc_type: type as DocumentType,
      content: { sections },
      generated_at: new Date().toISOString(),
    }));

    const { error: insertError } = await supabase.from('regshield_documents').insert(inserts);

    if (insertError) {
      console.error('Failed to store documents:', insertError);
      throw insertError;
    }

    return NextResponse.json({ status: 'generated', count: 4 });
  } catch (err) {
    console.error('Generation error:', err);
    return NextResponse.json(
      { error: 'Document generation failed. Please try again.' },
      { status: 500 }
    );
  }
}
