import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <nav style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', color: 'var(--accent-primary)' }}>
          <span style={{ fontSize: '0.9rem' }}>←</span> Home
        </Link>
      </nav>
      <h1 style={{ marginBottom: '2rem' }}>About</h1>
      <div className="prose-garden">
        <p>
          I am Jamal Awil — an investigative journalist, founding editor of the Polymath Review,
          and operator of Funnelithic.
        </p>
        <p>
          This digital garden is where I think in public: essays that make an argument,
          notes that are half-formed, patterns extracted from research, and books that have shaped me.
        </p>
        <p>
          The garden grows slowly. Notes get tended. Ideas evolve. Nothing here is final.
        </p>
        <h2>Contact</h2>
        <p>The best way to reach me is via email or through the Polymath Review.</p>
      </div>
    </div>
  );
}
