import Link from 'next/link';
import { getAllContent } from '@/lib/content';
import GardenCard from '@/components/content/GardenCard';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const GENRE_META: Record<string, { label: string; target: number; desc: string; group: string }> = {
  'investigative-journalism':    { label: 'Investigative Journalism',    target: 24, group: 'Primary',     desc: 'Deep-dive accountability and exposure journalism' },
  'news-feature':                { label: 'News Feature',                target: 18, group: 'Primary',     desc: 'Long-form journalism anchored in current events' },
  'opinion-journalism':          { label: 'Opinion Journalism',          target: 18, group: 'Primary',     desc: 'Columns, op-eds, and argued positions' },
  'science-journalism':          { label: 'Science Journalism',          target: 15, group: 'Primary',     desc: 'Explaining research and scientific developments' },
  'environmental-journalism':    { label: 'Environmental Journalism',    target: 12, group: 'Primary',     desc: 'Ecology, climate, and the living world' },
  'local-community-journalism':  { label: 'Local / Community Journalism',target: 12, group: 'Primary',     desc: 'Reporting from within communities' },
  'sports-journalism':           { label: 'Sports Journalism',           target: 12, group: 'Primary',     desc: 'Sport as culture, business, and community' },
  'new-journalism':              { label: 'New Journalism',              target: 12, group: 'Primary',     desc: 'Literary narrative nonfiction techniques' },
  'data-journalism':             { label: 'Data Journalism',             target: 9,  group: 'Primary',     desc: 'Evidence-driven reporting with numbers and visualisation' },
  'celebrity-people-journalism': { label: 'Celebrity / People',          target: 9,  group: 'Primary',     desc: 'Profile journalism and public figures' },
  'gonzo-journalism':            { label: 'Gonzo Journalism',            target: 6,  group: 'Primary',     desc: 'First-person immersive participation journalism' },
  'medical-journalism':          { label: 'Medical Journalism',          target: 9,  group: 'Supplementary', desc: 'Health, medicine, and public health reporting' },
  'solutions-journalism':        { label: 'Solutions Journalism',        target: 6,  group: 'Supplementary', desc: 'Rigorous coverage of responses to problems' },
  'service-journalism':          { label: 'Service Journalism',          target: 6,  group: 'Supplementary', desc: 'Useful, actionable information for readers' },
  'advocacy-journalism':         { label: 'Advocacy Journalism',         target: 6,  group: 'Supplementary', desc: 'Journalism with an explicit point of view' },
  'entertainment-journalism':    { label: 'Entertainment Journalism',    target: 6,  group: 'Supplementary', desc: 'Culture, film, music, and the arts' },
  'cnf-essays':                  { label: 'CNF Essays',                  target: 12, group: 'Creative',    desc: 'Creative nonfiction in the essayist tradition' },
  'literary-essays':             { label: 'Literary Essays',             target: 12, group: 'Creative',    desc: 'Philosophy, ideas, and the examined life' },
  'travel-writing':              { label: 'Travel Writing',              target: 6,  group: 'Creative',    desc: "Place, movement, and the stranger's eye" },
};

export async function generateStaticParams() {
  return Object.keys(GENRE_META).map((genre) => ({ genre }));
}

export async function generateMetadata({ params }: { params: Promise<{ genre: string }> }): Promise<Metadata> {
  const { genre } = await params;
  const meta = GENRE_META[genre];
  if (!meta) return { title: 'Genre Not Found' };
  return { title: meta.label };
}

export default async function GenrePage({ params }: { params: Promise<{ genre: string }> }) {
  const { genre } = await params;
  const meta = GENRE_META[genre];
  if (!meta) notFound();

  const allContent = getAllContent();
  const pieces = allContent.filter(i => i.frontmatter.genre === genre);
  const count  = pieces.length;
  const pct    = Math.min(100, Math.round((count / meta.target) * 100));
  const remaining = Math.max(0, meta.target - count);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>

      {/* Breadcrumb */}
      <nav style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Link href="/genres" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', color: 'var(--accent-primary)' }}>
          <span style={{ fontSize: '0.9rem' }}>←</span> Genres
        </Link>
        <span style={{ color: 'var(--border-medium)' }}>·</span>
        <span style={{ color: 'var(--text-tertiary)' }}>{meta.group}</span>
      </nav>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ marginBottom: '0.4rem' }}>{meta.label}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.5rem', maxWidth: '60ch' }}>
          {meta.desc}
        </p>

        {/* Progress tracker */}
        <div style={{
          background: 'white',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '1.1rem 1.4rem',
          maxWidth: '480px',
          boxShadow: '0 1px 3px rgba(40,30,20,0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Annual target
            </span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
              {count} / {meta.target} pieces · {pct}%
            </span>
          </div>
          <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '99px', overflow: 'hidden', marginBottom: '0.55rem' }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: pct >= 100 ? 'var(--sea-blue)' : 'var(--accent-primary)',
              borderRadius: '99px',
              transition: 'width 0.4s ease',
              minWidth: pct > 0 ? '6px' : '0',
            }} />
          </div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.74rem', color: 'var(--text-tertiary)', margin: 0 }}>
            {pct === 0
              ? `No pieces yet — ${meta.target} to write this year`
              : pct >= 100
              ? `Target reached! ${count} pieces published`
              : `${remaining} more piece${remaining !== 1 ? 's' : ''} to reach the annual target`}
          </p>
        </div>
      </div>

      {/* Pieces */}
      {pieces.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '4rem 2rem',
          border: '1px dashed var(--border-medium)',
          borderRadius: '12px',
          background: 'white',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✦</div>
          <p style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            No pieces yet in this genre.
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
            Add <code style={{ background: 'var(--bg-secondary)', padding: '0.1em 0.4em', borderRadius: '4px', fontSize: '0.85em' }}>genre: {genre}</code> to any content frontmatter to have it appear here.
          </p>
        </div>
      ) : (
        <div className="masonry-grid">
          {pieces.map((item) => (
            <div key={item.slug} className="masonry-item">
              <GardenCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
