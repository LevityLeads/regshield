import type { MetadataRoute } from 'next';
import { getAllInsights } from '@/lib/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://regshield.co';
  const insights = getAllInsights();

  const insightPages: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.frontmatter.slug}`,
    lastModified: new Date(insight.frontmatter.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/start`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...insightPages,
  ];
}
