import { getCollection } from 'astro:content';

export const posts = (await getCollection('blog')).filter(
  (p) => import.meta.env.MODE === 'development' || p.data.published
);

export const sortedPosts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
