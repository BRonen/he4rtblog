<script lang="ts">
    export let searchInput: string = "";
    export let isFocused: boolean = false;
    export let searchAnimation: boolean = false;
    let searchIcon: SVGSVGElement;
    let underline: HTMLElement;

    export const notFoundAnimation = () => {
        const keyframes = new KeyframeEffect(searchIcon, [
            { transform: "scale(1.1, 0.9) translate3d(-1px, 0px, 0)", strokeWidth: '2.25px', offset: 0.1 },
            { transform: "scale(1.1, 0.9) translate3d(2px, 0px, 0)", strokeWidth: '2.25px', offset: 0.2 },
            { transform: "scale(1.1, 0.9) translate3d(-4px, 0px, 0)", strokeWidth: '2.25px', offset: 0.3 },
            { transform: "scale(1.1, 0.9) translate3d(4px, 0px, 0)", strokeWidth: '2.25px', offset: 0.4 },
            { transform: "scale(1.1, 0.9) translate3d(-4px, 0px, 0)", strokeWidth: '2.25px', offset: 0.5 },
            { transform: "scale(1.1, 0.9) translate3d(4px, 0px, 0)", strokeWidth: '2.25px', offset: 0.6 },
            { transform: "scale(1.1, 0.9) translate3d(-4px, 0px, 0)", strokeWidth: '2.25px', offset: 0.7 },
            { transform: "scale(1) translate3d(2px, 0, 0)", strokeWidth: '2.25px', offset: 0.8 },
            { transform: "scale(1) translate3d(-1px, 0, 0)", strokeWidth: '2px', offset: 0.9 },
        ], {duration: 1600, easing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)', fill: 'both'});

        new Animation(keyframes).play();
    }

    export const resultsFoundAnimation = () => {
        const keyframes = new KeyframeEffect(searchIcon, [
            { transform: "scale(1.15, 0.85) translate3d(0px, 6px, 0)", offset: 0.15 },
            { transform: "scale(0.85, 1.15) translate3d(0px, -8px, 0)", offset: 0.3 },
            { transform: "scale(0.85, 1.15) translate3d(0px, -10px, 0)", offset: 0.4 },
            { transform: "scale(0.85, 1.15) translate3d(0px, -8px, 0)", offset: 0.5 },
            { transform: "scale(1.15, 0.85) translate3d(0px, 6px, 0)", offset: 0.65 },
            { transform: "scale(1.0, 1.0) translate3d(0px, 0px, 0)", offset: 0.8 }
        ], {duration: 1600, easing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)', fill: 'both', composite: 'accumulate'});

        new Animation(keyframes).play();
    }
</script>

<div class:searchAnimation class="wrapper">
    <svg
        bind:this={searchIcon}
        role="img"
        
        viewBox="0 0 16 16"
        class="search-icon"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 14.9995L10.3333 10.3328M11.8889 6.44396C11.8889 9.45085 9.45133 11.8884 6.44444 11.8884C3.43756 11.8884 1 9.45085 1 6.44396C1 3.43708 3.43756 0.999512 6.44444 0.999512C9.45133 0.999512 11.8889 3.43708 11.8889 6.44396Z"
            stroke="#782BF1"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
    <input
        bind:value={searchInput}
        on:focusout={() => (isFocused = false)}
        on:focusin={() => (isFocused = true)}
        on:keydown={(event) => { if(event.key === 'Enter') event.preventDefault() }}
        on:input
        type="search"
        spellcheck="false"
    />

    <div class="underline" bind:this={underline} />
</div>

<style>
    .wrapper {
        display: grid;
        grid-template-areas:
            "icon input"
            "underline underline";
        grid-template-columns: min-content;
        align-items: center;

        height: 30px;
    }

    .search-icon {
        grid-area: icon;
        aspect-ratio: 1/1;
        width: 18px;
        stroke-width: 2px;
        transform-origin: bottom;
        overflow: visible;
    }

    .underline {
        transition: transform 0.45s cubic-bezier(0.13, 0.68, 0.51, 1.54);
        transform: translateZ(0);
        backface-visibility: hidden;
        will-change: transform;
    }

    input {
        all: unset;
        grid-area: input;

        width: 95%;
        padding-left: 10px;

        border: none;
        font-size: 1.2rem;

        background-color: transparent;
    }

    .underline {
        grid-area: underline;
        border-bottom: 2px solid var(--c-primary);

        border-radius: 100px;
    }

    .searchAnimation .underline {
        transform: scaleX(0.95) scaleY(1.45);
    }
</style>