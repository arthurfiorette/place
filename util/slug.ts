import { POSTS_PATH } from 'lib/posts';
import { join } from 'path';

export function pathToSlug(path: string): string {
  return join(path).toLowerCase().replace(/\s+/g, '-').replace(/\.md$/, '');
}

export function slugToPath(slug: string): string {
  return join(POSTS_PATH, `${slug}.md`);
}
