import Html from '@kitajs/html';
import { getStargazerCount } from '../lib/github';
import { getNpmDownloadCount } from '../lib/npm';

export interface ProjectStarsProps {
  repoName: string;
  repoOwner?: string;
  npmName?: string | string[];
}

export async function ProjectStars({
  repoName,
  npmName,
  repoOwner = 'arthurfiorette'
}: ProjectStarsProps) {
  const [starCount, npmCount] = await Promise.all([
    getStargazerCount({ name: repoName, owner: repoOwner }),
    npmName ? getNpmDownloadCount(npmName) : null
  ]);

  return (
    <small class="project-stars__card">
      {npmCount &&
        ((
          <>
            📥{(npmCount / 1000).toFixed(1) as 'safe'}k/week
            <span style={{ display: 'inline-block', width: '1rem' }} />
          </>
        ) as 'safe')}{' '}
      {starCount.repository?.stargazerCount} ⭐
    </small>
  );
}
