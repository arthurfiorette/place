import path from 'node:path';
import express from 'express';
import { chromium } from 'playwright';

const app = express();
app.use(express.static(path.join('dist')));

const server = app.listen();

const address = server.address();
const baseUrl = typeof address === 'object' ? `http://localhost:${address.port}` : address;

console.log(baseUrl);

const FILENAMES = ['curriculo', 'curriculum'];

// page.pdf() is chromium-only. Playwright already runs chromium without its
// sandbox on Linux, so the old --no-sandbox args are not needed.
const browser = await chromium.launch();

async function generatePDF(url, outputPath) {
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle'
  });

  await page.pdf({ path: outputPath, format: 'A4', tagged: true, scale: 0.75 });
}

await Promise.all(
  FILENAMES.map((name) => generatePDF(`${baseUrl}/${name}.html`, `dist/${name}.pdf`))
);

await browser.close();
server.close();
