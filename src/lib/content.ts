import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { ContentItem, ContentType, Frontmatter } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const DIR_TO_TYPE: Record<string, ContentType> = {
  essays: 'essay',
  notes: 'note',
  patterns: 'pattern',
  smidgeons: 'smidgeon',
  talks: 'talk',
  podcasts: 'podcast',
  library: 'library',
  antilibrary: 'antilibrary',
};

export function getContentDirs(): string[] {
  return Object.keys(DIR_TO_TYPE);
}

export function getSlugsForDir(dir: string): string[] {
  const dirPath = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.(md|mdx)$/, ''));
}

export function getContentItem(dir: string, slug: string): ContentItem | null {
  const mdPath = path.join(CONTENT_DIR, dir, `${slug}.md`);
  const mdxPath = path.join(CONTENT_DIR, dir, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath)
    ? mdPath
    : fs.existsSync(mdxPath)
    ? mdxPath
    : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const frontmatter: Frontmatter = {
    title: data.title || slug,
    description: data.description,
    startDate: data.startDate || data.date || new Date().toISOString(),
    updated: data.updated || data.lastUpdated,
    type: data.type || DIR_TO_TYPE[dir] || 'note',
    growthStage: data.growthStage || data.stage,
    topics: data.topics || data.tags || [],
    cover: data.cover,
    externalUrl: data.externalUrl || data.url,
    podcastName: data.podcastName,
    author: data.author,
    toc: data.toc !== false,
    assumptions: data.assumptions,
    epistemicStatus: data.epistemicStatus,
  };

  return {
    slug,
    frontmatter,
    content,
    readingTime: Math.ceil(stats.minutes),
    wordCount: stats.words,
  };
}

export function getAllContent(types?: ContentType[]): ContentItem[] {
  const items: ContentItem[] = [];

  for (const dir of getContentDirs()) {
    const type = DIR_TO_TYPE[dir];
    if (types && !types.includes(type)) continue;

    for (const slug of getSlugsForDir(dir)) {
      const item = getContentItem(dir, slug);
      if (item) items.push(item);
    }
  }

  return items.sort(
    (a, b) =>
      new Date(b.frontmatter.startDate).getTime() -
      new Date(a.frontmatter.startDate).getTime()
  );
}

export function getContentByTopic(topic: string): ContentItem[] {
  return getAllContent().filter((item) =>
    item.frontmatter.topics?.some(
      (t) => t.toLowerCase().replace(/\s+/g, '-') === topic.toLowerCase()
    )
  );
}

export function getAllTopics(): { slug: string; label: string; count: number }[] {
  const topicMap = new Map<string, { label: string; count: number }>();

  for (const item of getAllContent()) {
    for (const topic of item.frontmatter.topics || []) {
      const slug = topic.toLowerCase().replace(/\s+/g, '-');
      if (topicMap.has(slug)) {
        topicMap.get(slug)!.count++;
      } else {
        topicMap.set(slug, { label: topic, count: 1 });
      }
    }
  }

  return Array.from(topicMap.entries())
    .map(([slug, { label, count }]) => ({ slug, label, count }))
    .sort((a, b) => b.count - a.count);
}

export function getBacklinks(targetSlug: string): ContentItem[] {
  const all = getAllContent();
  return all.filter((item) => {
    const pattern = new RegExp(`\\[\\[${targetSlug}[\\]|]`, 'i');
    return pattern.test(item.content) && item.slug !== targetSlug;
  });
}
