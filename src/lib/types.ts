export type GrowthStage = 'seedling' | 'budding' | 'evergreen';

export type ContentType =
  | 'essay'
  | 'note'
  | 'pattern'
  | 'smidgeon'
  | 'talk'
  | 'podcast'
  | 'library'
  | 'antilibrary';

export interface Frontmatter {
  title: string;
  description?: string;
  startDate: string;
  updated?: string;
  type: ContentType;
  growthStage?: GrowthStage;
  topics?: string[];
  cover?: string;
  externalUrl?: string;
  podcastName?: string;
  author?: string;
  toc?: boolean;
  assumptions?: string;
  epistemicStatus?: string;
}

export interface ContentItem {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  readingTime: number;
  wordCount: number;
}

export interface ProcessedContent extends ContentItem {
  html: string;
  headings: Heading[];
  backlinks: BacklinkItem[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface BacklinkItem {
  slug: string;
  title: string;
  description?: string;
  type: ContentType;
}
