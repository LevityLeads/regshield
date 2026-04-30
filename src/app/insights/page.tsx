import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { getAllInsights } from '@/lib/insights';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Compliance Insights | RegShield',
  description:
    'Expert guidance on SEC Regulation S-P compliance for small RIAs. Practical articles on incident response, vendor oversight, breach notification, and recordkeeping.',
  openGraph: {
    title: 'Compliance Insights | RegShield',
    description:
      'Expert guidance on SEC Regulation S-P compliance for small RIAs.',
    type: 'website',
    url: 'https://regshield.co/insights',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compliance Insights | RegShield',
    description:
      'Expert guidance on SEC Regulation S-P compliance for small RIAs.',
  },
  alternates: {
    canonical: 'https://regshield.co/insights',
  },
};

function CollectionPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Compliance Insights',
    description:
      'Expert guidance on SEC Regulation S-P compliance for small RIAs.',
    url: 'https://regshield.co/insights',
    publisher: {
      '@type': 'Organization',
      name: 'RegShield',
      url: 'https://regshield.co',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function InsightsPage() {
  const insights = getAllInsights();

  return (
    <>
      <CollectionPageSchema />
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
              Compliance Insights
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Practical guidance on SEC Regulation S-P compliance for small
              registered investment advisers. Written by compliance
              professionals who understand the reality of running a small RIA.
            </p>
          </div>

          {insights.length === 0 ? (
            <div className="text-center py-20 border border-navy-border rounded-xl bg-navy-card">
              <p className="text-slate-400 text-lg">
                Articles coming soon. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight) => (
                <Link
                  key={insight.frontmatter.slug}
                  href={`/insights/${insight.frontmatter.slug}`}
                  className="group block border border-navy-border rounded-xl bg-navy-card hover:border-cyan/40 transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan bg-cyan/10 px-2.5 py-1 rounded-full">
                        <Tag size={12} />
                        {insight.frontmatter.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock size={12} />
                        {insight.frontmatter.readTime} min read
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-white group-hover:text-cyan transition-colors mb-2 line-clamp-2">
                      {insight.frontmatter.title}
                    </h2>

                    <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                      {insight.frontmatter.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <time className="text-xs text-slate-500">
                        {new Date(
                          insight.frontmatter.publishedAt
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="flex items-center gap-1 text-sm text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                        Read
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
