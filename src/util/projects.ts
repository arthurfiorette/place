import { type CollectionEntry, getCollection } from 'astro:content';
import { getStargazerCount } from './github';
import { getNpmDownloadCount } from './npm';

type ProjectData = CollectionEntry<'projects'>['data'];

function ossProjectSorter(a: ProjectData, b: ProjectData) {
  return b.stars * (1000 / 2.1) + b.downloads - (a.stars * (1000 / 2.1) + a.downloads);
}

export async function loadProjects() {
  const collection = await getCollection('projects');

  const projects = await Promise.all(
    collection.map(async (project) => {
      const [downloads, stars] = await Promise.all([
        getNpmDownloadCount(project.data.npm),
        getStargazerCount({
          owner: project.data.owner,
          name: project.data.name
        })
      ]);

      return { ...project.data, downloads, stars };
    })
  );

  return projects.sort(ossProjectSorter);
}
