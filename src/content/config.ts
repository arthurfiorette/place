import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',

  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    keywords: z.array(z.string()),
    image: z.string().optional(),
    published: z.union([z.boolean(), z.literal('preview')]).default(false)
  })
});

// I know this is exactly what i18n should be used for, but I will not implement i18n for a single route,
// so I will just use a different collection for each language
const curriculum = defineCollection({
  type: 'data',

  schema: z.object({
    id: z.string(),
    lang: z.string(),
    month: z.string(),
    name: z.string(),
    title: z.string(),
    phone: z.string(),
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
    experiences: z.array(
      z.object({
        title: z.string(),
        start: z.string(),
        end: z.string(),
        type: z.string(),
        about: z.array(z.string())
      })
    ),
    ossTitle: z.string(),
    oss: z.array(z.string())
  })
});

const projects = defineCollection({
  type: 'data',

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
