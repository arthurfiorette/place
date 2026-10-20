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
  <!-- Cut-out photo bleeds off the right edge. The shoulders widen toward the
       bottom, so lines below the title must stay short (contacts get one line each). -->
  <image href="/images/arthur.webp" x="660" y="0" width="669" height="630" />
  <text x="96" y="96" font-size="28">arthur.place/${escapeXml(cv.id)}</text>
  <text x="96" y="250" font-size="84" font-weight="600" letter-spacing="-1.5" style="fill: #171717">${escapeXml(cv.name)}</text>
  <text x="96" y="315" font-size="44">${escapeXml(cv.title)}</text>
  <line x1="96" y1="370" x2="600" y2="370" stroke="#e5e5e5" stroke-width="2" />
  <text x="96" y="430" font-size="30">${escapeXml(cv.email)}${SEPARATOR}arthur.place</text>
  <text x="96" y="472" font-size="30">github.com/arthurfiorette</text>
  <text x="96" y="514" font-size="30">linkedin.com/in/arthurfiorette</text>
  <text x="96" y="580" font-size="22" style="fill: #888">${escapeXml(cv.month)}</text>
</svg>`;

  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
