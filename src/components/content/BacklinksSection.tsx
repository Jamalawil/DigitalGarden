import Link from 'next/link';
import { BacklinkItem } from '@/lib/types';

export default function BacklinksSection({ backlinks }: { backlinks: BacklinkItem[] }) {
  if (!backlinks.length) return null;
  return (
    <section style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
      <h3 style={{
        fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 700,
        marginBottom: '1rem', color: 'var(--text-secondary)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        {backlinks.length} Backlink{backlinks.length !== 1 ? 's' : ''}
      </h3>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {backlinks.map((b) => (
          <Link key={b.slug} href={`/${b.slug}`} className="card-link" style={{ padding: '0.9rem 1rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              {b.title}
            </div>
            {b.description && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{b.description}</div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
