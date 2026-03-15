import { getAllContent } from '@/lib/content';
import GardenCard from '@/components/content/GardenCard';
import Link from 'next/link';

export default function Home() {
  // Homepage only shows writing content — library/antilibrary have their own pages
  const recent = getAllContent(['essay', 'note', 'pattern', 'smidgeon', 'talk', 'podcast']).slice(0, 9);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>

      {/* Hero */}
      <section style={{ marginBottom: '4rem', maxWidth: '700px' }}>
        <h1 style={{ marginBottom: '1rem' }}>
          <strong>Jamal</strong> writes about journalism, knowledge management, and community.
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          Investigative journalist, founding editor of{' '}
          <a href="https://polymathreview.com" target="_blank" rel="noopener noreferrer">Polymath Review</a>,
          and operator of Funnelithic. Currently building MARKA and documenting the Eremocene.
        </p>
      </section>

      {/* Recent from the garden */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>
            <Link href="/garden" style={{ textDecoration: 'none', color: 'inherit' }}>The Garden</Link>
          </h2>
          <Link href="/garden" style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>View all →</Link>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '60ch', fontSize: '0.95rem' }}>
          A collection of imperfect notes, essays, and ideas growing slowly over time.
        </p>

        {recent.length === 0 ? (
          <div style={{
            padding: '3rem', textAlign: 'center',
            background: 'var(--bg-secondary)', borderRadius: '12px',
            color: 'var(--text-secondary)',
          }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>🌱 The garden is just getting started.</p>
            <p style={{ fontSize: '0.9rem' }}>Add markdown files to the <code>content/</code> folder to see them here.</p>
          </div>
        ) : (
          <div className="masonry-grid">
            {recent.map((item) => (
              <div key={item.slug} className="masonry-item">
                <GardenCard item={item} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
