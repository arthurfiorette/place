import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  site: 'https://arthur.place',
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    shikiConfig: {
      wrap: true,
      theme: 'vitesse-dark'
    }
  },
  build: {
    format: 'file'
  },
  output: 'static',
  integrations: [
    mdx(),
    sitemap(),
    icon({
      include: {
        mdi: [
          'github',
          'account-file-outline',
          'npm',
          'twitch',
          'linkedin',
          'at',
          'arrow-left',
          'file-download',
          'lightbulb-alert-outline',
          'home-variant',
          'post-outline',
          'downloads',
          'star'
        ],
        ri: ['bluesky-fill', 'twitter-x-fill']
      }
    }),
    compress({
      CSS: true,
      Image: true,
      JavaScript: true,
      SVG: true,
      HTML: true
    }),
    tailwind()
  ]
});
