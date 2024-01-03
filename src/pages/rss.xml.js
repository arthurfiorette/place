import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');

  return rss({
    title: "Arthur's place blog",

    description:
      'A blog about web development, design and other things I like.',
    site: context.site,

    items: posts.map((post) => ({
      ...post.data,
      link: `/${post.slug}`,
      pubDate: new Date(post.data.date).toUTCString(),
    }))
  });
}
