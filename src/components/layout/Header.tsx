'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const GARDEN_SECTIONS = [
  { href: '/essays',      label: 'Essays',      desc: 'Opinionated, long-form writing with an agenda' },
  { href: '/notes',       label: 'Notes',       desc: "Loose notes on things I don't entirely understand yet" },
  { href: '/patterns',    label: 'Patterns',    desc: 'Design patterns from observation and research' },
  { href: '/smidgeons',   label: 'Smidgeons',   desc: 'Links, papers, and tiny thoughts' },
  { href: '/talks',       label: 'Talks',       desc: 'Conference talks, slides, and transcripts' },
  { href: '/podcasts',    label: 'Podcasts',    desc: "Podcast episodes I've been a guest on" },
  { href: '/library',     label: 'Library',     desc: "Books I've read and recommend" },
  { href: '/antilibrary', label: 'Antilibrary', desc: 'Books I want to have read' },
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: 'rgba(250, 249, 247, 0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border-light)',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 1.5rem',
        height: '52px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontWeight: 700, fontSize: '1.05rem',
          textDecoration: 'none', color: 'var(--text-primary)',
          fontFamily: 'var(--font-ui)',
          display: 'flex', alignItems: 'center', gap: '0.1rem',
        }}>
          <span style={{ color: 'var(--accent-primary)' }}>→</span>
          <span>J</span>
          <span style={{ color: 'var(--accent-primary)' }}>←</span>
        </Link>

        {/* Right nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Garden Dropdown */}
          <div className="garden-dropdown" ref={dropdownRef}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Link
                href="/garden"
                style={{
                  fontWeight: 500, fontSize: '0.9rem',
                  color: 'var(--text-primary)', fontFamily: 'var(--font-ui)',
                  textDecoration: 'none',
                }}
              >
                The Garden
              </Link>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)',
                  display: 'flex', alignItems: 'center',
                  padding: '0 0.1rem',
                  fontSize: '0.6rem',
                }}
              >
                {dropdownOpen ? '▲' : '▼'}
              </button>
            </div>

            {dropdownOpen && (
              <div className="garden-dropdown-menu">
                {GARDEN_SECTIONS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setDropdownOpen(false)}
                    className="dropdown-item"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '0.5rem 0.6rem', borderRadius: '6px' }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.1rem', color: 'var(--text-primary)' }}>{s.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>{s.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/essays" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }} className="desktop-only">Essays</Link>
          <Link href="/podcasts" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }} className="desktop-only">Podcasts</Link>
          <Link href="/library" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }} className="desktop-only">Library</Link>
          <Link href="/antilibrary" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }} className="desktop-only">Antilibrary</Link>
          <Link href="/now" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }} className="desktop-only">Now</Link>
          <Link href="/about" style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }} className="desktop-only">About</Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-only"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '0.25rem' }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div className="mobile-only" style={{
          background: 'var(--bg-primary)',
          borderTop: '1px solid var(--border-light)',
          padding: '0.75rem 1.5rem 1.25rem',
        }}>
          {[...GARDEN_SECTIONS, { href: '/now', label: 'Now', desc: '' }, { href: '/about', label: 'About', desc: '' }].map((s) => (
            <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '0.65rem 0', borderBottom: '1px solid var(--border-light)', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
              {s.label}
              {s.desc && <span style={{ display: 'block', fontWeight: 400, fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>{s.desc}</span>}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
