import { graphql } from '@octokit/graphql';
import { GH_TOKEN } from '../env';
import {
  GetDiscussionQuery,
  GetDiscussionQueryVariables,
  GetStargazerCountQuery,
  GetStargazerCountQueryVariables
} from './types';
import { readGql } from './util';

const DISCUSSION_GQL = readGql('discussion');
const STARGAZER_COUNT_GQL = readGql('stargazer-count');

export function getDiscussion(props: GetDiscussionQueryVariables) {
  return graphql<GetDiscussionQuery>(DISCUSSION_GQL, {
    ...props,
    headers: { authorization: `token ${GH_TOKEN}` }
  });
}

export function getStargazerCount(props: GetStargazerCountQueryVariables) {
  return graphql<GetStargazerCountQuery>(STARGAZER_COUNT_GQL, {
    ...props,
    headers: { authorization: `token ${GH_TOKEN}` }
  });
}
