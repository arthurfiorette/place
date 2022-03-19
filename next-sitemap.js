/* eslint-disable @typescript-eslint/no-var-requires */

const { accessSync } = require('fs');
const { lstat } = require('fs/promises');
const path = require('path');

const POSTS_REGEX = /^\/posts\/(.+)$/gm;

/** @param {string} url */
function findFile(url) {
  const isPostUrl = url.match(POSTS_REGEX);

  // Posts
  if (isPostUrl) {
    return path.resolve(__dirname, '.' + isPostUrl[0] + '.md');
  }

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

      // 1 For the index, 0.8 for all posts and 0.5 for everything else
      priority: loc === '/' ? 1 : loc.match(POSTS_REGEX) ? 0.8 : 0.5
    };
  }
};
