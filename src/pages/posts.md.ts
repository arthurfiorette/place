import type { APIRoute } from 'astro';
import { md } from 'astro-slop';
import { sortedPosts } from '../util/posts/get-posts';

export const GET: APIRoute = () => md`---
title: Posts
description: Backend engineering notes about TypeScript, architecture and open source.
---

# Posts

${sortedPosts.map(
  (post) =>
    `- ${md.link(post.data.title, `/${post.id}.md`)} (${post.data.date.toISOString().slice(0, 10)}): ${post.data.description}`
)}
`;
