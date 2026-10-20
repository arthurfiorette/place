import { getCollection } from 'astro:content';

const PLACEHOLDER = /\{downloads:([^}]+)\}/g;

// Libraries counted in {downloads:total} that aren't on the projects list.
const EXTRA_PACKAGES = ['try'];

const cache = new Map<string, Promise<number>>();

// Unlike util/npm.ts, failures throw: a CV saying "0 downloads" is worse than a
// failed build, which leaves the previous deploy (and its numbers) live.
function monthlyDownloads(pkg: string) {
  let downloads = cache.get(pkg);

  if (!downloads) {
    downloads = fetchMonthlyDownloads(pkg);
    cache.set(pkg, downloads);
  }

  return downloads;
}

// The npm API rate limits bursts (HTTP 429), and the homepage hits it in the
// same build, so back off a few times before failing the deploy.
async function fetchMonthlyDownloads(pkg: string, attempt = 0): Promise<number> {
  const res = await fetch(`https://api.npmjs.org/downloads/point/last-month/${pkg}`, {
    signal: AbortSignal.timeout(10_000)
  });

  if (res.status === 429 && attempt < 4) {
    const retryAfter = Number(res.headers.get('retry-after')) * 1000;
    await new Promise((resolve) => setTimeout(resolve, retryAfter || 2 ** attempt * 2000));
    return fetchMonthlyDownloads(pkg, attempt + 1);
  }

  if (!res.ok) throw new Error(`npm downloads for ${pkg}: HTTP ${res.status}`);
  return ((await res.json()) as { downloads: number }).downloads;
}

async function totalDownloads() {
  const projects = await getCollection('projects');
  const packages = new Set([...projects.flatMap((project) => project.data.npm), ...EXTRA_PACKAGES]);
  const counts = await Promise.all(Array.from(packages, monthlyDownloads));
  return counts.reduce((sum, count) => sum + count, 0);
}

/**
 * Replaces `{downloads:<package>}` and `{downloads:total}` in every string of the
 * CV with last month's npm downloads, so the numbers follow the daily rebuild.
 */
export async function fillCurriculum<T>(data: T, locale: string): Promise<T> {
  const json = JSON.stringify(data);
  const names = new Set(Array.from(json.matchAll(PLACEHOLDER), (match) => match[1]!));

  const values = new Map(
    await Promise.all(
      Array.from(
        names,
        async (name) =>
          [name, await (name === 'total' ? totalDownloads() : monthlyDownloads(name))] as const
      )
    )
  );

  const format = new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'long',
    maximumFractionDigits: 1
  });

  // Formatted numbers never contain quotes or backslashes, so the JSON stays valid.
  return JSON.parse(
    json.replace(PLACEHOLDER, (_, name: string) => format.format(values.get(name)!))
  );
}
