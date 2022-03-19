import matter from 'gray-matter';
import { hasAllKeys } from 'util/has-all-keys';

export type MarkdownMeta = {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
  preview: string;
};

export function parseFrontMatter(
  slug: string,
  raw: string
): { content: string; meta: MarkdownMeta } {
  const { data, content } = matter(raw);

  if (!hasAllKeys(data, ['date', 'title', 'author', 'description', 'preview'])) {
    throw new Error(
      `Markdown ${slug} is missing information. ${JSON.stringify(data, null, 2)}`
    );
  }

  const { date, title, author, description, preview } = data as Record<string, string>;

  return {
    content,
    meta: {
      preview,
      slug,
      date,
      title,
      author,
      description
    }
  };
}
