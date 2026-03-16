import { ReactElement } from 'react';

export interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/* ─────────────────────────────────────────────
   Essays — two leaves sprouting from a stem
───────────────────────────────────────────── */
export function EssayIcon({ size = 20, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M10 18v-8" />
      <path d="M10 15 Q5 13 6 8 Q9 11 10 15Z" />
      <path d="M10 11 Q15 9 14 4 Q11 7 10 11Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Notes — feather quill pen
───────────────────────────────────────────── */
export function NoteIcon({ size = 20, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M15 2C17 4 17 8 14 11L8 17L4 16L3 12L9 6C12 3 15 2 15 2Z" />
      <path d="M3 12L8 17" />
      <path d="M9 6L11 8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Patterns — geometric diamond / gem
───────────────────────────────────────────── */
export function PatternIcon({ size = 20, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M10 2L17 7L10 18L3 7Z" />
      <path d="M3 7L17 7" />
      <path d="M10 2L13.5 7L10 18L6.5 7Z" opacity="0.45" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Smidgeons — paperclip
───────────────────────────────────────────── */
export function SmidgeonIcon({ size = 20, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M16 8.5L8.5 16A4.5 4.5 0 012 9.5L9.5 2A3 3 0 0114 6.5L6.5 14A1.5 1.5 0 014.5 12L12 4.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Talks — presentation screen with chart line
───────────────────────────────────────────── */
export function TalkIcon({ size = 20, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <rect x="1" y="2" width="18" height="12" rx="2" />
      <path d="M10 14v3" />
      <path d="M6 17h8" />
      <polyline points="4 11 7 8 11 10 16 5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Podcasts — standing microphone
───────────────────────────────────────────── */
export function PodcastIcon({ size = 20, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <rect x="7" y="1" width="6" height="9" rx="3" />
      <path d="M3 9.5A7 7 0 0017 9.5" />
      <path d="M10 16.5v3" />
      <path d="M7 19.5h6" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Library — open book (two pages, spine)
───────────────────────────────────────────── */
export function LibraryIcon({ size = 20, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M10 17V4C8 2.5 5 3 2 4.5V18C5 16.5 8 17 10 17Z" />
      <path d="M10 17V4C12 2.5 15 3 18 4.5V18C15 16.5 12 17 10 17Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Antilibrary — dashed circle (unrealised potential)
───────────────────────────────────────────── */
export function AntilibraryIcon({ size = 20, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      strokeDasharray="3 2.5"
      className={className} style={style} aria-hidden="true">
      <circle cx="10" cy="10" r="7" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Lookup map: content type → icon component
───────────────────────────────────────────── */
export const CONTENT_TYPE_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  essay:       EssayIcon,
  note:        NoteIcon,
  pattern:     PatternIcon,
  smidgeon:    SmidgeonIcon,
  talk:        TalkIcon,
  podcast:     PodcastIcon,
  library:     LibraryIcon,
  antilibrary: AntilibraryIcon,
};

/* ═══════════════════════════════════════════
   JOURNALISM GENRE ICONS
═══════════════════════════════════════════ */

/* Investigative — magnifying glass */
export function InvestigativeIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <line x1="12.5" y1="12.5" x2="17.5" y2="17.5" />
    </svg>
  );
}

/* News Feature — folded newspaper */
export function NewsFeaturesIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <rect x="2" y="3" width="16" height="15" rx="1.5" />
      <line x1="5" y1="7" x2="15" y2="7" />
      <line x1="5" y1="10.5" x2="15" y2="10.5" />
      <line x1="5" y1="14" x2="10" y2="14" />
    </svg>
  );
}

/* Opinion — speech bubble */
export function OpinionIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M17 3H3a1 1 0 00-1 1v9a1 1 0 001 1h5.5l2.5 3 2.5-3H17a1 1 0 001-1V4a1 1 0 00-1-1z" />
    </svg>
  );
}

/* Science — flask / beaker */
export function ScienceIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M8 2h4v7l4 7H4l4-7V2z" />
      <line x1="7" y1="2" x2="13" y2="2" />
      <circle cx="9.5" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Environmental — leaf with stem */
export function EnvironmentalIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M4 17c1-5 4-9 8-10 4-1 7 0 7-4-4 0-8 1-11 5C6 11 5 14 4 17z" />
      <line x1="4" y1="17" x2="10.5" y2="11" />
    </svg>
  );
}

/* Local / Community — map pin */
export function LocalIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M10 2a6 6 0 016 6c0 4.5-6 11-6 11S4 12.5 4 8a6 6 0 016-6z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  );
}

/* Sports — medal with ribbon */
export function SportsIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <circle cx="10" cy="14" r="5" />
      <path d="M7 9V3l3 2 3-2v6" />
    </svg>
  );
}

/* New Journalism — fountain pen nib */
export function NewJournalismIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M3 18l4-4L18 3 14 14l-4-3-4-2 4 9z" />
      <line x1="3" y1="18" x2="7" y2="14" />
    </svg>
  );
}

/* Data Journalism — bar chart */
export function DataIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <rect x="3" y="12" width="3.5" height="6" rx="0.5" />
      <rect x="8.25" y="7" width="3.5" height="11" rx="0.5" />
      <rect x="13.5" y="3" width="3.5" height="15" rx="0.5" />
    </svg>
  );
}

/* Celebrity / People — star */
export function CelebrityIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M10 2l2.4 5 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8L10 2z" />
    </svg>
  );
}

/* Gonzo — lightning bolt (wild, first-person energy) */
export function GonzoIcon({ size = 18, className, style }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      <path d="M12 2L6 11h5l-3 8 9-10h-5l3-7z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Genre slug → icon component map
───────────────────────────────────────────── */
export const GENRE_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  'investigative-journalism':    InvestigativeIcon,
  'news-feature':                NewsFeaturesIcon,
  'opinion-journalism':          OpinionIcon,
  'science-journalism':          ScienceIcon,
  'environmental-journalism':    EnvironmentalIcon,
  'local-community-journalism':  LocalIcon,
  'sports-journalism':           SportsIcon,
  'new-journalism':              NewJournalismIcon,
  'data-journalism':             DataIcon,
  'celebrity-people-journalism': CelebrityIcon,
  'gonzo-journalism':            GonzoIcon,
};
