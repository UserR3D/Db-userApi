import { z } from 'zod';
const enumRole = ['USER', 'ADMIN'] as const;

export const postUser = z.object({
  email: z.string(),
  password: z.string(),
  role: z.optional(z.enum(enumRole)),
});
