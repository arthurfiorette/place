import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),

  schema: ({ image }) => {
    // Public and remote URLs still work; relative paths use Astro's asset pipeline.
    const imageSource = z.union([
      z.string().refine((src) => src.startsWith('/') || /^https?:\/\//.test(src)),
      image()
    ]);
    return z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      keywords: z.array(z.string()),
      image: z
        .union([
          // Normalize legacy image paths so renderers only handle one shape.
          imageSource.transform((src) => ({
            src,
            alt: undefined,
            description: undefined
          })),
          z.object({
            src: imageSource,
            alt: z.string(),
            description: z.string().optional()
          })
        ])
        .optional(),
      published: z.union([z.boolean(), z.literal('preview')]).default(false)
    });
  }
});

// I know this is exactly what i18n should be used for, but I will not implement i18n for a single route,
// so I will just use a different collection for each language
const curriculum = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/curriculum' }),

  schema: z.object({
    id: z.string(),
    lang: z.string(),
    month: z.string(),
    name: z.string(),
    title: z.string(),
    email: z.string(),
    about: z.array(z.string()),
    educationName: z.string(),
    education: z.array(
      z.object({
        date: z.string(),
        title: z.string(),
        institution: z.string()
      })
    ),
    experienceName: z.string(),
    experienceNote: z.string(),
    experiences: z.array(
      z.object({
        title: z.string(),
        start: z.string(),
        end: z.string(),
        about: z.array(z.string())
      })
    ),
    ossTitle: z.string(),
    oss: z.array(z.string()),
    talksName: z.string(),
    talks: z.array(z.string())
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),

  schema: z.object({
    name: z.string(),
    prettyName: z.string(),
    npm: z.array(z.string()),
    owner: z.string(),
    description: z.string(),
    stars: z.number().default(0),
    downloads: z.number().default(0)
  })
});

export const collections = { blog, curriculum, projects };
