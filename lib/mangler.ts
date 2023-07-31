/**
 * Mangle URLs inside Markdown links.
 *
 * @see https://github.com/markedjs/marked-mangle
 */
export function mangleUrl(text: string) {
  let out = '';

  const length = text.length;

  for (let i = 0; i < length; i++) {
    let ch: number | string = text.charCodeAt(i);

    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }

    out += '&#' + ch + ';';
  }

  return out;
}
