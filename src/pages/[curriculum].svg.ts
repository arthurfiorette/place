import type { CollectionEntry } from 'astro:content';
import type { APIRoute } from 'astro';

export { getStaticPaths } from './[curriculum].astro';

const escapeXml = (text: string) =>
  text.replace(/[&<>"]/g, (char) => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot' }[char]};`);

// SVG collapses regular whitespace inside <text>.
const SEPARATOR = '&#160;&#160;·&#160;&#160;';

// Social card source. Crawlers don't accept SVG for og:image, so the postbuild
// script screenshots this into /<id>.png with chromium, which is also what loads
// the web font (librsvg/sharp would fall back to whatever system fonts exist).
export const GET: APIRoute<CollectionEntry<'curriculum'>> = ({ props: { data: cv } }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <style>
    @font-face {
      font-family: "Source Sans 3";
      font-weight: 200 900;
      src: url("/fonts/source-sans-3/latin.woff2") format("woff2");
    }
    text { font-family: "Source Sans 3", Arial, sans-serif; fill: #555; }
  </style>
  <rect width="1200" height="630" fill="#fff" />
  <rect width="16" height="630" fill="#171717" />
  <text x="96" y="120" font-size="28">arthur.place/${escapeXml(cv.id)}</text>
  <text x="96" y="300" font-size="84" font-weight="600" letter-spacing="-1.5" style="fill: #171717">${escapeXml(cv.name)}</text>
  <text x="96" y="368" font-size="44">${escapeXml(cv.title)}</text>
  <line x1="96" y1="430" x2="1104" y2="430" stroke="#e5e5e5" stroke-width="2" />
  <text x="96" y="494" font-size="30">${escapeXml(cv.email)}${SEPARATOR}arthur.place</text>
  <text x="96" y="540" font-size="30">github.com/arthurfiorette${SEPARATOR}linkedin.com/in/arthurfiorette</text>
  <text x="1104" y="120" font-size="24" text-anchor="end" style="fill: #888">${escapeXml(cv.month)}</text>
</svg>`;

  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
