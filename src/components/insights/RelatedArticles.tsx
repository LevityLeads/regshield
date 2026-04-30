import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import type { Insight } from '@/lib/insights';

export default function RelatedArticles({
  articles,
}: {
  articles: Insight[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-navy-border">
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
        Related Articles
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <Link
            key={article.frontmatter.slug}
            href={`/insights/${article.frontmatter.slug}`}
            className="group block border border-navy-border rounded-xl bg-navy-card hover:border-cyan/40 transition-all p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan bg-cyan/10 px-2 py-0.5 rounded-full">
                <Tag size={10} />
                {article.frontmatter.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={10} />
                {article.frontmatter.readTime} min
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white group-hover:text-cyan transition-colors line-clamp-2 mb-1">
              {article.frontmatter.title}
            </h3>
            <span className="flex items-center gap-1 text-xs text-cyan opacity-0 group-hover:opacity-100 transition-opacity mt-2">
              Read <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
