import type { AstroIntegration } from "astro";
import { z } from 'zod';
import { miniflare } from "./miniflare";
import { ArticleSearchIndex, searchIndexSchema } from "../../schemas/search";
import type { CollectionEntry } from "astro:content";

export default (): AstroIntegration => {
    return {
        name: 'searchIndexes',
        hooks: {
            "astro:build:done": async () => {
                if (process.env.CF_PAGES) {
                    await updateRemoteIndexes();
                }
            }
        }
    }
}

export async function writeLocalIndexes(articleEntries: CollectionEntry<'article'>[]) {
    let searchIndexes: ArticleSearchIndex[] = z.array(searchIndexSchema).parse(
        articleEntries.map((article) => {
            return {
                title: article.data.title,
                titleWords: article.data.title.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' '),
                publishedAt: article.data.publishedAt.toISOString(),
                tags: article.data.tags,
                authorName: article.data.author.name,
                url: article.slug,
            };
        })
    );

    const kvNamespace = await miniflare.getKVNamespace('HE4RT_SEARCH_INDEXES');
    await kvNamespace.put('posts', JSON.stringify(searchIndexes));
}

async function updateRemoteIndexes() {
    const kvNamespace = await miniflare.getKVNamespace('HE4RT_SEARCH_INDEXES');
    const kvData = JSON.parse(await kvNamespace.get('posts') ?? "[]");
    const searchIndexes: ArticleSearchIndex[] = z.array(searchIndexSchema).parse(kvData);
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_IDENTIFIER}/storage/kv/namespaces/${process.env.CF_KV_NAMESPACE_ID}/values/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.CF_KV_BEARER_TOKEN}`
        },
        body: JSON.stringify(searchIndexes)
    });

    if (!response.ok) {
        throw new Error(`Request to update remove KV failed with the message: ${response.status} ${response.statusText}`);
    }
}