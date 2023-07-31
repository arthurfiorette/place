import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import { marked } from 'marked';

export const posts = fs
  .readdirSync(path.resolve(__dirname, '../posts'))
  .map((filepath) => {
    const raw = fs.readFileSync(path.resolve(__dirname, '../posts', filepath), 'utf8');
    const { data, content } = matter(raw);

    return {
      content,
      meta: {
        title: data.title as string,
        date: data.date as string,
        keywords: data.keywords as string[],
        description: data.description as string,
        discussion: Number(data.discussion) as number,

        slug: pathToSlug(filepath),
        readTime: getReadTime(content)
      }
    };
  });

/**
 * I don't know why 200.
 * https://infusion.media/content-marketing/how-to-calculate-reading-time/
 */
function getReadTime(str: string) {
  // Strip code blocks
  str = str.replace(/```[\s\S]*?```/g, '');
  return Math.round(str.split(/\w+/g).length / 200);
}

function pathToSlug(str: string) {
  return path.join(str).toLowerCase().replace(/\s+/g, '-').replace(/\.md$/, '');
}

export function markdownToHtml(md: string) {
  return marked(md, {
    smartypants: true,
    gfm: true,
    headerIds: true,
    async: true,

    // Do not respect markdown line breaks
    breaks: false,

    // highlight.js css expects a top-level 'hljs' class.
    langPrefix: 'hljs language-',

    highlight: (code, l) => {
      const [lang, extras] = l.split(':', 2) as [string, string | undefined];

      if (!hljs.getLanguage(lang)) {
        console.warn(`warn  - Language "${lang}" isn't supported`);
      }

      let parsed = hljs.highlight(code, {
        language: lang || 'plaintext'
      }).value;

      const matches = extras?.match(/hg((?:\d|,)+)*/);

      if (matches?.length) {
        const lines = parsed.split('\n');
        const lineNumber = matches[1]?.split(',').map(Number) || [];

        for (const ln of lineNumber) {
          lines[ln - 1] = `<mark>${lines[ln - 1]}</mark>`;
        }

        parsed = lines.join('\n');
      }

      return parsed;
    }
  });
}
