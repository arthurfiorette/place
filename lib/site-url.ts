import { BASE_URL } from './env';

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
