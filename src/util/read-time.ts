/**
 * I don't know why 200.
 * https://infusion.media/content-marketing/how-to-calculate-reading-time/
 */
export function getReadTime(str: string) {
  return Math.round(
    // Remove code blocks
    str
      .replace(/```[\s\S]*?```/g, '')
      // Split words
      .split(/\w+/g).length / 200
  );
}
