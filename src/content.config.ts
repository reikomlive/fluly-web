import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
  })
});

const communityCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/community" }),
  schema: z.object({
    title: z.string(),
    language: z.string(),
    whatsappLink: z.string().optional(),
    description: z.string().optional(),
  })
});

export const collections = {
  'blog': blogCollection,
  'community': communityCollection,
};
