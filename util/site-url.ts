/**
 * @see https://github.com/iamsainikhil/nextjs-prismic-blog-starter/blob/645c391ccb5c259a84db151f14cba4e780d5df18/utils/siteUrl.js#L1
 */
export function getSiteUrl(paths = '') {
  return `${
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SITE_URL || '/'
      : 'http://localhost:4000/'
  }${paths}`;
}
