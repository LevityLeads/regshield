import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './prompts/shared';
import { buildIncidentResponsePrompt } from './prompts/incident-response';
import { buildVendorOversightPrompt } from './prompts/vendor-oversight';
import { buildBreachNotificationPrompt } from './prompts/breach-notification';
import { buildRecordkeepingPrompt } from './prompts/recordkeeping';
import type { FirmData, DocumentType, DocumentSection } from './types';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const PROMPT_BUILDERS: Record<DocumentType, (firm: FirmData) => string> = {
  'incident-response': buildIncidentResponsePrompt,
  'vendor-oversight': buildVendorOversightPrompt,
  'breach-notification': buildBreachNotificationPrompt,
  'recordkeeping': buildRecordkeepingPrompt,
};

export async function generateDocument(
  docType: DocumentType,
  firmData: FirmData
): Promise<DocumentSection[]> {
  const userPrompt = PROMPT_BUILDERS[docType](firmData);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  // Extract text content
  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from AI');
  }

  // Parse JSON from response
  const jsonText = textBlock.text;

  // Try to extract JSON from the response (it might be wrapped in markdown code blocks)
  const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from AI response');
  }

  const parsed = JSON.parse(jsonMatch[0]);
  return parsed.sections as DocumentSection[];
}

export async function generateAllDocuments(
  firmData: FirmData
): Promise<Record<DocumentType, DocumentSection[]>> {
  const docTypes: DocumentType[] = [
    'incident-response',
    'vendor-oversight',
    'breach-notification',
    'recordkeeping',
  ];

  // Generate all 4 in parallel
  const results = await Promise.all(
    docTypes.map(async (type) => {
      const sections = await generateDocument(type, firmData);
      return { type, sections };
    })
  );

  const docs = {} as Record<DocumentType, DocumentSection[]>;
  for (const { type, sections } of results) {
    docs[type] = sections;
  }
  return docs;
}
