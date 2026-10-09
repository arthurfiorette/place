import { readdirSync, readFileSync } from 'node:fs';
import { satteri, satteriHeadingIdsPlugin } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import icon from 'astro-icon';
import slop from 'astro-slop';

// Draft posts still build (shareable by link) but must stay out of the sitemap.
// The config can't query content collections, so read the frontmatter flag
// directly; `published: preview` counts as listed, same as get-posts.ts.
const blogDir = new URL('./src/content/blog/', import.meta.url);
const draftPaths = new Set(
  readdirSync(blogDir)
    .filter(
      (file) =>
        !/^published:\s*(true|['"]?preview['"]?)\s*$/m.test(
          readFileSync(new URL(file, blogDir), 'utf8')
        )
    )
    .map((file) => `/${file.replace(/\.mdx?$/, '')}`)
);

// Equivalent of rehype-autolink-headings with `behavior: 'wrap'`: the heading
// content becomes a link to the heading's own id. Must run after the heading
// ids plugin, since it reads the id from the element.
const autolinkHeadings = {
  name: 'autolink-headings',
  element: {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    // Returning a node replaces the heading; its original children are reused
    // as-is inside the link. Avoids ctx.setField, which satteri 0.10.x lacks.
    visit(node) {
      const id = node.properties.id;
      if (typeof id !== 'string') return;

      return {
        ...node,
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: { href: `#${id}` },
            children: node.children
          }
        ]
      };
    }
  }
};

// https://astro.build/config
export default defineConfig({
  site: 'https://arthur.place',
  markdown: {
    processor: satteri({
      hastPlugins: [satteriHeadingIdsPlugin(), autolinkHeadings]
    }),
    shikiConfig: {
      wrap: false,
      // Both palettes are emitted at build time; CSS chooses without a script.
      themes: { light: 'gruvbox-light-medium', dark: 'gruvbox-dark-hard' },
      defaultColor: false,
      transformers: [
        {
          pre(node) {
            // Long code examples must remain keyboard-scrollable without JavaScript.
            node.properties.tabIndex = 0;
            node.properties.role = 'region';
            node.properties['aria-label'] = 'Code example';
          }
        }
      ]
    }
  },
  build: {
    format: 'file'
  },
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !draftPaths.has(new URL(page).pathname) }),
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
    slop({
      // Auto-injection matches route patterns, so drafts and the 404 would get
      // links to .md files that don't exist. Pages declare it via
      // Document's `markdown` prop instead.
      injectAlternateLink: false,
      siteName: "Arthur's place",
      siteDescription:
        'Personal site of Arthur Fiorette, a senior software developer from Brazil focused on open source and developer tools: projects, posts and curriculum.'
    }),
    compress({
      CSS: true,
      Image: true,
      JavaScript: true,
      SVG: true,
      HTML: true
    })
  ]
});
