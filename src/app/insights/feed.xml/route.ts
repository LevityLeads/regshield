import { getAllInsights } from '@/lib/insights';

export async function GET() {
  const insights = getAllInsights();
  const baseUrl = 'https://regshield.co';

  const items = insights
    .map(
      (insight) => `
    <item>
      <title><![CDATA[${insight.frontmatter.title}]]></title>
      <link>${baseUrl}/insights/${insight.frontmatter.slug}</link>
      <guid isPermaLink="true">${baseUrl}/insights/${insight.frontmatter.slug}</guid>
      <description><![CDATA[${insight.frontmatter.description}]]></description>
      <pubDate>${new Date(insight.frontmatter.publishedAt).toUTCString()}</pubDate>
      <category>${insight.frontmatter.category}</category>
      <author>rees.calder@levityleads.com (${insight.frontmatter.author})</author>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RegShield Compliance Insights</title>
    <link>${baseUrl}/insights</link>
    <description>Expert guidance on SEC Regulation S-P compliance for small registered investment advisers.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/insights/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
