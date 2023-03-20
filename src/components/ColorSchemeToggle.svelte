<script lang="ts">
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";
    import { backOut } from "svelte/easing";
    import { COLOR_SCHEME_COOKIE, COLOR_SCHEME_BODY_ATTRIBUTE } from "../../functions/_middleware";
    import type { ColorSchemeValue } from "../../functions/_middleware";

    let nativeColorScheme: ColorSchemeValue;
    let colorScheme: ColorSchemeValue;

    function getCookieColorScheme(): ColorSchemeValue | undefined {
        const cookieColorScheme = document.cookie
            .split(";")
            .find((item) => item.includes(`${COLOR_SCHEME_COOKIE}=`))
            ?.match(new RegExp(`(?:^|; )${COLOR_SCHEME_COOKIE}=([^;]*)`))
            ?.at(1);

        if(cookieColorScheme === 'light' || cookieColorScheme === 'dark') {
            return cookieColorScheme;
        }
    }

    function setCookieColorScheme(value: ColorSchemeValue, maxAge: number) {
        document.cookie = `${COLOR_SCHEME_COOKIE}=${value};path=/;max-age=${maxAge};`;
    }

    function toggleColorScheme() {
        colorScheme = colorScheme === "dark" ? "light" : "dark";

        if (colorScheme === nativeColorScheme) {
            setCookieColorScheme(colorScheme, 0);
            document.body.removeAttribute(COLOR_SCHEME_BODY_ATTRIBUTE);
        } else {
            setCookieColorScheme(colorScheme, 60 * 60 * 24 * 365);
            document.body.setAttribute(COLOR_SCHEME_BODY_ATTRIBUTE, colorScheme);
        }
    }

    onMount(() => {
        let matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
        let cookieColorScheme = getCookieColorScheme();
        nativeColorScheme = matchMedia.matches ? "dark" : "light";

        if (cookieColorScheme === "light" || cookieColorScheme === "dark") {
            colorScheme = cookieColorScheme;
            document.body.setAttribute(COLOR_SCHEME_BODY_ATTRIBUTE, cookieColorScheme);
        } else {
            colorScheme = nativeColorScheme;
        }

        matchMedia.addEventListener("change", (event) => {
            nativeColorScheme = event.matches ? "dark" : "light";

            if (!getCookieColorScheme()) {
                colorScheme = nativeColorScheme;
            }
        });
    });
</script>

<button on:click={toggleColorScheme} aria-label="Alternar esquema de cores">
    {#if colorScheme === "dark"}
        <svg
            in:scale={{ easing: backOut, duration: 650 }}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_249_626)">
                <path
                    d="M15 -1.52045e-07C14.25 -1.44443e-07 13.75 0.5 13.75 1.25L13.75 2.5C13.75 3.25 14.25 3.75 15 3.75C15.75 3.75 16.25 3.25 16.25 2.5L16.25 1.25C16.25 0.5 15.75 -1.59648e-07 15 -1.52045e-07ZM5.24902 3.99902C4.93652 3.99902 4.625 4.125 4.375 4.375C3.875 4.875 3.875 5.62549 4.375 6.12549L5.24902 6.99951C5.74902 7.49951 6.49951 7.49951 6.99951 6.99951C7.49951 6.49951 7.49951 5.74902 6.99951 5.24902L6.12549 4.375C5.87549 4.125 5.56152 3.99902 5.24902 3.99902ZM24.751 3.99902C24.4385 3.99902 24.1245 4.125 23.8745 4.375L23.0005 5.24902C22.5005 5.74902 22.5005 6.49951 23.0005 6.99951C23.5005 7.49951 24.251 7.49951 24.751 6.99951L25.625 6.12549C26.125 5.62549 26.125 4.875 25.625 4.375C25.375 4.125 25.0635 3.99902 24.751 3.99902ZM15 6.25C12.6794 6.25 10.4538 7.17187 8.81282 8.81282C7.17187 10.4538 6.25 12.6794 6.25 15C6.25 17.3206 7.17187 19.5462 8.81282 21.1872C10.4538 22.8281 12.6794 23.75 15 23.75C17.3206 23.75 19.5462 22.8281 21.1872 21.1872C22.8281 19.5462 23.75 17.3206 23.75 15C23.75 12.6794 22.8281 10.4538 21.1872 8.81282C19.5462 7.17187 17.3206 6.25 15 6.25ZM1.25 13.75C0.5 13.75 1.44443e-07 14.25 1.52045e-07 15C1.59648e-07 15.75 0.5 16.25 1.25 16.25L2.5 16.25C3.25 16.25 3.75 15.75 3.75 15C3.75 14.25 3.25 13.75 2.5 13.75L1.25 13.75ZM27.5 13.75C26.75 13.75 26.25 14.25 26.25 15C26.25 15.75 26.75 16.25 27.5 16.25L28.75 16.25C29.5 16.25 30 15.75 30 15C30 14.25 29.5 13.75 28.75 13.75L27.5 13.75ZM6.12549 22.6245C5.81299 22.6245 5.49902 22.7505 5.24902 23.0005L4.375 23.8745C3.875 24.3745 3.875 25.125 4.375 25.625C4.875 26.125 5.62549 26.125 6.12549 25.625L6.99951 24.751C7.49951 24.251 7.49951 23.5005 6.99951 23.0005C6.74951 22.7505 6.43799 22.6245 6.12549 22.6245ZM23.8745 22.6245C23.562 22.6245 23.2505 22.7505 23.0005 23.0005C22.5005 23.5005 22.5005 24.251 23.0005 24.751L23.8745 25.625C24.3745 26.125 25.125 26.125 25.625 25.625C26.125 25.125 26.125 24.3745 25.625 23.8745L24.751 23.0005C24.501 22.7505 24.187 22.6245 23.8745 22.6245ZM15 26.25C14.25 26.25 13.75 26.75 13.75 27.5L13.75 28.75C13.75 29.5 14.25 30 15 30C15.75 30 16.25 29.5 16.25 28.75L16.25 27.5C16.25 26.75 15.75 26.25 15 26.25Z"
                    fill="#F3F3F3"
                />
            </g>
            <defs>
                <clipPath id="clip0_249_626">
                    <rect width="30" height="30" fill="white" />
                </clipPath>
            </defs>
        </svg>
    {:else if colorScheme === "light"}
        <svg
            in:scale={{ easing: backOut, duration: 650 }}
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18.9618 10.79C18.8045 12.4922 18.1657 14.1144 17.1201 15.4668C16.0744 16.8192 14.6653 17.8458 13.0575 18.4265C11.4497 19.0073 9.7098 19.1181 8.04132 18.7461C6.37283 18.3741 4.84481 17.5345 3.63604 16.3258C2.42727 15.117 1.58775 13.589 1.21572 11.9205C0.843691 10.252 0.954531 8.51208 1.53528 6.9043C2.11602 5.29651 3.14265 3.88737 4.49503 2.84175C5.84741 1.79614 7.46961 1.15731 9.17182 1C8.17523 2.34827 7.69566 4.00945 7.82035 5.68141C7.94503 7.35338 8.66568 8.92506 9.85122 10.1106C11.0368 11.2961 12.6084 12.0168 14.2804 12.1415C15.9524 12.2662 17.6135 11.7866 18.9618 10.79Z"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    {/if}
</button>

<style>
    button {
        all: unset;

        display: flex;

        aspect-ratio: 1/1;
        width: 25px;
        height: 30px;

        cursor: pointer;
        transition: transform 0.5s cubic-bezier(0.13, 0.68, 0.51, 1.54);
    }

    button:hover {
        transform: scale(1.075);
    }

    button:active {
        transform: scale(0.925);
    }

    svg path {
        fill: var(--c-text);
    }
</style>
