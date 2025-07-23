<script>
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
    
    /*=====  End of VBPL layout  ======*/
    
    
</style>