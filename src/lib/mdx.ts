import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { Heading } from './types';

function resolveWikilinks(content: string): string {
  return content
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, slug, label) => {
      return `[${label}](/${slug.toLowerCase().replace(/\s+/g, '-')})`;
    })
    .replace(/\[\[([^\]]+)\]\]/g, (_, slug) => {
      return `[${slug}](/${slug.toLowerCase().replace(/\s+/g, '-')})`;
    });
}

/** Strip leading H1 from markdown — the page renders it from frontmatter */
function stripLeadingH1(content: string): string {
  return content.replace(/^#\s+.+\n?/m, '');
}

export async function markdownToHtml(content: string): Promise<string> {
  const resolved = resolveWikilinks(stripLeadingH1(content));
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(resolved);
  return result.toString();
}

export function extractHeadings(content: string): Heading[] {
  // Skip the first H1 — it's shown from frontmatter, not from prose
  const withoutH1 = stripLeadingH1(content);
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = headingRegex.exec(withoutH1)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/\*\*/g, '').replace(/\*/g, '');
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ id, text, level });
  }
  return headings;
}
