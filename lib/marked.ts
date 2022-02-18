import hljs from 'highlight.js';
import { marked } from 'marked';

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
        console.warn(`Language ${lang} not supported`);
      }

      return hljs.highlight(code, {
        language: lang || 'plaintext'
      }).value;
    }
  });
}
