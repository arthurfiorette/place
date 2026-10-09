export async function getNpmDownloadCount(pkg: string | string[]) {
  const results = Array.isArray(pkg)
    ? await Promise.all(pkg.map(requestDownloadCount))
    : [await requestDownloadCount(pkg)];

  let total = 0;

  for (const data of results) {
    if (Array.isArray(data.downloads)) {
      for (const day of data.downloads) {
        total += day.downloads;
      }
    } else {
      total += data.downloads;
    }
  }

  return total;
}

declare global {
  var npmCache: Record<string, any>;
}

globalThis.npmCache ??= {};

function requestDownloadCount(pkg: string) {
  if (globalThis.npmCache[pkg]) {
    return globalThis.npmCache[pkg];
  }

  console.log(`Requesting ${pkg} data.`);

  // Download counts are cosmetic, so a slow npm API must not stall the build.
  return fetch(`https://api.npmjs.org/downloads/range/last-week/${pkg}`, {
    signal: AbortSignal.timeout(1000)
  })
    .then((res) => (globalThis.npmCache[pkg] = res.json()))
    .catch(() => 0);
}
