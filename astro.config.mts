import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import critters from "astro-critters";

export default defineConfig({
  integrations: [mdx(), svelte(), sitemap(), critters()]
});