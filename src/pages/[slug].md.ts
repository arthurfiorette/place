import type { CollectionEntry } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { cleanMdx, md } from 'astro-slop';
import { posts } from '../util/posts/get-posts';

// Uses the listed posts instead of re-exporting [slug].astro's paths, which
// also build drafts. Anything emitted here ends up in /llms.txt.
export const getStaticPaths = (() =>
  posts.map((post) => ({ params: { slug: post.id }, props: { post } }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ post: CollectionEntry<'blog'> }> = ({ props: { post } }) => md`---
title: ${JSON.stringify(post.data.title)}
description: ${JSON.stringify(post.data.description)}
date: ${post.data.date.toISOString().slice(0, 10)}
url: https://arthur.place/${post.id}
---

# ${post.data.title}

${cleanMdx(post.body ?? '')}`;
