/* eslint-disable */

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  images: { domains: ['avatars.githubusercontent.com', 'avatars.dicebear.com'] },

  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    const { REDIRECT_MAP } = process.env;

    if (!REDIRECT_MAP) {
      return [];
    }

    /** @type {import('next/dist/lib/load-custom-routes').Redirect[]} */
    const redirects = [];

    for (const redirect of REDIRECT_MAP.split(',')) {
      const [from, to] = redirect.split('=');
      redirects.push({
        source: `/r/${from}`,
        destination: to,
        statusCode: 307 // temporary redirect
      });
    }

    return redirects;
  }
};
