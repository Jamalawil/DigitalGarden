import Link from 'next/link';

export default function TopicTag({ topic }: { topic: string }) {
  const slug = topic.toLowerCase().replace(/\s+/g, '-');
  return (
    <Link href={`/topics/${slug}`} className="topic-tag">
      {topic}
    </Link>
  );
}
