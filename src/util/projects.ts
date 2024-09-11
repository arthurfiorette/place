import { type CollectionEntry, getCollection } from 'astro:content';
import { getStargazerCount } from './github';
import { getNpmDownloadCount } from './npm';

function ossProjectSorter(
  a: CollectionEntry<'projects'>['data'],
  b: CollectionEntry<'projects'>['data']
) {
  return b.stars * (1000 / 2.1) + b.downloads - (a.stars * (1000 / 2.1) + a.downloads);
}

export async function loadProjects() {
  const collection = await getCollection('projects');

  await Promise.all(
    collection.flatMap((project) => [
      getNpmDownloadCount(project.data.npm).then(
        (downloads) => (project.data.downloads = downloads)
      ),
      getStargazerCount({ owner: project.data.owner, name: project.data.name }).then(
        (stars) => (project.data.stars = stars)
      )
    ])
  );

  return collection.map((project) => project.data).sort(ossProjectSorter);
}
