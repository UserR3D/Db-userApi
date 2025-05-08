import { $Enums, Prisma } from '@prisma/client';
import { z } from 'zod';

export const postUser = z.object({
  email: z.string(),
  password: z.string(),
  role: z.optional(z.nativeEnum($Enums.Role)),
});

export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const postDbSchema = z.object({
  title: z.string(),
  content: z.optional(z.string()),
  published: z.boolean(),
});
