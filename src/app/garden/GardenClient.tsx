'use client';
import { useState, useMemo } from 'react';
import { ContentItem, ContentType } from '@/lib/types';
import GardenCard from '@/components/content/GardenCard';

type Topic = { slug: string; label: string; count: number };

const TYPES: { value: ContentType | 'all'; label: string }[] = [
  { value: 'all',         label: 'All Types' },
  { value: 'essay',       label: 'Essays' },
  { value: 'note',        label: 'Notes' },
  { value: 'pattern',     label: 'Patterns' },
  { value: 'smidgeon',    label: 'Smidgeons' },
  { value: 'talk',        label: 'Talks' },
  { value: 'podcast',     label: 'Podcasts' },
  { value: 'library',     label: 'Library' },
  { value: 'antilibrary', label: 'Antilibrary' },
];

const STAGES = [
  { value: 'all',       label: 'All Growth Stages' },
  { value: 'seedling',  label: 'Seedling' },
  { value: 'budding',   label: 'Budding' },
  { value: 'evergreen', label: 'Evergreen' },
];

const TOPIC_VISIBLE_COUNT = 6;

const selectStyle: React.CSSProperties = {
  fontSize: '0.82rem',
  padding: '0.35rem 2rem 0.35rem 0.75rem',
  border: '1px solid var(--border-medium)',
  borderRadius: '6px',
  background: 'white',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-ui)',
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%238a8a8a' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.6rem center',
  minWidth: '148px',
};

export default function GardenClient({ items, topics }: { items: ContentItem[]; topics: Topic[] }) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeType, setActiveType]   = useState<string>('all');
  const [activeStage, setActiveStage] = useState<string>('all');
  const [showAllTopics, setShowAllTopics] = useState(false);

  const visibleTopics = showAllTopics ? topics : topics.slice(0, TOPIC_VISIBLE_COUNT);
  const hasMore = topics.length > TOPIC_VISIBLE_COUNT;
  const anyFilter = activeTopic || activeType !== 'all' || activeStage !== 'all';

  const filtered = useMemo(() => items.filter((item) => {
    if (activeTopic) {
      const match = item.frontmatter.topics?.some(
        (t) => t.toLowerCase().replace(/\s+/g, '-') === activeTopic
      );
      if (!match) return false;
    }
    if (activeType  !== 'all' && item.frontmatter.type        !== activeType)  return false;
    if (activeStage !== 'all' && item.frontmatter.growthStage !== activeStage) return false;
    return true;
  }), [items, activeTopic, activeType, activeStage]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>

      {/* Page heading */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-primary)', lineHeight: 1 }}>
          {filtered.length}
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>The Garden</h1>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '65ch', margin: '0 0 2.5rem' }}>
        A collection of essays, notes, talks, podcasts, and half-baked explorations I&apos;m always tending to.
      </p>

      {/* ── Filter bar — single row ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2.5rem',
        paddingBottom: '1.25rem',
        borderBottom: '1px solid var(--border-light)',
        flexWrap: 'wrap',
      }}>
        {/* Topics — left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'var(--text-tertiary)',
            marginRight: '0.6rem', whiteSpace: 'nowrap',
          }}>
            Topics
          </span>
          <span style={{ color: 'var(--border-medium)', marginRight: '0.6rem', fontSize: '0.9rem' }}>|</span>

          {visibleTopics.map((t) => (
            <button
              key={t.slug}
              onClick={() => setActiveTopic(activeTopic === t.slug ? null : t.slug)}
              style={{
                background: activeTopic === t.slug ? 'var(--accent-light)' : 'none',
                border: activeTopic === t.slug ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                fontSize: '0.85rem', fontFamily: 'var(--font-ui)',
                color: activeTopic === t.slug ? 'var(--accent-hover)' : 'var(--text-secondary)',
                fontWeight: activeTopic === t.slug ? 600 : 400,
                padding: '0.22rem 0.65rem',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}

          {hasMore && (
            <button
              onClick={() => setShowAllTopics(!showAllTopics)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.75rem', fontWeight: 700,
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase', letterSpacing: '0.07em',
                padding: '0.22rem 0.5rem',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
            >
              {showAllTopics ? 'Show less ↑' : 'Show more ↓'}
            </button>
          )}
        </div>

        {/* Dropdowns — right */}
        <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0, alignItems: 'center' }}>
          <select
            value={activeStage}
            onChange={(e) => setActiveStage(e.target.value)}
            style={selectStyle}
          >
            {STAGES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>

          <select
            value={activeType}
            onChange={(e) => setActiveType(e.target.value)}
            style={selectStyle}
          >
            {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>

          {anyFilter && (
            <button
              onClick={() => { setActiveTopic(null); setActiveType('all'); setActiveStage('all'); }}
              style={{
                fontSize: '0.76rem', padding: '0.35rem 0.65rem',
                border: '1px solid var(--border-light)', borderRadius: '6px',
                background: 'none', color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-ui)', cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Clear ✕
            </button>
          )}
        </div>
      </div>

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: '4rem 0' }}>
          No items match these filters.
        </p>
      ) : (
        <div className="masonry-grid">
          {filtered.map((item) => (
            <div key={item.slug} className="masonry-item">
              <GardenCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
