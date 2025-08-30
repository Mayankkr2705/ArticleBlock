import { z } from 'zod';

export const createCommentSchema = z.object({
  articleId: z.string().min(1),
  content: z.string().min(1).max(2000),
  parentId: z.string().optional(),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1).max(2000),
});
