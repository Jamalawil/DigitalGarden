import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Now' };

export default function NowPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <nav style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', color: 'var(--accent-primary)' }}>
          <span style={{ fontSize: '0.9rem' }}>←</span> Home
        </Link>
      </nav>

      <h1 style={{ marginBottom: '0.4rem' }}>Now</h1>
      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.82rem', marginBottom: '2.5rem', fontFamily: 'var(--font-ui)' }}>
        A <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-tertiary)' }}>now page</a> — updated as things change. Last updated March 2026.
      </p>

      <div className="prose-garden">
        <h2>Writing</h2>
        <p>
          Working on a long investigation for the Polymath Review. Also tending to this digital garden — adding essays, notes, and patterns as they form.
        </p>

        <h2>Building</h2>
        <p>
          In the early stages of MARKA, a media project focused on underreported stories. Also running Funnelithic, a growth consultancy.
        </p>

        <h2>Reading</h2>
        <p>
          Deep in Elizabeth Kolbert's work on the Eremocene — the age of loneliness — and its implications for community and ecology journalism.
        </p>

        <h2>Thinking about</h2>
        <p>
          How local journalism can survive the attention economy. Whether knowledge management tools change how we think, or just how we organise what we already thought.
        </p>
      </div>
    </div>
  );
}
