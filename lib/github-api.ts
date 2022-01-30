import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

export const getUser = async (username: string) => {
  return await octokit.users.getByUsername({ username });
};

export const getRepos = async (username: string, { per_page = 5, page = 1 }) => {
  return await octokit.search.repos({
    sort: 'stars',
    q: `user:${username}`,
    per_page,
    page
  });
};
