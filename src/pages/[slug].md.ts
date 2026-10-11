import { getImage } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { cleanMdx, md } from 'astro-slop';
import { posts } from '../util/posts/get-posts';

// Uses the listed posts instead of re-exporting [slug].astro's paths, which
// also build drafts. Anything emitted here ends up in /llms.txt.
export const getStaticPaths = (() =>
  posts.map((post) => ({
    params: { slug: post.id },
    props: { post }
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ post: CollectionEntry<'blog'> }> = async ({
  props: { post },
  site,
  url
}) => {
  const image = post.data.image;
  let imageFrontmatter = '';

  if (image) {
    // Reuse the JPEG social preview (quality 80) instead of generating another asset.
    // Markdown doesn't require JPEG; post pages themselves serve responsive WebP.
    const src =
      typeof image.src === 'string'
        ? image.src
        : (
            await getImage({
              src: image.src,
              width: Math.min(1200, image.src.width),
              format: 'jpeg',
              quality: 80
            })
          ).src;
    // Dev images use a local /_image endpoint; builds use the canonical site URL.
    const imageUrl = new URL(src, import.meta.env.DEV ? url : (site ?? url)).href;
    imageFrontmatter = [
      'image:',
      `  src: ${JSON.stringify(imageUrl)}`,
      `  alt: ${JSON.stringify(image.alt ?? post.data.title)}`,
      ...(image.description !== undefined
        ? [`  description: ${JSON.stringify(image.description)}`]
        : []),
      ''
    ].join('\n');
  }

  return md`---
title: ${JSON.stringify(post.data.title)}
description: ${JSON.stringify(post.data.description)}
date: ${post.data.date.toISOString().slice(0, 10)}
url: https://arthur.place/${post.id}
${imageFrontmatter}---

# ${post.data.title}

${cleanMdx(post.body ?? '')}`;
};
