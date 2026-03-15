import { getAllContent, getAllTopics } from '@/lib/content';
import GardenClient from './GardenClient';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'The Garden' };

export default function GardenPage() {
  const allItems = getAllContent();
  const topics = getAllTopics();
  return <GardenClient items={allItems} topics={topics} />;
}
