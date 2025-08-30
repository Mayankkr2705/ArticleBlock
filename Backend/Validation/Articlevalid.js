import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(3).max(120),
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(), 
  contentHtml: z.string().min(1),
  featuredImage: z.string().optional(), 
  status: z.enum(['draft','published']).default('draft'),
});

export const updateArticleSchema = createArticleSchema.partial();
