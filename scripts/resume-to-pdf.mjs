import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
app.use(express.static(path.join('dist')));

const server = app.listen();

const address = server.address();
const baseUrl = typeof address === 'object' ? `http://localhost:${address.port}` : address;

console.log(baseUrl);

const FILENAMES = ['curriculo', 'curriculum'];

const browser = await puppeteer.launch({
  headless: 'new'
});

async function generatePDF(url, outputPath) {
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle0'
  });

  await page.pdf({ path: outputPath, format: 'A4', tagged: true, scale: 0.75 });
}

await Promise.all(
  FILENAMES.map((name) => generatePDF(`${baseUrl}/${name}.html`, `dist/${name}.pdf`))
);

await browser.close();
server.close();
