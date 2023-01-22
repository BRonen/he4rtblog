<script lang="ts">
    let searchValue: any = '';
    
    export let posts: any[];

    let postsFiltered: any[];

    const submitHandle = (e: any) => {
      e.preventDefault()
      location.replace(`${location.origin}/search?query=${searchValue}`)
    }

    $: {
      postsFiltered = posts.filter(post => post.frontmatter.title.includes(searchValue))
    }
</script>

<div class="header-search">
    <button class="header-icon-search">
        <img
            src="/search-icon.svg"
            alt="Icone de pesquisa"
        />
    </button>
    <form on:submit={submitHandle}>
        <input
            bind:value={searchValue}
            list="posts-hints"
            name="search"
            type="search"
            class="header-input-search"
        />
    </form>
</div>

<datalist id="posts-hints">
  {#each postsFiltered as post}
    <option value={post.frontmatter.title}/>
  {/each}
</datalist>

<style>
    .header-search {
      display: flex;
      margin-top: 1rem;
      margin-left: auto;
      margin-right: auto;
      border-bottom: 2px solid var(--c-primary);
      height: fit-content;
    }

    .header-icon-search {
      border: none;
      background: none;
      cursor: pointer;
      width: 20px;
      height: auto;
    }
  
    .header-input-search {
      width: 300px;
      height: 30px;
      background-color: transparent;
      border: none;
      color: var(--c-light-background);
      font-size: 1.2rem;
      padding-left: 20px;
      padding: 5px;
    }
</style>
