'use client';

import { Shield, ArrowRight } from 'lucide-react';
import CountdownTimer from '@/components/ui/CountdownTimer';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,212,255,0.08)_0%,_transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-400/30 bg-red-400/5 text-red-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          SEC Compliance Deadline: June 3, 2026
        </div>

        {/* Countdown */}
        <div className="flex justify-center mb-10">
          <CountdownTimer />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] tracking-tight leading-[1.1] mb-6">
          <span className="text-white">Regulation S-P Compliance</span>
          <br />
          <span className="bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent">
            in 15 Minutes
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Generate every required SEC policy document for your RIA.
          Incident response, vendor oversight, breach notification, and recordkeeping.
          All tailored to your firm.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/start">
            <Button size="lg" className="gap-2 text-lg">
              <Shield size={20} />
              Get Compliant Now
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="#pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
          <span>4 required documents</span>
          <span className="hidden sm:inline">|</span>
          <span>Tailored to your firm</span>
          <span className="hidden sm:inline">|</span>
          <span>Branded PDFs</span>
          <span className="hidden sm:inline">|</span>
          <span>$299 one-time</span>
        </div>
      </div>
    </section>
  );
}
