import { ReactElement } from 'react';
import { GrowthStage } from '@/lib/types';

/* Botanical SVG icons — Maggie Appleton–style */
function SeedlingIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M6.5 12V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M6.5 5.5C6.5 5.5 4.5 3 1.5 3.5C2 6.5 4.5 7.5 6.5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 5.5C6.5 5.5 8.5 3 11.5 3.5C11 6.5 8.5 7.5 6.5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BuddingIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M6.5 12V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="6.5" cy="4" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6.5 7.5C4.5 7.5 3 6 3 4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      <circle cx="2.5" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.1"/>
      <path d="M6.5 7.5C8.5 7.5 10 6 10 4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      <circle cx="10.5" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.1"/>
    </svg>
  );
}

function EvergreenIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M6.5 1.5L10.5 7H8.5L11 10H2L4.5 7H2.5L6.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M6.5 10V12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

type IconComponent = () => ReactElement;

const STAGE_CONFIG: Record<GrowthStage, { Icon: IconComponent; label: string }> = {
  seedling:  { Icon: SeedlingIcon,  label: 'Seedling'  },
  budding:   { Icon: BuddingIcon,   label: 'Budding'   },
  evergreen: { Icon: EvergreenIcon, label: 'Evergreen' },
};

export default function GrowthBadge({ stage }: { stage?: GrowthStage }) {
  if (!stage) return null;
  const { Icon, label } = STAGE_CONFIG[stage];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.32rem',
      fontSize: '0.72rem', fontWeight: 700,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      fontFamily: 'var(--font-ui)', color: 'var(--sea-blue)',
    }}>
      <Icon /> {label}
    </span>
  );
}
