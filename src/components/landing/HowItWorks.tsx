import { ClipboardList, Cpu, Download } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Answer Questions',
    description:
      'Tell us about your firm: custodians, data types, service providers, and key personnel. Takes about 5 minutes.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'AI Generates Policies',
    description:
      'Our AI analyzes your firm profile and generates all four required SEC Regulation S-P policy documents, tailored to your specifics.',
  },
  {
    icon: Download,
    step: '03',
    title: 'Download & Implement',
    description:
      'Download professionally branded PDFs ready for SEC examination. Review, sign, and implement. You are compliant.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 border-t border-navy-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Three Steps to{' '}
            <span className="bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent">
              Compliance
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            No compliance background needed. No consultants to hire.
            Just answer questions about your firm and we handle the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="relative">
              <div className="p-8 rounded-xl bg-navy-card border border-navy-border h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                    <Icon size={22} className="text-cyan" />
                  </div>
                  <span className="text-sm font-mono text-slate-500">{step}</span>
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-white mb-3">
                  {title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
