<script lang="ts">
    export let posts: any[]

    const queryParams = new URLSearchParams(window.location.search)
    const filteredPosts = posts.filter(post => post.frontmatter.title.includes(queryParams.get('query')))

    function formatHref(title: string) {
        return `/article/${title.toLowerCase().split(' ').join('-')}`
    }
</script>

{#each filteredPosts as post}
    <a href={formatHref(post.frontmatter.title)}>
        <h4>{post.frontmatter.title}</h4>
    </a>
{/each}