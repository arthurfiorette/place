export function getReadTime(str: string) {
  // Count article text, not MDX setup or Markdown link destinations.
  const text = str
    .replace(/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1[ \t]*(?:\n|$)/gm, ' ')
    .replace(/^import\s+(?:[^;]*?\s+from\s+)?['"][^'"\n]+['"];?[ \t]*$/gm, ' ')
    .replace(/<!--[\s\S]*?-->|\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/^ {0,3}\[(?!\^)[^\]]+\]:[^\n]*$/gm, ' ')
    .replace(/!?\[([^\]]*)\]\((?:[^()\n]|\([^()\n]*\))*\)/g, '$1')
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1')
    .replace(/\[\^[^\]]+\]:?/g, ' ');

  // Whitespace keeps contractions and hyphenated words together; ignore syntax-only tokens.
  const words = text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word));
  return Math.ceil(words.length / 240);
}
