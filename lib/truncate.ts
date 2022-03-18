export function truncate(text: string, wordLimit: number) {
  const words = text.split(/\s+/g);

  if (words.length <= wordLimit) {
    return text;
  }

  return words.slice(0, wordLimit).join(' ') + '...';
}
