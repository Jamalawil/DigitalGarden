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
