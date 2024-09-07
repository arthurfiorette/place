import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://arthur.place',
  markdown: {
    rehypePlugins: [rehypeAutolinkHeadings],
    shikiConfig: {
      wrap: true,
      theme: 'vitesse-dark'
    }
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
          'twitter',
          'npm',
          'twitch',
          'linkedin',
          'at',
          'arrow-left',
          'file-download',
          'lightbulb-alert-outline',
          'home-variant',
          'post-outline'
        ]
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
