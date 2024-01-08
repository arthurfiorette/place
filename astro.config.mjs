import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://arthur.place',
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
          'arrow-left',
          'file-download',
          'lightbulb-alert-outline'
        ]
      }
    })
  ]
});
