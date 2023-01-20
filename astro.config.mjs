import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import critters from "astro-critters";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), svelte(), sitemap(), critters()]
});