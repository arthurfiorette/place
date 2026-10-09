import path from 'node:path';
import express from 'express';
import { chromium } from 'playwright';

const app = express();
app.use(express.static(path.join('dist')));

const server = app.listen();

const address = server.address();
const baseUrl =
  typeof address === 'object' ? `http://localhost:${address.port}` : address;

console.log(baseUrl);

const FILENAMES = ['curriculo', 'curriculum'];

// page.pdf() is chromium-only. Playwright already runs chromium without its
// sandbox on Linux, so the old --no-sandbox args are not needed.
await using browser = await chromium.launch();

async function generatePDF(url, outputPath) {
  await using page = await browser.newPage();

  await page.emulateMedia({ media: 'print' });
  await page.goto(url, { waitUntil: 'networkidle' });
  // Printing must wait for the same local font used by the browser layout.
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: outputPath, preferCSSPageSize: true, tagged: true });
  console.log(`Generated PDF: ${outputPath}`);
}

await Promise.all(
  FILENAMES.map((name) => generatePDF(`${baseUrl}/${name}.html`, `dist/${name}.pdf`))
).finally(() => server.close());
