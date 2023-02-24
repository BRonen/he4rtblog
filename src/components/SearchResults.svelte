<script lang="ts">
    import type { ArticleSearchIndex } from "../schemas/search";
    export let searchResults: ArticleSearchIndex[];
    export let searchAnimation: boolean = false;
</script>

<div class="animation-wrapper" class:searchAnimation>
    <div class="search-results">
        {#each searchResults as searchEntry}
            <a
                class="search-entry"
                href={`/article/${searchEntry.url}`}
                title={searchEntry.title}
            >
                <h1>{searchEntry.title}</h1>
                <aside>{searchEntry.authorName} · 18/02/2023</aside>
            </a>
        {/each}
    </div>
</div>

<style>
    .search-results {
        display: flex;
        flex-direction: column;

        box-sizing: border-box;

        border-radius: 10px;

        background: rgba(0, 0, 0, 0.7);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(61, 61, 61, 0.6);
    }

    .animation-wrapper {
        transition: scale 0.45s cubic-bezier(.13,.68,.51,1.54);
        transform: translateZ(0);
        backface-visibility: hidden;
        will-change: scale;
    }

    .searchAnimation {
        scale: 0.97;
    }

    .search-entry {
        display: flex;
        flex-direction: column;

        text-decoration: none;
        color: var(--c-dark-text);

        transition: opacity 0.2s ease-out;

        padding: 9px;
    }

    .search-entry:hover {
        opacity: 0.7;
    }

    .search-entry h1 {
        font-size: 1.1rem;
        font-weight: 500;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .search-entry aside {
        font-size: 0.85rem;
        font-weight: 300;
    }
</style>
