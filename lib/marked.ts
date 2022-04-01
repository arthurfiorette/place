import hljs from 'highlight.js';
import bash from 'highlight.js/lib/languages/bash';
import { marked } from 'marked';

hljs.registerLanguage('sh', bash);

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

    highlight: (code, lang) => {
      if (!hljs.getLanguage(lang)) {
        console.warn(`warn  - Language "${lang}" isn't supported`);
      }

      return hljs.highlight(code, {
        language: lang || 'plaintext'
      }).value;
    }
  });
}
