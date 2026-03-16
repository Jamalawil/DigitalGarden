import { getAllContent } from '@/lib/content';
import CoverImage from '@/components/ui/CoverImage';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Library' };

export default function LibraryPage() {
  const books = getAllContent(['library']);
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <nav style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        <Link href="/garden" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', color: 'var(--accent-primary)' }}>
          <span style={{ fontSize: '0.9rem' }}>←</span> The Garden
        </Link>
      </nav>
      <h1 style={{ marginBottom: '0.5rem' }}>Library</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '60ch' }}>
        Books I&apos;ve read and recommend. Each one shaped how I think.
      </p>
      {books.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)' }}>No books yet. Add .md files to content/library/</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <Link key={book.slug} href={`/${book.slug}`} className="book-card">
              <div className="book-card__cover">
                {book.frontmatter.cover ? (
                  <CoverImage
                    src={book.frontmatter.cover}
                    alt={book.frontmatter.title}
                    sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
                  />
                ) : (
                  <div className="book-card__placeholder">📚</div>
                )}
              </div>
              <div className="book-card__title">{book.frontmatter.title}</div>
              {book.frontmatter.description && (
                <div className="book-card__author">{book.frontmatter.description}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
