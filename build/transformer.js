const { Transformer } = require('@parcel/plugin');
const path = require('path');
const vm = require('vm');
const m = require('module');
const crypto = require('crypto');

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
        paths.map(async (path) => {
          const content = await page.default({ path });

          return {
            type: 'html',
            content,
            uniqueKey: crypto.createHash('md5').update(content).digest('hex'),
            bundleBehavior: 'isolated',
            id: crypto.createHash('md5').update(content).digest('hex'),
            isSource: true,
            meta: { pathName: `${path}.html` },
          };
        })
      );
    }

    const content = await page.default();

    asset.type = 'html';
    asset.setCode(content);
    asset.uniqueKey = asset.filePath;
    asset.bundleBehavior = 'isolated';
    asset.id = crypto.createHash('md5').update(content).digest('hex');
    asset.isSource = true;

    return [asset];
  }
});
