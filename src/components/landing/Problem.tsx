import { AlertTriangle, DollarSign, Clock, Users } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Small RIAs affected',
    detail: 'Firms with under $1.5B AUM must comply',
  },
  {
    icon: DollarSign,
    value: '$3K-$15K',
    label: 'Traditional consultant cost',
    detail: 'Compliance firms charge premium rates',
  },
  {
    icon: Clock,
    value: '15+ Hours',
    label: 'Manual policy drafting',
    detail: 'Per document, if you know what to write',
  },
  {
    icon: AlertTriangle,
    value: '$150K+',
    label: 'Non-compliance penalties',
    detail: 'SEC enforcement actions are increasing',
  },
];

export default function Problem() {
  return (
    <section className="py-20 sm:py-28 border-t border-navy-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            The Problem Is{' '}
            <span className="text-red-400">Bigger Than You Think</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The SEC&apos;s amended Regulation S-P requires written policies most small firms
            don&apos;t have. The deadline is approaching fast, and the stakes are real.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label, detail }) => (
            <div
              key={label}
              className="p-6 rounded-xl bg-navy-card border border-navy-border hover:border-slate-500/50 transition-colors"
            >
              <Icon size={24} className="text-cyan mb-4" />
              <div className="text-3xl font-bold font-[family-name:var(--font-heading)] text-white mb-1">
                {value}
              </div>
              <div className="text-sm font-medium text-slate-300 mb-2">{label}</div>
              <div className="text-sm text-slate-500">{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
