import { getAllContent } from '@/lib/content';
import { Feed } from 'feed';
import { NextResponse } from 'next/server';

export async function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jamalawil.com';

  const feed = new Feed({
    title: 'Jamal Awil — Digital Garden',
    description: 'Essays, notes, and ideas growing over time.',
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    feedLinks: { rss2: `${SITE_URL}/api/rss` },
    author: { name: 'Jamal Awil', email: 'jamal@polymathreview.com', link: SITE_URL },
    copyright: `© ${new Date().getFullYear()} Jamal Awil`,
  });

  const items = getAllContent(['essay', 'note', 'pattern']).slice(0, 40);

  for (const item of items) {
    feed.addItem({
      title: item.frontmatter.title,
      id: `${SITE_URL}/${item.slug}`,
      link: `${SITE_URL}/${item.slug}`,
      description: item.frontmatter.description || '',
      date: new Date(item.frontmatter.startDate),
    });
  }

  return new NextResponse(feed.rss2(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
