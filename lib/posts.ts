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
  for (const post of ALL_POSTS_FILES) {
    if (post.slug === slug) {
      return true;
    }
  }

  return false;
}

export async function readMd(path: string, slug: string) {
  const raw = await readFile(path, 'utf8');
  return parseFrontMatter(slug, raw);
}

/** Returns posts in chronological order */
export async function readAllPosts() {
  return Promise.all(ALL_POSTS_FILES.map(({ path, slug }) => readMd(path, slug))).then(
    (posts) => posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date))
  );
}

// let needToUpdate = true;
// const cache: Record<string, ParsedMarkdown> = {};

// /**
//  * A simple proxy between the actual file system and all markdown posts.
//  */
// export const PostsCache = {
//   a: Math.random(),

//   checkUpdate: async (): Promise<void> => {
//     if (!needToUpdate) {
//       return;
//     }

//     await Promise.all(
//       ALL_POSTS_PATHS.map((path) => {
//         return PostsCache.getPost(pathToSlug(path));
//       })
//     );

//     needToUpdate = false;
//   },

//   /**
//    * Returns the post with this slug.
//    * @throws an error if the post does not exist.
//    */
//   getPost: async (slug: string) => {
//     if (cache[slug]) {
//       return cache[slug];
//     }

//     const file = path.join(POSTS_PATH, `${slug}.md`);

//     const content = await readFile(file, 'utf8');
//     const parsed = parseMarkdown(slug, content);

//     cache[slug] = parsed;

//     return parsed;
//   },

//   getAllPosts: (): [slug: string, md: ParsedMarkdown][] => {
//     return Object.entries(cache);
//   },

//   getAllSlugs: (): string[] => {
//     return Object.keys(cache);
//   },

//   hasSlug: (slug = ''): boolean => {
//     return slug in cache;
//   }
// };
