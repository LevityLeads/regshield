import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import type { InsightFrontmatter } from '@/lib/insights';
import {
  getInsightBySlug,
  getInsightsByCategory,
  getAllSlugs,
  getAllInsights,
} from '@/lib/insights';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MDXContent from '@/components/insights/MDXContent';
import TableOfContents from '@/components/insights/TableOfContents';
import FAQAccordion from '@/components/insights/FAQAccordion';
import AuthorBio from '@/components/insights/AuthorBio';
import RelatedArticles from '@/components/insights/RelatedArticles';
import Breadcrumbs from '@/components/insights/Breadcrumbs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};

  const { frontmatter } = insight;

  return {
    title: `${frontmatter.title} | RegShield`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      url: `https://regshield.co/insights/${frontmatter.slug}`,
      authors: [frontmatter.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
    },
    alternates: {
      canonical: `https://regshield.co/insights/${frontmatter.slug}`,
    },
  };
}

function ArticleSchema({
  frontmatter,
}: {
  frontmatter: InsightFrontmatter;
}) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RegShield',
      url: 'https://regshield.co',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://regshield.co/insights/${frontmatter.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://regshield.co',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Insights',
        item: 'https://regshield.co/insights',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: frontmatter.title,
        item: `https://regshield.co/insights/${frontmatter.slug}`,
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: Record<string, any>[] = [articleSchema, breadcrumbSchema];

  if (frontmatter.faqs && frontmatter.faqs.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: frontmatter.faqs.map((faq: { question: string; answer: string }) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    schemas.push(faqSchema);
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const { frontmatter, content } = insight;

  const related = getInsightsByCategory(frontmatter.category, frontmatter.slug);
  // If not enough from same category, fill with any other articles
  let relatedArticles = related.slice(0, 3);
  if (relatedArticles.length < 3) {
    const allOthers = getAllInsights().filter(
      (i) =>
        i.frontmatter.slug !== frontmatter.slug &&
        !relatedArticles.some((r) => r.frontmatter.slug === i.frontmatter.slug)
    );
    relatedArticles = [...relatedArticles, ...allOthers].slice(0, 3);
  }

  const formattedDate = new Date(frontmatter.publishedAt).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <>
      <ArticleSchema frontmatter={frontmatter} />
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: 'Insights', href: '/insights' },
              { label: frontmatter.title },
            ]}
          />

          <header className="mb-8 max-w-[680px]">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan bg-cyan/10 px-2.5 py-1 rounded-full">
                <Tag size={12} />
                {frontmatter.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-white mb-4 leading-tight">
              {frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {frontmatter.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {frontmatter.readTime} min read
              </span>
            </div>
          </header>

          <div className="lg:grid lg:grid-cols-[680px_1fr] lg:gap-12">
            <article className="min-w-0">
              <div className="lg:hidden">
                <TableOfContents />
              </div>

              <div className="prose-regshield text-[18px] leading-[1.7]">
                <MDXContent source={content} />
              </div>

              <FAQAccordion faqs={frontmatter.faqs} />
              <AuthorBio />
              <RelatedArticles articles={relatedArticles} />

              <div className="mt-12">
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 text-sm text-cyan hover:text-cyan-dim transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Insights
                </Link>
              </div>
            </article>

            <aside className="hidden lg:block">
              <TableOfContents />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
