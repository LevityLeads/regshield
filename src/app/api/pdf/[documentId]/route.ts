import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { supabase } from '@/lib/supabase';
import { FullDocument } from '@/components/pdf/DocumentTemplate';
import { DOC_TYPE_LABELS, type DocumentType, type DocumentSection } from '@/lib/types';
import React from 'react';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  const { documentId } = await params;

  try {
    // Get the document
    const { data: doc, error: docError } = await supabase
      .from('regshield_documents')
      .select('*, regshield_sessions(*)')
      .eq('id', documentId)
      .single();

    if (docError || !doc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const session = doc.regshield_sessions;
    const firmData = session.firm_data;
    const sections = (doc.content as { sections: DocumentSection[] }).sections;
    const docType = doc.doc_type as DocumentType;
    const title = DOC_TYPE_LABELS[docType];

    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const element = React.createElement(FullDocument, {
      title,
      firmName: firmData.legalName,
      ccoName: firmData.ccoName,
      date: today,
      sections,
    });

    const buffer = await renderToBuffer(element);
    const uint8 = new Uint8Array(buffer);

    const filename = `${firmData.legalName.replace(/[^a-zA-Z0-9]/g, '-')}-${docType}.pdf`;

    return new NextResponse(uint8, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('PDF generation error:', err);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
