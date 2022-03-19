import { Feed } from 'feed';
import { mkdir, writeFile } from 'fs/promises';
import { marked } from 'marked';
import { ALL_POSTS_FILES, readMd } from './posts';

export async function generateFeed() {
  const baseUrl = process.env.BASE_URL || 'https://arthur.place';

  const feed = new Feed({
    title: 'arthur.place',
    description: "Arthur's personal website",

    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/images/logo.svg`,
    favicon: `${baseUrl}/favicon.ico`,

    feedLinks: {
      rss2: `${baseUrl}/feeds/feed.xml`,
      json: `${baseUrl}/feeds/feed.json`,
      atom: `${baseUrl}/feeds/atom.xml`
    },

    copyright: `All rights reserved ${new Date().getFullYear()}, Arthur Fiorette`,

    author: {
      link: baseUrl,
      name: 'Arthur Fiorette',
      email: 'arthur.fiorette@gmail.com'
    }
  });

  await Promise.all(
    ALL_POSTS_FILES.map(async ({ path, slug }) => {
      const { meta, content } = await readMd(path, slug);

      feed.addItem({
        id: meta.slug,
        guid: meta.slug,
        title: meta.title,

        link: `${baseUrl}/posts/${meta.slug}`,

        date: new Date(meta.date),
        published: new Date(meta.date),

        description: meta.description,

        copyright: `All rights reserved ${new Date().getFullYear()}, ${meta.author}`,

        image: `${baseUrl}/images/${meta.preview}`,

        author: [{ name: meta.author }],
        contributor: [{ name: meta.author }],

        // Simple raw html.
        // Avoids extra formatting or syntax highlight
        content: marked(content)
      });
    })
  );

  await mkdir('./public/feeds', { recursive: true });

  await writeFile('./public/feeds/feed.xml', feed.rss2());
  await writeFile('./public/feeds/atom.xml', feed.atom1());
  await writeFile('./public/feeds/feed.json', feed.json1());
}
