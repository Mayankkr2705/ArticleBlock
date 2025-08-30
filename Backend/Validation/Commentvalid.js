const { z } = require('zod');

const createCommentSchema = z.object({
  articleId: z.string().min(1),
  content: z.string().min(1).max(2000),
  parentId: z.string().optional(),
});

const updateCommentSchema = z.object({
  content: z.string().min(1).max(2000),
});

module.exports = { createCommentSchema, updateCommentSchema };
