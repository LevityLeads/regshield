import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import HowItWorks from '@/components/landing/HowItWorks';
import WhatYouGet from '@/components/landing/WhatYouGet';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <WhatYouGet />
        <Pricing />
        <FAQ />

        {/* Final CTA */}
        <section className="py-20 sm:py-28 border-t border-navy-border">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
              The Deadline Won&apos;t Wait.
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
              June 3, 2026 is coming whether you are prepared or not.
              Get your SEC Regulation S-P compliance documents today.
            </p>
            <a
              href="/start"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg bg-cyan text-navy-card hover:bg-cyan-dim shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_30px_rgba(0,212,255,0.25)] transition-all"
            >
              Get Compliant Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
