const { Namer } = require('@parcel/plugin');

// This namer is just to avoid having all posts being generated with the same
// [post] name and overwriting each other
module.exports = new Namer({
  name: ({ bundle }) => {
    const entry = bundle.getMainEntry();

    // Property defined by our transformer
    if (entry.meta.pathName) {
      return entry.meta.pathName;
    }
  }
});
