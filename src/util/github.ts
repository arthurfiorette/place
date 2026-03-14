import { graphql } from '@octokit/graphql';

const STARGAZER_COUNT_GQL = /* gql */ `

query getStargazerCount($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    stargazerCount
  }
}

`;

declare global {
  var gqlCache: Record<string, any>;
}

export async function getStargazerCount(props: { name: string; owner: string }): Promise<number> {
  if (globalThis.gqlCache[props.name]) {
    return globalThis.gqlCache[props.name];
  }

  console.log(`Requesting ${props.owner}/${props.name} repository data`);

  return graphql<any>(STARGAZER_COUNT_GQL, {
    ...props,
    headers: { authorization: `token ${import.meta.env.GH_TOKEN}` }
  })
    .then((res) => (globalThis.gqlCache[props.name] = res?.repository?.stargazerCount || 0))
    .catch(() => 0);
}
