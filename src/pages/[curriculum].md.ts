import type { CollectionEntry } from 'astro:content';
import type { APIRoute } from 'astro';
import { md } from 'astro-slop';

export { getStaticPaths } from './[curriculum].astro';

// Fields keep their inline HTML (<b>, <a>); it is valid markdown and LLMs read it fine.
export const GET: APIRoute<CollectionEntry<'curriculum'>> = ({ props: { data: cv } }) => md`---
title: ${JSON.stringify(`${cv.name} - ${cv.title}`)}
description: ${JSON.stringify(`Curriculum of ${cv.name}, ${cv.title}.`)}
---

# ${cv.name}

${cv.title}. ${cv.email} | https://arthur.place | https://linkedin.com/in/arthurfiorette

${cv.month}

${cv.about.join('\n\n')}

## ${cv.educationName}

${cv.education.map((e) => `- ${e.date}: ${e.title}, ${e.institution}`)}

## ${cv.experienceName}

${cv.experiences.map((e) => `### ${e.title}\n\n${e.start} - ${e.end} (${e.type})\n\n${e.about.join('\n\n')}\n`)}

## ${cv.ossTitle}

${cv.oss.join('\n\n')}
`;
