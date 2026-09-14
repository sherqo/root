import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const journal = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    description: z.string().optional(),
    hidden: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  journal,
};
