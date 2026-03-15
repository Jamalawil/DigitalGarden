import Link from 'next/link';
import { getAllContent } from '@/lib/content';
import GardenCard from '@/components/content/GardenCard';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Essays' };

export default function EssaysPage() {
  const items = getAllContent(['essay']);
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <nav style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        <Link href="/garden" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', color: 'var(--accent-primary)' }}>
          <span style={{ fontSize: '0.9rem' }}>←</span> The Garden
        </Link>
      </nav>
      <h1 style={{ marginBottom: '0.5rem' }}>Essays</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '60ch' }}>
        Opinionated, long-form narrative writing with an agenda.
      </p>
      {items.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)' }}>No essays yet. Add .md files to content/essays/</p>
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
