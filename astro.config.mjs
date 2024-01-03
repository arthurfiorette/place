import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  markdown: {
    rehypePlugins: [rehypeAutolinkHeadings],
    shikiConfig: {
      wrap: true,
      experimentalThemes: {
        light: 'github-light',
        dark: 'github-dark'
      }
    }
  },
  integrations: [
    mdx(),
    sitemap(),
    icon({
      include: {
        mdi: [
          'github',
          'account-file-outline',
          'twitter',
          'twitch',
          'linkedin',
          'at',
          'arrow-left'
        ]
      }
    })
  ]
});
