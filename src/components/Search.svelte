<script lang="ts">
  export let posts: Post[];

  let postsFiltered: Post[];

  interface Post {
    url: string
    frontmatter: {
      title: string
    }
  }

  let searchValue: string = "";

  $: {
    postsFiltered = searchValue? posts.filter((post) =>
      post.frontmatter.title.includes(searchValue)
    ) : [];

    posts.forEach(post => {
      if(post.frontmatter.title === searchValue)
        location.pathname = post.url;
    });
  };
</script>

<div class="header-search">
  <button class="header-icon-search">
    <img src="/search-icon.svg" alt="Icone de pesquisa" />
  </button>
  <div>
    <input
      bind:value={searchValue}
      name="search"
      type="search"
      class="header-input-search"
    />
    <div class="header-results-search">
      {#each postsFiltered as post}
        <a href={post.url} class="header-result-search">{post.frontmatter.title}</a>
      {/each}
      {#if !postsFiltered.length && searchValue}
        <p class="header-error-search">Nenhum post encontrado.</p>
      {/if}
      </div>
  </div>
</div>

<style>
  .header-search {
    display: flex;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    height: fit-content;
  }

  .header-icon-search {
    border: none;
    background: none;
    cursor: pointer;
    width: 20px;
    height: 31px;
    border-bottom: 2px solid var(--c-primary);
  }

  .header-input-search {
    background-color: transparent;
    color: var(--c-light-background);
    font-size: 1.2rem;
    width: 300px;
    height: 30px;
    padding-left: 20px;
    padding: 5px;
    border: none;
    border-bottom: 2px solid var(--c-primary);
  }

  .header-results-search {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 300px;
    top: calc(33px + 4rem);
    background-color: black;
    overflow: scroll;
    max-height: 200px;
  }

  .header-result-search {
    margin: 0.05rem 0;
    padding: 0.3rem 0.5rem;
    background-color: var(--c-light-background);
    color: black;
  }

  .header-error-search {
    margin: 0.05rem 0;
    padding: 0.3rem 0.5rem;
    background-color: var(--c-light-background);
    color: red;
  }
</style>
