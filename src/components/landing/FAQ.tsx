'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Is this legal advice?',
    a: 'No. RegShield generates compliance policy templates based on published SEC guidance, NIST frameworks, and industry best practices. These documents are starting points that should be reviewed by your compliance team or legal counsel before implementation. They cover the structural and procedural requirements of Regulation S-P but do not constitute legal advice.',
  },
  {
    q: 'What is SEC Regulation S-P?',
    a: 'Regulation S-P (17 CFR Part 248) governs the privacy of consumer financial information held by registered investment advisers, broker-dealers, and other financial institutions. The SEC adopted significant amendments in May 2024, requiring written incident response programs, service provider oversight policies, breach notification procedures, and enhanced recordkeeping. The compliance deadline for smaller entities (under $1.5B AUM) is June 3, 2026.',
  },
  {
    q: 'Who needs these documents?',
    a: 'Any SEC-registered investment adviser (RIA) managing customer personal information must comply with Regulation S-P. This is especially critical for smaller firms (under $1.5B AUM) that may not have dedicated compliance staff or existing written policies covering the new requirements.',
  },
  {
    q: 'How are the documents customized to my firm?',
    a: 'During the onboarding process, you provide details about your firm: legal name, registration numbers, custodians, types of customer data you hold, service providers, and key personnel. Our AI uses this information to generate policies specifically referencing your firm name, your CCO, your custodians, your service providers, and the exact types of data you handle.',
  },
  {
    q: 'What format are the documents in?',
    a: 'You receive professionally formatted PDF documents with your firm name, preparation date, and proper section numbering. Each document includes a cover page, table of contents references, and is structured for easy SEC examination review.',
  },
  {
    q: 'What if my firm details change?',
    a: 'The current version provides a one-time generation based on the information you provide. If your firm undergoes significant changes (new custodians, different data types, staff changes), we recommend regenerating your documents. A Pro tier with ongoing monitoring and annual reviews is coming soon.',
  },
  {
    q: 'Can I edit the documents after downloading?',
    a: 'The PDFs are formatted for immediate use, but we understand firms may need to make adjustments. A Word document export option is planned for the near future. In the meantime, you can use the PDFs as your authoritative copies and annotate as needed.',
  },
  {
    q: 'Is my firm data secure?',
    a: 'Your firm information is used solely to generate your compliance documents and is stored securely. We do not share, sell, or use your data for any other purpose. All data is encrypted in transit and at rest.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 border-t border-navy-border">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Common Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-xl border border-navy-border overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-navy-card/50 transition-colors cursor-pointer"
              >
                <span className="font-medium text-white pr-4">{q}</span>
                <ChevronDown
                  size={18}
                  className={`text-slate-500 shrink-0 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-slate-400 leading-relaxed">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
