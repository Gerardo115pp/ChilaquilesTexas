<script>
    import { page } from '$app/state';
    import '@app/app.css';
    import { getPageBackground, isVideoBackgroundPage } from '@app/common/page_medias';
    import { website_page_paths } from '@app/common/page_paths';
    import DesayunoCopy from '@components/CommonCopy/DesayunoCopy.svelte';
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

            let page_data = getPageBackground(page_pathname);

            if (page_data == null) {
                console.debug("In @app/routes/+layout.determinePageBackground: No page background found for page path: %O", page_pathname);
            }        

            page_background = page_data?.background ?? null;
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
        <div id="txc-vbpl-main-content">
            <Navbar />
            <div id="txc-vbpl-page--common-content">
                <DesayunoCopy />
            </div>
            <div id="txc-vbpl-page--main-content">
                {@render children()}
            </div>
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