import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface InsightFrontmatter {
  title: string;
  slug: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  faqs: { question: string; answer: string }[];
}

export interface Insight {
  frontmatter: InsightFrontmatter;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'insights');

export function getAllInsights(): Insight[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));

  const insights = files
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        frontmatter: data as InsightFrontmatter,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );

  return insights;
}

export function getInsightBySlug(slug: string): Insight | null {
  const insights = getAllInsights();
  return insights.find((i) => i.frontmatter.slug === slug) || null;
}

export function getInsightsByCategory(category: string, exclude?: string): Insight[] {
  return getAllInsights().filter(
    (i) => i.frontmatter.category === category && i.frontmatter.slug !== exclude
  );
}

export function getAllCategories(): string[] {
  const insights = getAllInsights();
  const categories = new Set(insights.map((i) => i.frontmatter.category));
  return Array.from(categories);
}

export function getAllSlugs(): string[] {
  return getAllInsights().map((i) => i.frontmatter.slug);
}
