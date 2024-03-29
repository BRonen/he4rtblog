import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import critters from "astro-critters";
import searchIndexes from './src/integrations/searchIndexes/searchIndexes';
import remarkUnwrapImages from 'remark-unwrap-images';

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
    remarkPlugins: [remarkUnwrapImages]
  },
  integrations: [mdx(), svelte(), sitemap(), critters(), searchIndexes()]
});