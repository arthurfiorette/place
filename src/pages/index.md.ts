import type { APIRoute } from 'astro';
import { md } from 'astro-slop';
import { sortedPosts } from '../util/posts/get-posts';
import { history, intro, projects, socialLinks } from './index.astro';

export const GET: APIRoute = () => md`---
title: Arthur Fiorette
description: Senior software developer from Brazil focused on open source and developer tools.
---

# Arthur Fiorette

${intro.join('\n\n')}

## Links

${socialLinks.map((link) => `- ${md.link(link.label, link.href)}`)}

## Open source projects

${projects.map(
  (project) =>
    // A failed GitHub fetch yields 0; omit it rather than state a wrong count.
    `- ${md.link(project.prettyName, `https://github.com/${project.owner}/${project.name}`)}: ${project.description}${project.stars ? ` (${project.stars} GitHub stars)` : ''}`
)}

## Posts

${sortedPosts.map((post) => `- ${md.link(post.data.title, `/${post.id}.md`)}: ${post.data.description}`)}

## A bit of history

${history}

## Curriculum

- ${md.link('Curriculum (English)', '/curriculum.md')}
- ${md.link('Currículo (Português)', '/curriculo.md')}
`;
