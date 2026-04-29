import { ShieldAlert, Eye, Bell, Archive } from 'lucide-react';
import { DOC_TYPE_LABELS, DOC_TYPE_DESCRIPTIONS, type DocumentType } from '@/lib/types';

const docs: { type: DocumentType; icon: typeof ShieldAlert }[] = [
  { type: 'incident-response', icon: ShieldAlert },
  { type: 'vendor-oversight', icon: Eye },
  { type: 'breach-notification', icon: Bell },
  { type: 'recordkeeping', icon: Archive },
];

export default function WhatYouGet() {
  return (
    <section className="py-20 sm:py-28 border-t border-navy-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Four Documents.{' '}
            <span className="text-cyan">Full Compliance.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Every document required under the amended SEC Regulation S-P,
            generated specifically for your firm and formatted for examination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docs.map(({ type, icon: Icon }) => (
            <div
              key={type}
              className="p-8 rounded-xl bg-navy-card border border-navy-border hover:border-cyan/30 transition-all group"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center shrink-0 group-hover:bg-cyan/15 transition-colors">
                  <Icon size={22} className="text-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-white mb-2">
                    {DOC_TYPE_LABELS[type]}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {DOC_TYPE_DESCRIPTIONS[type]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-xl bg-emerald/5 border border-emerald/20 text-center">
          <p className="text-emerald text-sm font-medium">
            All documents reference 17 CFR Part 248, SEC Release No. 34-100155,
            and align with NIST Cybersecurity Framework guidance.
          </p>
        </div>
      </div>
    </section>
  );
}
