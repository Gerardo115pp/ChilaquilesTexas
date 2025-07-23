<script>
    import { page } from '$app/state';
    import '@app/app.css';
    import { page_backgrounds } from '@app/common/page_medias';
    import Navbar from '@components/Navbar/Navbar.svelte';
    import PageBackground from '@components/PageBackground/PageBackground.svelte';
    import { onMount } from 'svelte';

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * @type {import('./$types').LayoutProps}
        */
        let { children } = $props();

        /**
         * The page background for the current page.
         * @type {import('@models/PageBackgrounds').PageBackground | null}
         */
        let page_background = $state(null);
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        determinePageBackground();
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Determines the page background for the current page.
         */
        const determinePageBackground = () => {
            const page_pathname = page.url.pathname;

            let new_page_background = page_backgrounds.home;

            switch (page_pathname) {
                case '/about-us':
                    new_page_background = page_backgrounds.our_history;
                    break;
                case '/cover-menu':
                    new_page_background = page_backgrounds.menu;
                    break;
                case '/coffee':
                    new_page_background = page_backgrounds.coffee;
                    break;
                case '/pan-dulce':
                    new_page_background = page_backgrounds.pan_dulce;
                    break;
                case '/san-miguel':
                    new_page_background = page_backgrounds.san_miguel;
                    break;
            }

            page_background = new_page_background;
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<div id="libery-website-content">
    {#if page_background != null} 
        <PageBackground 
            page_background={page_background}
        />
    {/if}
    <div id="txc-video-background-page-layout">
        <div id="txc-vbpl-side-content"></div>
        <div id="txc-vbpl-page-content">
            <Navbar />
            {@render children()}
        </div>
    </div>
</div>

<style>
    #txc-video-background-page-layout {
        display: grid;
        grid-template-columns: auto min(75.36dvw, 1447px);
        padding: var(--padding--video-background-page);
        column-gap: min(59px, 3.072dvw);
    }
</style>