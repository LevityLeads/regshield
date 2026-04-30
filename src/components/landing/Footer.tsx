import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-navy-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-cyan" />
            <span className="font-bold font-[family-name:var(--font-heading)] text-white">
              RegShield
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link
              href="/tools/compliance-checker"
              className="hover:text-white transition-colors"
            >
              Free Tools
            </Link>
            <Link
              href="/insights"
              className="hover:text-white transition-colors"
            >
              Insights
            </Link>
            <Link
              href="/about"
              className="hover:text-white transition-colors"
            >
              About
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          RegShield generates compliance templates based on published SEC guidance.
          This is not legal advice. Consult qualified legal counsel.
        </div>
        <div className="mt-3 text-center text-xs text-slate-500/60">
          A product by Levity Leads Ltd.
        </div>
      </div>
    </footer>
  );
}
