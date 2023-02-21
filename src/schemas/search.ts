import { z } from 'zod';

export const searchIndexSchema = z.object({
    title: z.string(),
    titleWords: z.array(z.string()),
    publishedAt: z.string().datetime(),
    tags: z.array(z.string()),
    authorName: z.string(),
    url: z.string()
});

export type ArticleSearchIndex = z.infer<typeof searchIndexSchema>;