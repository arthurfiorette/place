import matter from 'gray-matter';
import { hasAllKeys } from 'util/has-all-keys';

export type MarkdownMeta = {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
};

export function parseFrontMatter(
  slug: string,
  raw: string
): { content: string; meta: MarkdownMeta } {
  const { data, content } = matter(raw);

  const { date, title, author, description } = data as Record<string, string>;

  if (!hasAllKeys(data, ['date', 'title', 'author', 'description'])) {
    throw new Error(
      `Markdown ${slug} is missing information. ${JSON.stringify(data, null, 2)}`
    );
  }

  return {
    content,
    meta: {
      slug,
      date,
      title,
      author,
      description
    }
  };
}
