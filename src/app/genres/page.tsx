import Link from 'next/link';
import { getAllContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Genres' };

const ALL_GENRES = [
  {
    group: 'Primary Journalism',
    genres: [
      { slug: 'investigative-journalism',    label: 'Investigative Journalism',    target: 24, desc: 'Deep-dive accountability and exposure journalism' },
      { slug: 'news-feature',                label: 'News Feature',                target: 18, desc: 'Long-form journalism anchored in current events' },
      { slug: 'opinion-journalism',          label: 'Opinion Journalism',          target: 18, desc: 'Columns, op-eds, and argued positions' },
      { slug: 'science-journalism',          label: 'Science Journalism',          target: 15, desc: 'Explaining research and scientific developments' },
      { slug: 'environmental-journalism',    label: 'Environmental Journalism',    target: 12, desc: 'Ecology, climate, and the living world' },
      { slug: 'local-community-journalism',  label: 'Local / Community Journalism',target: 12, desc: 'Reporting from within communities' },
      { slug: 'sports-journalism',           label: 'Sports Journalism',           target: 12, desc: 'Sport as culture, business, and community' },
      { slug: 'new-journalism',              label: 'New Journalism',              target: 12, desc: 'Literary narrative nonfiction techniques' },
      { slug: 'data-journalism',             label: 'Data Journalism',             target: 9,  desc: 'Evidence-driven reporting with numbers and visualisation' },
      { slug: 'celebrity-people-journalism', label: 'Celebrity / People',          target: 9,  desc: 'Profile journalism and public figures' },
      { slug: 'gonzo-journalism',            label: 'Gonzo Journalism',            target: 6,  desc: 'First-person immersive participation journalism' },
    ],
  },
  {
    group: 'Supplementary',
    genres: [
      { slug: 'medical-journalism',      label: 'Medical Journalism',    target: 9, desc: 'Health, medicine, and public health reporting' },
      { slug: 'solutions-journalism',    label: 'Solutions Journalism',  target: 6, desc: 'Rigorous coverage of responses to problems' },
      { slug: 'service-journalism',      label: 'Service Journalism',    target: 6, desc: 'Useful, actionable information for readers' },
      { slug: 'advocacy-journalism',     label: 'Advocacy Journalism',   target: 6, desc: 'Journalism with an explicit point of view' },
      { slug: 'entertainment-journalism',label: 'Entertainment',         target: 6, desc: 'Culture, film, music, and the arts' },
    ],
  },
  {
    group: 'Creative & Literary',
    genres: [
      { slug: 'cnf-essays',      label: 'CNF Essays',      target: 12, desc: 'Creative nonfiction in the essayist tradition' },
      { slug: 'literary-essays', label: 'Literary Essays',  target: 12, desc: 'Philosophy, ideas, and the examined life' },
      { slug: 'travel-writing',  label: 'Travel Writing',   target: 6,  desc: 'Place, movement, and the stranger\'s eye' },
    ],
  },
];

export default function GenresPage() {
  const allContent = getAllContent();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>

      {/* Breadcrumb */}
      <nav style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        <Link href="/garden" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', color: 'var(--accent-primary)' }}>
          <span style={{ fontSize: '0.9rem' }}>←</span> The Garden
        </Link>
      </nav>

      <h1 style={{ marginBottom: '0.4rem' }}>Genre Framework</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '0.5rem', maxWidth: '60ch' }}>
        A structured framework for writing across journalism and literary forms.
      </p>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '3rem' }}>
        {ALL_GENRES.flatMap(g => g.genres).length} genres
        · {allContent.filter(i => i.frontmatter.genre).length} published so far
      </p>

      {ALL_GENRES.map((group) => {
        return (
          <section key={group.group} style={{ marginBottom: '3.5rem' }}>
            {/* Group header */}
            <div style={{
              borderBottom: '2px solid var(--border-light)', paddingBottom: '0.5rem', marginBottom: '1.25rem',
            }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{group.group}</h2>
            </div>

            {/* Genre cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
              {group.genres.map((genre) => {
                const count = allContent.filter(i => i.frontmatter.genre === genre.slug).length;
                const pct = Math.min(100, Math.round((count / genre.target) * 100));
                return (
                  <Link key={genre.slug} href={`/genres/${genre.slug}`} style={{
                    display: 'block', textDecoration: 'none', color: 'inherit',
                    background: 'white', border: '1px solid var(--border-light)',
                    borderRadius: '10px', padding: '1rem 1.1rem',
                    boxShadow: '0 1px 3px rgba(40,30,20,0.05)',
                    transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
                  }}
                    className="genre-card">
                    <div style={{ marginBottom: '0.3rem' }}>
                      <span style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                        {genre.label}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', margin: '0 0 0.75rem', lineHeight: 1.4 }}>
                      {genre.desc}
                    </p>
                    {/* Progress bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ flex: 1, height: '4px', background: 'var(--bg-tertiary)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${pct}%`,
                          background: pct > 0 ? 'var(--accent-primary)' : 'transparent',
                          borderRadius: '99px', transition: 'width 0.3s ease',
                        }} />
                      </div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)', whiteSpace: 'nowrap' }}>
                        {count} piece{count !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
