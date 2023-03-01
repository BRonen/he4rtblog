import { Miniflare } from "miniflare";

export const miniflare = new Miniflare({
    kvNamespaces: ['HE4RT_SEARCH_INDEXES'],
    //O diretório abaixo é o mesmo utilizado pelo wrangler para a persistência do KV local
    //Isso é necessário para que essa instância do Miniflare e as functions utilizem os mesmos dados ao desenvolver localmente
    kvPersist: './.wrangler/state/kv',
    script: `
        addEventListener("fetch", (event) => {
            event.respondWith(new Response(event.request.headers.get("X-Message")));
        });
    `
});