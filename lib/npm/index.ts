import axios from 'axios';
import { setTimeout } from 'timers/promises';

export async function getNpmDownloadCount(pkg: string | string[]) {
  const results = Array.isArray(pkg)
    ? await Promise.all(pkg.map(requestDownloadCount))
    : [await requestDownloadCount(pkg)];

  let total = 0;

  for (const result of results) {
    if ('timeout' in result) {
      console.log(`Npm request timeout out: ${result.data.pkg}`);
      continue;
    }

    if (Array.isArray(result.data.downloads)) {
      for (const day of result.data.downloads) {
        total += day.downloads;
      }
    } else {
      total += result.data.downloads;
    }
  }

  return total;
}

function requestDownloadCount(pkg: string) {
  return Promise.race([
    axios.get(`https://api.npmjs.org/downloads/range/last-week/${pkg}`),
    setTimeout(1000, { timeout: true, data: { downloads: 0, pkg } })
  ]);
}
