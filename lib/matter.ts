import matter from 'gray-matter';
import { hasAllKeys } from 'util/has-all-keys';

export type MarkdownMeta = {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
  preview: string;
  keywords: string[];
};

export function parseFrontMatter(
  slug: string,
  raw: string
): { content: string; meta: MarkdownMeta } {
  const { data, content } = matter(raw);

  if (
    !hasAllKeys(data, ['date', 'title', 'author', 'description', 'preview', 'keywords'])
  ) {
    throw new Error(
      `Markdown ${slug} is missing information. ${JSON.stringify(data, null, 2)}`
    );
  }

  return {
    content,
    meta: { slug, ...data }
  };
}
