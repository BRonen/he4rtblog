import { defineCollection } from 'astro:content';
import { articleSchema } from '../schemas/article';

const blogCollection = defineCollection({
  schema: articleSchema
});

export const collections = {
  'article': blogCollection,
};