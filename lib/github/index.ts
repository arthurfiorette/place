import { graphql } from '@octokit/graphql';
import fs from 'fs';
import path from 'path';
import { GH_TOKEN } from '../env';
import { GetDiscussionQuery } from './types';

const DISCUSSION_GQL = fs.readFileSync(
  path.resolve(__dirname, '../../graphql/discussion.gql'),
  'utf8'
);

export function getDiscussion(
  name: string,
  discussion: number,
  comments?: number,
  replies?: number
) {
  return graphql<GetDiscussionQuery>(DISCUSSION_GQL, {
    name,
    comments,
    replies,
    discussion,
    headers: {
      authorization: `token ${GH_TOKEN}`
    }
  });
}
