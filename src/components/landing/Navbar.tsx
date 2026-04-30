'use client';

import { Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-xl border-b border-navy-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield size={22} className="text-cyan" />
          <span className="font-bold font-[family-name:var(--font-heading)] text-white text-lg">
            RegShield
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/tools/compliance-checker"
            className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Tools
          </Link>
          <Link
            href="/insights"
            className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Insights
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Pricing
          </Link>
          <Link href="/start">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
