import { notFound } from 'next/navigation';
import {
  getContentItem,
  getBacklinks,
  getContentDirs,
  getSlugsForDir,
} from '@/lib/content';
import { markdownToHtml, extractHeadings } from '@/lib/mdx';
import GrowthBadge from '@/components/content/GrowthBadge';
import TopicTag from '@/components/content/TopicTag';
import TableOfContents from '@/components/content/TableOfContents';
import BacklinksSection from '@/components/content/BacklinksSection';
import RelativeTime from '@/components/ui/RelativeTime';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const dir of getContentDirs()) {
    for (const slug of getSlugsForDir(dir)) {
      params.push({ slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return {};
  return { title: item.frontmatter.title, description: item.frontmatter.description };
}

function findItem(slug: string) {
  for (const dir of getContentDirs()) {
    const item = getContentItem(dir, slug);
    if (item) return item;
  }
  return null;
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();

  const html = await markdownToHtml(item.content);
  const headings = extractHeadings(item.content);
  const backlinkItems = getBacklinks(slug);
  const backlinks = backlinkItems.map((b) => ({
    slug: b.slug,
    title: b.frontmatter.title,
    description: b.frontmatter.description,
    type: b.frontmatter.type,
  }));

  const { frontmatter } = item;
  const hasToC = frontmatter.toc !== false && headings.length > 1;

  const typeLabel = frontmatter.type.charAt(0).toUpperCase() + frontmatter.type.slice(1);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

      {/* Breadcrumb — ← ESSAYS   🌿 SEEDLING */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '2.5rem', fontFamily: 'var(--font-ui)',
        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        <Link href={`/${frontmatter.type}s`} style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          textDecoration: 'none', color: 'var(--accent-primary)',
          transition: 'opacity 0.1s',
        }}>
          <span style={{ fontSize: '0.9rem' }}>←</span>
          {typeLabel}s
        </Link>

        {frontmatter.growthStage && <GrowthBadge stage={frontmatter.growthStage} />}
      </nav>

      {/* Two-column: article + ToC */}
      <div className="article-layout" style={{
        display: 'grid',
        gridTemplateColumns: hasToC ? 'minmax(0, 1fr) 200px' : 'minmax(0, 1fr)',
        gap: '5rem',
        alignItems: 'start',
      }}>
        {/* ── Main article ── */}
        <article style={{ minWidth: 0 }}>

          {/* Title */}
          <h1 style={{ fontFamily: 'var(--font-ui)', marginBottom: '0.75rem', lineHeight: 1.1 }}>
            {frontmatter.title}
          </h1>

          {/* Description */}
          {frontmatter.description && (
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.55, maxWidth: '58ch' }}>
              {frontmatter.description}
            </p>
          )}

          {/* Topic tags */}
          {frontmatter.topics && frontmatter.topics.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
              {frontmatter.topics.map((t) => <TopicTag key={t} topic={t} />)}
            </div>
          )}

          {/* Metadata row */}
          <div style={{
            fontSize: '0.8rem', color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-ui)', marginBottom: '2.5rem',
            display: 'flex', flexWrap: 'wrap', gap: '0.3rem 1rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1.25rem',
          }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{typeLabel}</span>
            <span>·</span>
            <span>Planted <RelativeTime dateString={frontmatter.startDate} /></span>
            {frontmatter.updated && (
              <>
                <span>·</span>
                <span>Tended <RelativeTime dateString={frontmatter.updated} /></span>
              </>
            )}
            <span>·</span>
            <span>{item.readingTime} min read</span>
          </div>

          {/* Cover image */}
          {frontmatter.cover && (
            <img
              src={frontmatter.cover}
              alt={frontmatter.title}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '2rem', display: 'block' }}
            />
          )}

          {/* Epistemic callout */}
          {(frontmatter.epistemicStatus || frontmatter.assumptions) && (
            <div style={{
              padding: '0.9rem 1.1rem',
              background: 'var(--bg-secondary)',
              borderRadius: '8px', marginBottom: '2rem',
              fontSize: '0.85rem', color: 'var(--text-secondary)',
              fontFamily: 'var(--font-ui)',
              borderLeft: '3px solid var(--border-medium)',
            }}>
              {frontmatter.assumptions && (
                <div style={{ marginBottom: frontmatter.epistemicStatus ? '0.3rem' : 0 }}>
                  <strong>Assumed audience:</strong> {frontmatter.assumptions}
                </div>
              )}
              {frontmatter.epistemicStatus && (
                <div><strong>Epistemic status:</strong> {frontmatter.epistemicStatus}</div>
              )}
            </div>
          )}

          {/* Prose body */}
          <div className="prose-garden" dangerouslySetInnerHTML={{ __html: html }} />

          {/* Backlinks */}
          <BacklinksSection backlinks={backlinks} />
        </article>

        {/* ── Sticky ToC ── */}
        {hasToC && (
          <aside style={{ position: 'sticky', top: '5rem', alignSelf: 'start' }}>
            <TableOfContents headings={headings} />
          </aside>
        )}
      </div>
    </div>
  );
}
