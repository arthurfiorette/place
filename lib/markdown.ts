import { mangle } from 'marked-mangle';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

marked.use(mangle());
marked.use(gfmHeadingId());
marked.use(
  markedHighlight({
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
  })
);

export function markdownToHtml(md: string) {
  return marked.parse(md, {
    async: true,
    breaks: false,
    gfm: true
  });
}
