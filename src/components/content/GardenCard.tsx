import Link from 'next/link';
import Image from 'next/image';
import { ContentItem } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

// Growth stage → icon + color (shown prominently on card)
const GROWTH_ICONS: Record<string, { icon: string; color: string }> = {
  seedling:  { icon: '↓', color: '#6aabbc' },
  budding:   { icon: '↓', color: '#89b48a' },
  evergreen: { icon: '✦', color: '#3a7a5a' },
};

// Type → icon + color when no growth stage
const TYPE_SYMBOLS: Record<string, { icon: string; color: string }> = {
  essay:       { icon: '✦', color: '#5a9978' },
  note:        { icon: '↓', color: '#6aabbc' },
  pattern:     { icon: '⬡', color: '#a08bbf' },
  smidgeon:    { icon: '✏', color: '#b8956a' },
  talk:        { icon: '◈', color: '#6aabbc' },
  podcast:     { icon: '◉', color: '#6aabbc' },
  library:     { icon: '▣', color: '#8a9978' },
  antilibrary: { icon: '▢', color: '#aaaaaa' },
};

const TYPE_LABELS: Record<string, string> = {
  essay: 'Essay', note: 'Note', pattern: 'Pattern',
  smidgeon: 'Smidgeon', talk: 'Talk', podcast: 'Podcast',
  library: 'Library', antilibrary: 'Antilibrary',
};

function getIconInfo(item: ContentItem) {
  const { frontmatter } = item;
  if (frontmatter.growthStage && GROWTH_ICONS[frontmatter.growthStage]) {
    return GROWTH_ICONS[frontmatter.growthStage];
  }
  return TYPE_SYMBOLS[frontmatter.type] || { icon: '·', color: '#8a8a8a' };
}

function CardMeta({ item, icon, color }: { item: ContentItem; icon?: string; color?: string }) {
  const { frontmatter } = item;
  const relativeDate = formatDistanceToNow(new Date(frontmatter.startDate), { addSuffix: true });
  const label = TYPE_LABELS[frontmatter.type] || frontmatter.type;
  return (
    <div className="garden-card__meta">
      {icon && <span style={{ color, fontSize: '0.82rem', fontWeight: 700 }}>{icon}</span>}
      <span>{label}</span>
      <span style={{ color: 'var(--border-medium)' }}>·</span>
      <span>{relativeDate}</span>
    </div>
  );
}

export default function GardenCard({ item }: { item: ContentItem }) {
  const { slug, frontmatter } = item;
  const href = frontmatter.externalUrl || `/${slug}`;
  const isExternal = !!frontmatter.externalUrl;
  const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const { icon, color } = getIconInfo(item);

  // ── Podcast / Talk: horizontal thumbnail card ──────────────────────────
  if (frontmatter.type === 'podcast' || frontmatter.type === 'talk') {
    return (
      <a href={href} {...linkProps} className="garden-card garden-card--row">
        <div className="garden-card__thumb">
          {frontmatter.cover ? (
            <Image src={frontmatter.cover} alt={frontmatter.title} fill style={{ objectFit: 'cover' }} sizes="64px" />
          ) : (
            <div className="garden-card__thumb-placeholder">
              <span style={{ color }}>{icon}</span>
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="garden-card__title" style={{ fontSize: '0.92rem' }}>{frontmatter.title}</div>
          {frontmatter.podcastName && (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>{frontmatter.podcastName}</div>
          )}
          <CardMeta item={item} />
        </div>
      </a>
    );
  }

  // ── Essay / content with cover image ──────────────────────────────────
  if (frontmatter.cover) {
    return (
      <Link href={href} className="garden-card garden-card--image">
        <div className="garden-card__image">
          <Image
            src={frontmatter.cover}
            alt={frontmatter.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 380px"
          />
        </div>
        <div className="garden-card__body">
          <div className="garden-card__title">{frontmatter.title}</div>
          {frontmatter.description && (
            <div className="garden-card__desc">{frontmatter.description}</div>
          )}
          <CardMeta item={item} icon={icon} color={color} />
        </div>
      </Link>
    );
  }

  // ── Text-only card: icon floats beside title ───────────────────────────
  return (
    <Link href={href} className="garden-card garden-card--text">
      <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
        <span style={{
          color,
          fontSize: '1rem',
          fontWeight: 700,
          flexShrink: 0,
          lineHeight: 1.35,
          marginTop: '0.1rem',
        }}>
          {icon}
        </span>
        <div style={{ minWidth: 0 }}>
          <div className="garden-card__title">{frontmatter.title}</div>
          {frontmatter.description && (
            <div className="garden-card__desc">{frontmatter.description}</div>
          )}
          <CardMeta item={item} />
        </div>
      </div>
    </Link>
  );
}
