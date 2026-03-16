'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

/* ── JA Logo SVG ──────────────────────────────────────────
   Recreated from the Jamal Awil brand mark:
   • Dark forest green background  #2c3d26
   • Cream J letterform            #ece8de
   • Lime green a letterform       #72c040
───────────────────────────────────────────────────────── */
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Jamal Awil"
    >
      {/* Dark forest green background */}
      <rect width="80" height="80" rx="13" fill="#2c3d26" />

      {/* J — cream: serif crossbar at top, vertical stem, left-hook curve */}
      {/* Serif top bar */}
      <line x1="18" y1="14" x2="36" y2="14"
        stroke="#ece8de" strokeWidth="6.5" strokeLinecap="round" />
      {/* Stem + bottom hook */}
      <path
        d="M 27 14 L 27 52 C 27 65 13 67 10 59"
        stroke="#ece8de"
        strokeWidth="6.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* a — lime green: open bowl (circle open at top-right) + right descender */}
      <path
        d="M 69 37 C 69 25 50 25 50 37 C 50 49 69 49 69 37 L 69 55"
        stroke="#72c040"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CONTENT_TYPES = [
  { href: '/essays',      label: 'Essays',      icon: '✦', desc: 'Opinionated long-form' },
  { href: '/notes',       label: 'Notes',       icon: '○', desc: 'Thinking in progress' },
  { href: '/patterns',    label: 'Patterns',    icon: '◈', desc: 'Reusable frameworks' },
  { href: '/smidgeons',   label: 'Smidgeons',   icon: '·', desc: 'Links & tiny thoughts' },
  { href: '/talks',       label: 'Talks',       icon: '◎', desc: 'Slides & transcripts' },
  { href: '/podcasts',    label: 'Podcasts',    icon: '◉', desc: 'Guest appearances' },
  { href: '/library',     label: 'Library',     icon: '▣', desc: "Books I've read" },
  { href: '/antilibrary', label: 'Antilibrary', icon: '□', desc: 'Books I want to read' },
];

const PRIMARY_GENRES = [
  { slug: 'investigative-journalism',     label: 'Investigative',    target: 24 },
  { slug: 'news-feature',                 label: 'News Feature',     target: 18 },
  { slug: 'opinion-journalism',           label: 'Opinion',          target: 18 },
  { slug: 'science-journalism',           label: 'Science',          target: 15 },
  { slug: 'environmental-journalism',     label: 'Environmental',    target: 12 },
  { slug: 'local-community-journalism',   label: 'Local / Community',target: 12 },
  { slug: 'sports-journalism',            label: 'Sports',           target: 12 },
  { slug: 'new-journalism',               label: 'New Journalism',   target: 12 },
  { slug: 'data-journalism',              label: 'Data',             target: 9  },
  { slug: 'celebrity-people-journalism',  label: 'Celebrity / People',target: 9 },
  { slug: 'gonzo-journalism',             label: 'Gonzo',            target: 6  },
];

const SUPPLEMENTARY_GENRES = [
  { slug: 'medical-journalism',     label: 'Medical',      target: 9 },
  { slug: 'solutions-journalism',   label: 'Solutions',    target: 6 },
  { slug: 'service-journalism',     label: 'Service',      target: 6 },
  { slug: 'advocacy-journalism',    label: 'Advocacy',     target: 6 },
  { slug: 'entertainment-journalism', label: 'Entertainment', target: 6 },
];

const CREATIVE_GENRES = [
  { slug: 'cnf-essays',      label: 'CNF Essays',     target: 12 },
  { slug: 'literary-essays', label: 'Literary Essays', target: 12 },
  { slug: 'travel-writing',  label: 'Travel Writing',  target: 6  },
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const close = () => setDropdownOpen(false);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      backgroundColor: '#2c3d26',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 1.5rem', height: '52px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <LogoMark size={36} />
        </Link>

        {/* Right nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>

          {/* ── The Garden dropdown ── */}
          <div className="garden-dropdown" ref={dropdownRef}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Link href="/garden" onClick={close} style={{
                fontWeight: 500, fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-ui)',
                textDecoration: 'none',
              }}>
                The Garden
              </Link>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ui)',
                display: 'flex', alignItems: 'center',
                padding: '0 0.1rem', fontSize: '0.6rem',
              }}>
                {dropdownOpen ? '▲' : '▼'}
              </button>
            </div>

            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '52px',
                right: '1.5rem',
                width: '780px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-light)',
                borderRadius: '14px',
                boxShadow: '0 12px 48px rgba(40,30,20,0.12)',
                display: 'grid',
                gridTemplateColumns: '220px 1fr',
                overflow: 'hidden',
                zIndex: 50,
              }}>

                {/* ── Left: Content Types ── */}
                <div style={{
                  background: 'var(--bg-tertiary)',
                  padding: '1.1rem',
                  borderRight: '1px solid var(--border-light)',
                }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)', marginBottom: '0.6rem', paddingLeft: '0.4rem' }}>
                    Content Types
                  </div>
                  {CONTENT_TYPES.map((s) => (
                    <Link key={s.href} href={s.href} onClick={close} style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.42rem 0.5rem', borderRadius: '6px',
                      textDecoration: 'none', color: 'inherit',
                      transition: 'background 0.1s',
                    }}
                      className="dropdown-item">
                      <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 700, width: '14px', textAlign: 'center' }}>{s.icon}</span>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{s.label}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>{s.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* ── Right: Genres ── */}
                <div style={{ padding: '1.1rem 1.2rem' }}>

                  {/* Primary genres */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)', marginBottom: '0.55rem' }}>
                      Primary Genres
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.15rem' }}>
                      {PRIMARY_GENRES.map((g) => (
                        <Link key={g.slug} href={`/genres/${g.slug}`} onClick={close}
                          className="dropdown-item"
                          style={{
                            display: 'block',
                            padding: '0.32rem 0.5rem', borderRadius: '5px',
                            textDecoration: 'none', color: 'inherit',
                          }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-primary)' }}>{g.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {/* Supplementary genres */}
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)', marginBottom: '0.45rem' }}>
                        Supplementary
                      </div>
                      {SUPPLEMENTARY_GENRES.map((g) => (
                        <Link key={g.slug} href={`/genres/${g.slug}`} onClick={close}
                          className="dropdown-item"
                          style={{
                            display: 'block',
                            padding: '0.28rem 0.5rem', borderRadius: '5px',
                            textDecoration: 'none', color: 'inherit',
                          }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-primary)' }}>{g.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Creative & Literary */}
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)', marginBottom: '0.45rem' }}>
                        Creative & Literary
                      </div>
                      {CREATIVE_GENRES.map((g) => (
                        <Link key={g.slug} href={`/genres/${g.slug}`} onClick={close}
                          className="dropdown-item"
                          style={{
                            display: 'block',
                            padding: '0.28rem 0.5rem', borderRadius: '5px',
                            textDecoration: 'none', color: 'inherit',
                          }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-primary)' }}>{g.label}</span>
                        </Link>
                      ))}

                      {/* All genres link */}
                      <Link href="/genres" onClick={close} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                        marginTop: '0.9rem',
                        fontSize: '0.73rem', fontWeight: 600,
                        color: 'var(--accent-primary)', textDecoration: 'none',
                        fontFamily: 'var(--font-ui)',
                      }}>
                        View all genres →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Top-level quick links */}
          <Link href="/essays"      className="desktop-only" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Essays</Link>
          <Link href="/podcasts"    className="desktop-only" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Podcasts</Link>
          <Link href="/library"     className="desktop-only" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Library</Link>
          <Link href="/antilibrary" className="desktop-only" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Antilibrary</Link>
          <Link href="/now"         className="desktop-only" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Now</Link>
          <Link href="/about"       className="desktop-only" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>About</Link>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-only"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '0.25rem', color: 'rgba(255,255,255,0.9)' }}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </nav>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="mobile-only" style={{
          backgroundColor: '#2c3d26',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '0.75rem 1.5rem 1.25rem',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ui)', padding: '0.5rem 0 0.25rem' }}>Content</div>
          {CONTENT_TYPES.map((s) => (
            <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '0.55rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.92rem' }}>
              {s.label}
            </Link>
          ))}
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ui)', padding: '0.75rem 0 0.25rem' }}>Genres</div>
          {[...PRIMARY_GENRES, ...SUPPLEMENTARY_GENRES, ...CREATIVE_GENRES].map((g) => (
            <Link key={g.slug} href={`/genres/${g.slug}`} onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', color: 'rgba(255,255,255,0.75)', fontWeight: 500, fontSize: '0.88rem' }}>
              {g.label}
            </Link>
          ))}
          <Link href="/now" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.55rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.92rem', marginTop: '0.5rem' }}>Now</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.55rem 0', textDecoration: 'none', color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.92rem' }}>About</Link>
        </div>
      )}
    </header>
  );
}
