import type { APIRoute } from 'astro';
import { md } from 'astro-slop';
import { SocialMediaLinks } from '../util/link/social-media';
import { sortedPosts } from '../util/posts/get-posts';
import { intro, projects } from './index.astro';

export const GET: APIRoute = () => md`---
title: Arthur Fiorette
description: Software engineer from Brazil building open source TypeScript tools.
---

# Arthur Fiorette

${intro.join('\n\n')}

## Links

${SocialMediaLinks.map((link) => `- ${md.link(link.label, link.href)}`)}

## Open source projects

${projects.map(
  (project) =>
    // A failed GitHub fetch yields 0; omit it rather than state a wrong count.
    `- ${md.link(project.prettyName, `https://github.com/${project.owner}/${project.name}`)}: ${project.description}${project.stars ? ` (${project.stars} GitHub stars)` : ''}`
)}

## Posts

${sortedPosts.map((post) => `- ${md.link(post.data.title, `/${post.id}.md`)}: ${post.data.description}`)}

## Curriculum

- ${md.link('Curriculum (English)', '/curriculum.md')}
- ${md.link('Currículo (Português)', '/curriculo.md')}
`;
