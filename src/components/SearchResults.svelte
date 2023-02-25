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
        overflow: hidden;

        border-radius: 16px;

        background: rgba(var(--c-background-rgb), 0.7);
        box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(var(--c-text-rgb), 0.15);
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

        color: var(--c-text);
        
        text-decoration: none;
        transition: opacity 0.2s ease-out;

        padding: 9px;
    }

    .search-entry:hover {
        opacity: 0.7;
    }

    .search-entry h1 {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--c-text);

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .search-entry aside {
        color: var(--c-text);
        font-size: 0.85rem;
        font-weight: 300;
    }
</style>
