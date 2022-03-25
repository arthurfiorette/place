/**
 * I don't know why 200.
 * https://infusion.media/content-marketing/how-to-calculate-reading-time/
 */
export function getMinRead(text: string) {
  const wordsLength = text.split(/\w+/g).length;
  return Math.round(wordsLength / 200);
}
