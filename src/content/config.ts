import { defineCollection } from 'astro:content';
import { articleSchema } from './schemas/_article';

const blogCollection = defineCollection({
  schema: articleSchema
});

export const collections = {
  'article': blogCollection,
};