<script lang="ts">
  let searchValue: any = "";

  export let posts: any[];

  let postsFiltered: any[];

  $: {
    postsFiltered = posts.filter((post) =>
      post.frontmatter.title.includes(searchValue)
    );

    posts.forEach(post => {
      if(post.frontmatter.title === searchValue)
        location.pathname = post.url;
    })
  };
</script>

<div class="header-search">
  <button class="header-icon-search">
    <img src="/search-icon.svg" alt="Icone de pesquisa" />
  </button>
  <div>
    <input
      bind:value={searchValue}
      list="posts-hints"
      name="search"
      type="search"
      class="header-input-search"
    />
    {#if !postsFiltered.length}
      <p class="header-error-search">Nenhum post encontrado.</p>
    {/if}
  </div>
</div>

<datalist id="posts-hints">
  {#each posts as post}
    <option value={post.frontmatter.title}>{post.frontmatter.title}</option>
  {/each}
</datalist>

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

  .header-error-search {
    color: var(--c-dark-focus);
  }
</style>
