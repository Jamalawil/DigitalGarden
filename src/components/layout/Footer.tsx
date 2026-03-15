import Link from 'next/link';

const FOOTER_COLS = [
  [
    { href: '/garden',    label: 'The Garden' },
    { href: '/about',     label: 'About' },
    { href: '/now',       label: 'Now' },
    { href: '/podcasts',  label: 'Podcasts' },
    { href: '/smidgeons', label: 'Smidgeons' },
    { href: '/library',   label: 'Library' },
  ],
  [
    { href: '/essays',      label: 'Essays' },
    { href: '/notes',       label: 'Notes' },
    { href: '/patterns',    label: 'Patterns' },
    { href: '/talks',       label: 'Talks' },
    { href: '/antilibrary', label: 'Antilibrary' },
  ],
];

const SOCIAL = [
  { href: 'https://bsky.app',    label: 'Bluesky',   icon: '🦋' },
  { href: 'https://github.com',  label: 'GitHub',    icon: '⌥' },
  { href: 'https://twitter.com', label: 'X/Twitter', icon: '𝕏' },
];

export default function Footer() {
  return (
    <footer style={{
      marginTop: '6rem',
      borderTop: '1px solid var(--border-light)',
      background: 'var(--bg-secondary)',
      padding: '3.5rem 1.5rem 2.5rem',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '3rem',
        alignItems: 'start',
      }}>
        {/* Left: RSS + social */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-ui)', fontWeight: 600, marginBottom: '0.5rem' }}>
            Want to stay up to date?
          </h3>
          <a
            href="/api/rss"
            style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
          >
            <span>⊕</span> Subscribe via RSS Feed
          </a>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            {SOCIAL.map((s) => (
              <a
                key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                style={{ fontSize: '1.1rem', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.15s' }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '1.5rem' }}>
            © {new Date().getFullYear()} Jamal Awil
          </p>
        </div>

        {/* Right: link grid */}
        <div style={{ display: 'flex', gap: '3rem' }}>
          {FOOTER_COLS.map((col, i) => (
            <ul key={i} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {col.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </footer>
  );
}
