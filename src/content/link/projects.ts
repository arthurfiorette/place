export interface OssProject {
  name: string;
  prettyName: string;
  npm: string[];
  owner: string;
  description: string;
  stars: number;
  downloads: number;
}

export const OssProjects: OssProject[] = [
  {
    name: "axios-cache-interceptor",
    prettyName: "Axios Cache Interceptor",
    npm: ["axios-cache-interceptor"],
    owner: "arthurfiorette",
    description: "Small and efficient cache interceptor for axios.",
    stars: 1,
    downloads: 1,
  },
  {
    name: "prisma-json-types-generator",
    prettyName: "Prisma Json Types Generator",
    npm: ["prisma-json-types-generator"],
    owner: "arthurfiorette",
    description: "Type safe Postgres Json for prisma schemas.",
    stars: 1,
    downloads: 1,
  },
  {
    name: "kitajs",
    prettyName: "Kita",
    npm: [
      "@kitajs/cli",
      "@kitajs/parser",
      "@kitajs/ts-plugin",
      "@kitajs/generator",
      "@kitajs/common",
      "@kitajs/runtime",
    ],
    owner: "kitajs",
    description: "Revolutionary type safe router for javascript backends.",
    stars: 1,
    downloads: 1,
  },
  {
    name: "html",
    prettyName: "Kita/Html",
    npm: [
      "@kitajs/html",
      "@kitajs/ts-html-plugin",
      "@kitajs/fastify-html-plugin",
    ],
    owner: "kitajs",
    description: "The fastest JSX runtime to generate HTML strings.",
    stars: 1,
    downloads: 1,
  },
  {
    name: "tinylibs",
    prettyName: "TinyLibs",
    npm: ["fast-defer", "object-code", "cache-parser"],
    owner: "arthurfiorette",
    description: "Collection of Utility Libraries for javascript.",
    stars: 1,
    downloads: 1,
  },
  {
    name: "proposal-safe-assignment-operator",
    prettyName: "ECMAScript Safe Assignment Operator Proposal",
    npm: [],
    owner: "arthurfiorette",
    description: "A new JS proposal to add a ?= operator for safe assignment.",
    stars: 1,
    downloads: 1,
  },
];

export function ossProjectSorter(a: OssProject, b: OssProject) {
  return (
    b.stars * (1000 / 2.1) +
    b.downloads -
    (a.stars * (1000 / 2.1) + a.downloads)
  );
}
