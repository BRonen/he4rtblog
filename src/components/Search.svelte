<script lang="ts">
    import SearchInput from "./SearchInput.svelte";
    import SearchResults from "./SearchResults.svelte";
    import type { ArticleSearchIndex } from "../schemas/search";
    import { fade } from "svelte/transition";
    import { cubicIn } from "svelte/easing";

    let abortController: AbortController;
    let debounceID: ReturnType<typeof setTimeout>;
    let isFocused: boolean;
    let searching: boolean;
    let searchInput: string;
    let searchResults: ArticleSearchIndex[] = [];
    let notFoundAnimation: () => {};
    let resultsFoundAnimation: () => {};

    async function search() {
        abortController = new AbortController();

        const response = await fetch("/api/search", {
            method: "POST",
            body: JSON.stringify({
                query: searchInput,
            }),
            signal: abortController.signal,
        }).catch((err) => console.error(err.message));

        if (!response?.ok) {
            return;
        }

        searching = false;
        searchResults = await response.json();
        searchResults.length === 0
            ? notFoundAnimation()
            : resultsFoundAnimation();
    }

    function debouncedSearch() {
        if (searchInput?.length === 0) {
            searchResults = [];
            return;
        }

        searching = true;
        abortController?.abort();

        clearTimeout(debounceID);
        debounceID = setTimeout(search, 500);
    };
</script>

<form class="wrapper" role="search">
    <SearchInput
        searchAnimation={searching}
        bind:notFoundAnimation
        bind:resultsFoundAnimation
        bind:searchInput
        bind:isFocused
        on:input={debouncedSearch}
    />

    <div class="results-wrapper">
        {#if searchResults.length > 0 && searchInput.length > 0 && isFocused}
            <div
                in:fade={{ duration: 300 }}
                out:fade={{ duration: 500, easing: cubicIn }}
                class="results-container"
            >
                <SearchResults searchAnimation={searching} {searchResults} />
            </div>
        {/if}
    </div>
</form>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 310px;
    }

    .results-wrapper {
        position: relative;
    }

    .results-container {
        margin-top: 12px;
        width: 100%;
        position: absolute;
    }
</style>