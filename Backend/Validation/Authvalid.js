import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string().min(2).max(80),     
  email: z.string().email(),
  password: z.string().min(8),
  avatarUrl: z.string().url().optional(),  // optional avatar URL
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
