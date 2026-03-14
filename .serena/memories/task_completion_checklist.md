After code/content changes:
1) Run pnpm lint (or pnpm lint:fix then pnpm lint).
2) Run pnpm build to verify Astro build and PDF generation still work.
3) Spot-check key routes locally: /, /posts, /curriculum, one post.
4) If content changed, verify RSS and sitemap generation still succeed.