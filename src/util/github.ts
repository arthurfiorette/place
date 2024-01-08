import { graphql } from '@octokit/graphql';

const STARGAZER_COUNT_GQL = /** graphql */ `

query getStargazerCount($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    stargazerCount
  }
}

`;

export function getStargazerCount(props: { name: string; owner: string }) {
  return graphql(STARGAZER_COUNT_GQL, {
    ...props,
    headers: { authorization: `token ${import.meta.env.GH_TOKEN}` }
  });
}
