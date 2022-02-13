/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://arthur.plce/',
  generateRobotsTxt: true,
  exclude: ['/404', '/500'],
  priority: 1.0
};
