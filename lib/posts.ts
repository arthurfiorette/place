import { mkdirSync, readdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { pathToSlug } from 'util/slug';
import { parseFrontMatter } from './matter';

if (!process.env.POSTS_PATH) {
  throw new Error('POSTS_PATH environment variable is not set');
}

export const POSTS_PATH = join(process.env.POSTS_PATH);

mkdirSync(POSTS_PATH, { recursive: true });

export const ALL_POSTS_FILES = readdirSync(POSTS_PATH, 'utf8').map((filename) => ({
  filename,
  slug: pathToSlug(filename),
  path: join(POSTS_PATH, filename)
}));

export function hasPost(slug: string) {
  return ALL_POSTS_FILES.some((post) => post.slug === slug);
}

export async function readMd(path: string, slug: string) {
  const raw = await readFile(path, 'utf8');
  return parseFrontMatter(slug, raw);
}

/** Returns posts in chronological order */
export function readAllPosts() {
  return Promise.all(ALL_POSTS_FILES.map(({ path, slug }) => readMd(path, slug))).then(
    (posts) => posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date))
  );
}
