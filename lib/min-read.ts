/**
 * I don't know why 200.
 * https://infusion.media/content-marketing/how-to-calculate-reading-time/
 */
export function getMinRead(text: string) {
  // Strip code blocks
  text = text.replace(/```[\s\S]*?```/g, '');

  const wordsLength = text.split(/\w+/g).length;

  return Math.round(wordsLength / 200);
}
