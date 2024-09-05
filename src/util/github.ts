import { graphql } from '@octokit/graphql';

const STARGAZER_COUNT_GQL = /* gql */ `

query getStargazerCount($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    stargazerCount
  }
}

`;

// @ts-expect-error - global untyped cache
const cache: Record<string, any> = globalThis.gqlCache || (globalThis.gqlCache = {});

export function getStargazerCount(props: {
  name: string;
  owner: string;
}): Promise<number> {
  if (cache[props.name]) {
    return cache[props.name];
  }

  console.log(`Requesting ${props.owner}/${props.name} repository data`);

  return graphql<any>(STARGAZER_COUNT_GQL, {
    ...props,
    headers: { authorization: `token ${import.meta.env.GH_TOKEN}` }
  })
    .then((res) => (cache[props.name] = res?.repository?.stargazerCount || 0))
    .catch(() => 0);
}
