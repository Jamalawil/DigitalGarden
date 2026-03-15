import { getContentByTopic, getAllTopics } from '@/lib/content';
import GardenCard from '@/components/content/GardenCard';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllTopics().map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  return { title: `${topic.replace(/-/g, ' ')} | Topics` };
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const items = getContentByTopic(topic);
  const label = topic.replace(/-/g, ' ');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <Link href="/garden" style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', textDecoration: 'none', display: 'block', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-ui)' }}>
        ← Back to Garden
      </Link>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-primary)', lineHeight: 1 }}>{items.length}</span>
        <h1 style={{ textTransform: 'capitalize', margin: 0 }}>{label}</h1>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1rem' }}>
        Essays, notes, patterns, and smidgeons related to {label}
      </p>

      {items.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)' }}>No content found for this topic yet.</p>
      ) : (
        <div className="masonry-grid">
          {items.map((item) => (
            <div key={item.slug} className="masonry-item">
              <GardenCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
