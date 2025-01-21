import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
  const posts = await getCollection('blog');

  return rss({
    title: "Arthur's place blog",

    description: 'A blog about web development, design and other things I like.',
    site: context.site,

    items: posts
      .filter((p) => p.data.published)
      .map((post) => ({
        ...post.data,
        link: `/${post.slug}`,
        pubDate: new Date(post.data.date).toUTCString()
      }))
  });
}
