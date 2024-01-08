import { request } from 'undici';

export async function getNpmDownloadCount(pkg: string | string[]) {
  const results = Array.isArray(pkg)
    ? await Promise.all(pkg.map(requestDownloadCount))
    : [await requestDownloadCount(pkg)];

  let total = 0;

  for (const result of results) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const data = (await result.body.json()) as any;

    if ('timeout' in result) {
      console.log(`Npm request timeout out: ${data.pkg}`);
      continue;
    }

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

function requestDownloadCount(pkg: string) {
  return request(`https://api.npmjs.org/downloads/range/last-week/${pkg}`, {
    headersTimeout: 1000
  });
}
