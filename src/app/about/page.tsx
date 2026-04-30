import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, FileText, Users, Scale, ArrowRight } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'About RegShield | SEC Regulation S-P Compliance for Small RIAs',
  description:
    'RegShield helps small registered investment advisers meet SEC Regulation S-P requirements. Built by compliance professionals who understand the reality of running a small RIA.',
  openGraph: {
    title: 'About RegShield',
    description:
      'SEC Regulation S-P compliance made accessible for small RIAs.',
    type: 'website',
    url: 'https://regshield.co/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About RegShield',
    description:
      'SEC Regulation S-P compliance made accessible for small RIAs.',
  },
  alternates: {
    canonical: 'https://regshield.co/about',
  },
};

function AboutSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RegShield',
    url: 'https://regshield.co',
    description:
      'AI-powered SEC Regulation S-P compliance documents for small registered investment advisers.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Levity Leads Ltd',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '85 Great Portland Street, First Floor',
        addressLocality: 'London',
        postalCode: 'W1W 7LT',
        addressCountry: 'GB',
      },
    },
    founder: {
      '@type': 'Person',
      name: 'Rees Calder',
      jobTitle: 'Founder',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutSchema />
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Hero section */}
          <div className="mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-6">
              About RegShield
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              RegShield exists because small registered investment advisers
              deserve compliance tools that match the way they actually work:
              lean, fast, and without the overhead of a Big Four engagement.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              The SEC amended Regulation S-P in 2023, expanding requirements
              around incident response planning, vendor oversight, breach
              notification, and recordkeeping. Compliance is mandatory by
              June 3, 2026. For large firms with in-house compliance teams,
              this is routine. For the thousands of small RIAs managing a
              handful of advisers and limited budgets, it is a serious burden.
            </p>
          </div>

          {/* What RegShield Does */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
              What RegShield Does
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              RegShield generates the four core policy documents required under
              the amended Regulation S-P, tailored to your firm's size,
              structure, and data practices. You answer a short questionnaire,
              and we produce SEC-ready documents in minutes.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Shield,
                  title: 'Incident Response Plan',
                  description:
                    'A written plan for detecting, responding to, and recovering from security incidents involving customer information.',
                },
                {
                  icon: Users,
                  title: 'Vendor Oversight Policies',
                  description:
                    'Policies and procedures for assessing, monitoring, and managing third-party service providers who access customer data.',
                },
                {
                  icon: FileText,
                  title: 'Breach Notification Templates',
                  description:
                    'Notification procedures and templates for timely disclosure to affected individuals when a breach occurs.',
                },
                {
                  icon: Scale,
                  title: 'Recordkeeping Procedures',
                  description:
                    'Documentation protocols that satisfy SEC examination requirements and demonstrate ongoing compliance.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border border-navy-border rounded-xl bg-navy-card p-5"
                >
                  <item.icon size={20} className="text-cyan mb-3" />
                  <h3 className="font-semibold text-white text-sm mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Trust RegShield */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
              Why Trust RegShield
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                RegShield&apos;s document templates are built from the actual
                text of SEC Rule 248.30 and the 2023 amendments, cross-referenced
                with published SEC guidance, examination priorities, and
                enforcement actions. Every generated document cites the relevant
                regulatory provisions.
              </p>
              <p>
                We are not a law firm, and RegShield does not provide legal
                advice. What we provide is a high-quality starting point:
                documents that reflect the regulatory requirements and can be
                reviewed by your legal counsel before adoption. For small RIAs
                that would otherwise be starting from a blank page, this saves
                weeks of work and thousands of dollars in legal fees.
              </p>
              <p>
                The content on this site, including our Insights articles, is
                written and reviewed by professionals with direct experience in
                SEC compliance for small advisory firms. We prioritise accuracy,
                cite primary sources, and clearly distinguish between regulatory
                requirements and best practices.
              </p>
            </div>
          </section>

          {/* About the Team */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
              About the Founder
            </h2>
            <div className="border border-navy-border rounded-xl bg-navy-card p-6">
              <h3 className="font-semibold text-white mb-2">Rees Calder</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">
                Founder, RegShield
              </p>
              <p className="text-slate-400 leading-relaxed">
                Rees is the CEO of Levity Leads Ltd and the creator of
                RegShield. With a background in technology and financial
                services marketing, he builds tools that make complex regulatory
                requirements accessible to small firms. RegShield was born from
                a straightforward observation: small RIAs face the same SEC
                compliance requirements as billion-dollar firms but lack the
                resources to meet them efficiently.
              </p>
            </div>
          </section>

          {/* Company Info */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
              Company Information
            </h2>
            <div className="text-slate-400 leading-relaxed space-y-2">
              <p>
                RegShield is a product of{' '}
                <strong className="text-white">Levity Leads Ltd</strong>, a
                company registered in England and Wales.
              </p>
              <p>
                85 Great Portland Street, First Floor, London, W1W 7LT
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="border border-navy-border rounded-xl bg-navy-card p-8 text-center">
            <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-3">
              Ready to Get Compliant?
            </h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Generate your SEC Regulation S-P compliance documents in minutes.
              The June 2026 deadline is approaching.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg bg-cyan text-navy-card hover:bg-cyan-dim shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_30px_rgba(0,212,255,0.25)] transition-all"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
