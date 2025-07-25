<script>
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/state';
    import '@app/app.css';
    import { getPageBackground, isVideoBackgroundPage } from '@app/common/page_medias';
    import { website_page_paths } from '@app/common/page_paths';
    import DesayunoCopy from '@components/CommonCopy/DesayunoCopy.svelte';
    import Footer from '@components/Footer/Footer.svelte';
    import LosChilaquilesLogo from '@components/icons/LosChilaquilesLogo.svelte';
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

        $effect(() => console.debug("In @app/routes/+layout.svelte: Page background is: %O", page_background));
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        determinePageBackground(page.url.pathname);
    });

    afterNavigate(() => {
        console.debug(`In @app/routes/+layout.svelte: Page changed to: ${page.url.pathname}`);
        handleCSRNavigate(page.url.pathname);
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Determines the page background for the current page.
         * @param {string} pathname
         */
        const determinePageBackground = pathname => {
            let page_data = getPageBackground(pathname);

            if (page_data == null) {
                console.debug(`In @app/routes/+layout.determinePageBackground: No page background found for page path: ${pathname}`);
            }        

            page_background = page_data?.background ?? null;
            console.debug(`In @app/routes/+layout.determinePageBackground: changed the page`);
        }

        /**
         * Handles CSR navigation.
         * @param {string} pathname
         */
        const handleCSRNavigate = pathname => {
            // TODO: Check same page navigation.

            determinePageBackground(pathname);
        }
    
    /*=====  End of Methods  ======*/
    
</script>

<div id="libery-website-content">
    {#if page_background != null} 
        <!-- 
            FIXME: This solution for recalculating the page background is far from ideal. 
            Make PageBackground handle it
        -->
        <PageBackground 
            page_background={page_background}
        />
    {/if}
    <div id="txc-video-background-page-layout">
        <div id="txc-vbpl-side-content">
            <div id="txc-vbpl-sc-logo-wrapper">
                <LosChilaquilesLogo />
            </div>
        </div>
        <div id="txc-vbpl-main-content">
            <Navbar />
            <div id="txc-vbpl-mc-with-common-copy">
                <div id="txc-vbpl-page--common-content">
                    <DesayunoCopy />
                </div>
                <div id="txc-vbpl-page--main-content">
                    {@render children()}
                </div>
            </div>
            <Footer />
        </div>
    </div>
</div>

<style>
    
    /*=============================================
    =       VBPL(Video Background Page Layout)    =
    =============================================*/

        #libery-website-content:has(> #txc-video-background-page-layout) {
            display: grid;
            place-items: center;
        }
    
        #txc-video-background-page-layout {
            box-sizing: border-box;
            width: 100%;
            max-width: 1920px;
            height: 100dvh;
            display: grid;
            grid-template-columns: auto min(75.36dvw, 1447px);
            padding: var(--padding--video-background-page);
            column-gap: min(59px, 3.072dvw);

            & > #txc-vbpl-side-content, & > #txc-vbpl-main-content {
                height: 100%;
            }
        }

        #txc-vbpl-side-content {
            display: grid;
            place-items: center;
            
            & #txc-vbpl-sc-logo-wrapper {
                width: 96.3578%;
            }
        }

        #txc-vbpl-main-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        
        /*----------  With common copy  ----------*/
        
            #txc-vbpl-mc-with-common-copy {
                display: grid;
                grid-template-columns: auto 1fr;
            }

            #txc-vbpl-page--main-content {
                display: grid;
                width: 100%;
                height: 100%;
                place-items: center;
            }
    
    /*=====  End of VBPL layout  ======*/
    
    
</style>