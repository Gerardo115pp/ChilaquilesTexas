<script>
    import { website_page_paths } from "@app/common/page_paths";
    import { MediaQuery } from "svelte/reactivity";
    import NavbarMobile from "./sub-components/NavbarMobile.svelte";
    import NavbarDesktop from "./sub-components/NavbarDesktop.svelte";

    /*=============================================
    =            Properties            =
    =============================================*/

        /**
         * @type {import('./navbar.d.ts').NavOption[]}
         */
        const nav_options = [
            {
                name: "About us",
                href: website_page_paths.ABOUT_US_PAGE.path
            },
            {
                name: "Menu",
                href: website_page_paths.COVER_MENU_PAGE.path
            },
            {
                name: "Coffee",
                href: website_page_paths.COFFEE_PAGE.path
            },
            {
                name: "Pan Dulce",
                href: website_page_paths.PAN_DULCE_PAGE.path
            }
        ];

        /**
         * A media query that determines whether the current navigator has a vertical aspect ratio
         */
        const is_vertical_navbar_media_query = new MediaQuery('max-aspect-ratio: 0.98');

        /**
         * Whether the current navigator has a vertical aspect ratio
         * @type {boolean}
         */
        let is_vertical_viewport = $derived(is_vertical_navbar_media_query.current);


    /*=====  End of Properties  ======*/
</script>

{#if is_vertical_viewport}
    <NavbarMobile {nav_options} />
{:else}
    <NavbarDesktop {nav_options} />
{/if}