import { z } from "astro:content";
import { imageSchema } from "./image";

export const authorSchema = z.object({
  name: z.string().max(25, { message: 'O nome do autor deve ter no máximo 25 caracteres' }),
  avatar: imageSchema.optional(),
  socials: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().startsWith('https://').optional()
  }).optional()
});