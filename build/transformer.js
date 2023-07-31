const { Transformer } = require('@parcel/plugin');
const path = require('path');
const vm = require('vm');
const m = require('module');

module.exports = new Transformer({
  transform: async ({ asset }) => {
    const page = vm.runInNewContext(
      `require('dotenv/config'), require('ts-node').register(tsn), require(filePath)`,
      {
        require: m.createRequire(asset.filePath),
        filePath: asset.filePath,
        tsn: {
          transpileOnly: true,
          project: path.resolve(process.cwd(), 'tsconfig.json')
        }
      }
    );

    // In case of static paths, we need to generate all the pages
    // We are using a custom `pathName` property to tell our namer
    // to generate different names for each page
    if (page.getStaticPaths) {
      const paths = await page.getStaticPaths();

      return Promise.all(
        paths.map(async (path) => ({
          type: 'html',
          content: await page.default({ path }),
          uniqueKey: path,
          bundleBehavior: 'isolated',
          isSource: true,
          meta: { pathName: `${path}.html` }
        }))
      );
    }

    asset.type = 'html';
    asset.setCode(await page.default());

    return [asset];
  }
});
