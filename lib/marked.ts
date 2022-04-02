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

    highlight: (code, lang) => {
      if (!hljs.getLanguage(lang)) {
        console.warn(`warn  - Language "${lang}" isn't supported`);
      }

      const parsed = hljs.highlight(code, {
        language: lang || 'plaintext'
      }).value;

      return generateTable(generateTrs(parsed));
    }
  });
}

function generateTrs(lines: string) {
  return lines
    .split('\n')
    .map((line, index) => `<tr><td>${index + 1}</td><td>${line}</td></tr>`);
}

function generateTable(trs: string[]) {
  return `<table><tbody>${trs.join('\n')}</tbody></table>`;
}
