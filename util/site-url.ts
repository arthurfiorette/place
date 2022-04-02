const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SITE_URL || '/'
    : 'http://localhost:4000/';

/**
 * **Supports multiple sites**
 *
 * @example
 *
 * ```js
 * buildUrl('/url/test')
 * // https://arthur.place/url/test
 *
 * buildUrl('https://google.com/test')
 * // https://google.com/test
 * ```
 */
export function buildUrl(pathsOrUrl = '') {
  return new URL(pathsOrUrl, BASE_URL);
}
