import hljs from 'highlight.js';
import bash from 'highlight.js/lib/languages/bash';
import { marked } from 'marked';

hljs.registerLanguage('sh', bash);
hljs.registerAliases(['bash'], { languageName: 'sh' });

export function markdownToHtml(md: string) {
  return marked(md, {
    smartypants: true,
    gfm: true,
    smartLists: true,
    headerIds: true,

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
