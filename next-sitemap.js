/* eslint-disable @typescript-eslint/no-var-requires */

const { accessSync } = require('fs');
const { lstat } = require('fs/promises');
const path = require('path');

/** @param {string} url */
function findFile(url) {
  const pagesPath = path.resolve(__dirname, './pages');

  let file = path.resolve(pagesPath, './' + (url === '/' ? 'index' : url) + '.tsx');

  try {
    accessSync(file);

    return file;
  } catch {
    // ignore
  }

  try {
    file = path.resolve(pagesPath, './' + url, 'index.tsx');

    accessSync(file);

    return file;
  } catch {
    // ignore
  }

  try {
    file = path.resolve(__dirname, '.' + url, 'index.tsx');

    accessSync(file);

    return file;
  } catch {
    // ignore
  }

  try {
    // Try with a post
    file = path.resolve(__dirname, './posts/' + url + '.md');

    accessSync(file);

    return file;
  } catch {
    // ignore
  }

  throw new Error(`Could not find file for url: ${url}`);
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://arthur.place/',

  generateRobotsTxt: true,

  exclude: ['/404', '/500'],

  trailingSlash: false,

  transform: async (_, loc) => {
    console.log(loc);

    const urlPath = findFile(loc);
    const { atime } = await lstat(urlPath);

    return {
      loc,

      // The last time the page had it's content changed
      lastmod: atime.toISOString(),

      // 1 For the index and 0.7 for everything else
      priority: loc === '/' ? 1 : 0.7
    };
  }
};
