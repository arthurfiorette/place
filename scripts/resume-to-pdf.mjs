import fs from 'fs';
import path from 'path';
import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
app.use(express.static(path.join('dist')));

const server = app.listen(18347);
const FILENAMES = ['curriculo', 'curriculum'];

const browser = await puppeteer.launch({
  headless: 'new'
});

async function generatePDF(url, outputPath) {
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle0'
  });

  await page.pdf({ path: outputPath, format: 'A3', tagged: true, scale: 1 });
}

await generatePDF('http://localhost:18347/curriculo', 'dist/curriculo.pdf');
await generatePDF('http://localhost:18347/curriculum', 'dist/curriculum.pdf');

await browser.close();
server.close();
