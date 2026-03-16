import Link from 'next/link';
import Image from 'next/image';
import { ContentItem } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { CONTENT_TYPE_ICONS } from '@/components/ui/ContentTypeIcons';

const TYPE_LABELS: Record<string, string> = {
  essay:       'Essay',
  note:        'Note',
  pattern:     'Pattern',
  smidgeon:    'Smidgeon',
  talk:        'Talk',
  podcast:     'Podcast',
  library:     'Library',
  antilibrary: 'Antilibrary',
};

function RelDate({ dateStr }: { dateStr: string }) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return <>{formatDistanceToNow(d, { addSuffix: true })}</>;
}

function CardMeta({ item }: { item: ContentItem }) {
  const { frontmatter } = item;
  const label = TYPE_LABELS[frontmatter.type] || frontmatter.type;
  return (
    <div className="garden-card__meta">
      <span>{label}</span>
      <span style={{ color: 'var(--border-medium)', margin: '0 0.1rem' }}>·</span>
      <RelDate dateStr={frontmatter.startDate} />
    </div>
  );
}

function TypeIcon({ type, size = 22 }: { type: string; size?: number }) {
  const Icon = CONTENT_TYPE_ICONS[type];
  if (!Icon) return null;
  return <Icon size={size} className="content-type-icon" />;
}

export default function GardenCard({ item }: { item: ContentItem }) {
  const { slug, frontmatter } = item;
  const href = frontmatter.externalUrl || `/${slug}`;
  const isExternal = !!frontmatter.externalUrl;
  const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  /* ── Podcast / Talk: horizontal thumbnail row ─────────────────── */
  if (frontmatter.type === 'podcast' || frontmatter.type === 'talk') {
    return (
      <a href={href} {...linkProps} className="garden-card garden-card--row">
        <div className="garden-card__thumb">
          {frontmatter.cover ? (
            <Image src={frontmatter.cover} alt={frontmatter.title} fill
              style={{ objectFit: 'cover' }} sizes="64px" />
          ) : (
            <div className="garden-card__thumb-placeholder">
              <TypeIcon type={frontmatter.type} size={26} />
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="garden-card__title" style={{ fontSize: '0.92rem' }}>
            {frontmatter.title}
          </div>
          {frontmatter.podcastName && (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
              {frontmatter.podcastName}
            </div>
          )}
          {frontmatter.description && (
            <div className="garden-card__desc" style={{ fontSize: '0.78rem', marginTop: '0.25rem' }}>
              {frontmatter.description}
            </div>
          )}
          <CardMeta item={item} />
        </div>
      </a>
    );
  }

  /* ── Content with a cover image ───────────────────────────────── */
  if (frontmatter.cover) {
    return (
      <Link href={href} className="garden-card garden-card--image">
        <div className="garden-card__image">
          <Image src={frontmatter.cover} alt={frontmatter.title} fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 380px" />
        </div>
        <div className="garden-card__body">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <TypeIcon type={frontmatter.type} size={18} />
            <div className="garden-card__title" style={{ margin: 0 }}>{frontmatter.title}</div>
          </div>
          {frontmatter.description && (
            <div className="garden-card__desc">{frontmatter.description}</div>
          )}
          <CardMeta item={item} />
        </div>
      </Link>
    );
  }

  /* ── Text-only card ───────────────────────────────────────────── */
  return (
    <Link href={href} className="garden-card garden-card--text">
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <div style={{ flexShrink: 0, marginTop: '0.15rem' }}>
          <TypeIcon type={frontmatter.type} size={20} />
        </div>
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
