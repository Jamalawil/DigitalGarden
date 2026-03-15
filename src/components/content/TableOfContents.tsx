'use client';
import { useState, useEffect } from 'react';
import { Heading } from '@/lib/types';

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav style={{ fontFamily: 'var(--font-ui)' }}>
      <p style={{
        fontSize: '0.7rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        color: 'var(--text-tertiary)', marginBottom: '0.5rem',
      }}>
        Table of Contents
      </p>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`toc-link ${h.level === 3 ? 'toc-h3' : h.level === 4 ? 'toc-h4' : ''} ${activeId === h.id ? 'active' : ''}`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}
