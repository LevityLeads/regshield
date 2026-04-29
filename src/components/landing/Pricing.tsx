'use client';

import { Check, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const features = [
  'Incident Response Program',
  'Service Provider Oversight Policies',
  'Breach Notification Templates',
  'Recordkeeping Procedures',
  'Branded PDF documents',
  'Tailored to your firm profile',
  'SEC examination-ready format',
  'Immediate download',
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 border-t border-navy-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            One Price. No Surprises.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Traditional compliance consultants charge $3,000 to $15,000 for the same
            documents. RegShield delivers them in minutes for a fraction of the cost.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="relative rounded-2xl bg-navy-card border border-cyan/30 p-8 sm:p-10 shadow-[0_0_40px_rgba(0,212,255,0.08)]">
            {/* Popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full bg-cyan text-navy text-sm font-bold">
                Most Popular
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-white mb-2">
                Complete Compliance Kit
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold font-[family-name:var(--font-heading)] text-white">
                  $299
                </span>
                <span className="text-slate-500 text-lg">/one-time</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                That&apos;s less than 2% of typical consultant fees
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan/10 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-cyan" />
                  </div>
                  <span className="text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>

            <Link href="/start" className="block">
              <Button size="lg" className="w-full gap-2">
                Start Now
                <ArrowRight size={18} />
              </Button>
            </Link>

            <p className="text-xs text-slate-500 text-center mt-4">
              Secure payment via Stripe. No subscription required.
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl bg-navy-card border border-navy-border">
            <div className="text-sm text-slate-500 mb-1">Compliance Consultant</div>
            <div className="text-2xl font-bold text-slate-300 line-through">$3,000 - $15,000</div>
            <div className="text-sm text-slate-500 mt-1">2-6 weeks turnaround</div>
          </div>
          <div className="p-6 rounded-xl bg-navy-card border border-navy-border">
            <div className="text-sm text-slate-500 mb-1">Law Firm</div>
            <div className="text-2xl font-bold text-slate-300 line-through">$5,000 - $25,000</div>
            <div className="text-sm text-slate-500 mt-1">4-8 weeks turnaround</div>
          </div>
          <div className="p-6 rounded-xl bg-cyan/5 border border-cyan/30">
            <div className="text-sm text-cyan mb-1">RegShield</div>
            <div className="text-2xl font-bold text-white">$299</div>
            <div className="text-sm text-cyan mt-1">15 minutes turnaround</div>
          </div>
        </div>
      </div>
    </section>
  );
}
