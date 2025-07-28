<script>
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/state';
    import '@app/app.css';
    import { getPageBackground } from '@app/common/page_medias';
    import page_layouts, { determinePageLayout } from '@app/common/page_layouts';
    import DesayunoCopy from '@components/CommonCopy/DesayunoCopy.svelte';
    import Footer from '@components/Footer/Footer.svelte';
    import LosChilaquilesLogo from '@components/icons/LosChilaquilesLogo.svelte';
    import Navbar from '@components/Navbar/Navbar.svelte';
    import PageBackground from '@components/PageBackground/PageBackground.svelte';
    import { onMount, onDestroy } from 'svelte';
    import { website_page_paths } from '@app/common/page_paths';
    import layout_properties, { setupLayout, dismissLayout } from '@stores/layout/layout';
    import { browser } from '$app/environment';

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * @type {import('./$types').LayoutProps}
         */
        let { children } = $props();

        /**
         * the name of the layout used for the current page.url.pathname. affects how content is displayed.
         * @type {import('@common/page_layouts').PageLayout}
         */
        let current_page_layout = $state(determinePageLayout(page.url.pathname));

        /**
         * The page background for the current page.
         * @type {import('@models/PageBackgrounds').PageBackground | null}
         */
        let page_background = $state(null);

        $effect(() => console.debug("In @app/routes/+layout.svelte: Page background is: %O", page_background));
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        setupLayout();

        determinePageBackground(page.url.pathname);
    });

    onDestroy(() => {
        if (browser) {
            dismissLayout();
        }
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

            managePageLayoutOnNavigation(pathname);
        }

        /**
         * determines if the page layout most be changed for the given path name.
         * @param {string} pathname
         * @returns {void}
         */
        const managePageLayoutOnNavigation = pathname => {
            const current_layout = current_page_layout;
            const new_layout = determinePageLayout(pathname);

            if (current_layout === new_layout) {
                console.debug(`In @app/routes/+layout.managePageLayoutOnNavigation: No change in layout for path: ${pathname}`);
                return;
            }

            current_page_layout = new_layout;

        }
    
    /*=====  End of Methods  ======*/
    
</script>

<div id="libery-website-content"
    class="page-layout-{current_page_layout}"
>
    {#if page_background != null} 
        <!-- 
            FIXME: This solution for recalculating the page background is far from ideal. 
            Make PageBackground handle it
        -->
        <PageBackground 
            page_background={page_background}
        />
    {/if}
    {#if current_page_layout === page_layouts.VBPL_DEFAULT || current_page_layout === page_layouts.VBPL_FULL_MAIN_CONTENT}
        <div id="txc-video-background-page-layout">
            <div id="txc-vbpl-navbar-wrapper">
                <Navbar />
            </div>
            <div id="txc-vbpl-side-content">
                <div id="txc-vbpl-sc-logo-wrapper">
                    <a href="{website_page_paths.HOME.path}">
                        <LosChilaquilesLogo />
                    </a>
                </div>
            </div>
            <div id="txc-vbpl-main-content">
                {#if current_page_layout === page_layouts.VBPL_DEFAULT}
                    <div id="txc-vbpl-mc-with-common-copy">
                        <div id="txc-vbpl-page--common-content">
                            <DesayunoCopy />
                        </div>
                        <div id="txc-vbpl-page--main-content">
                            {@render children()}
                        </div>
                    </div>
                {:else}
                    <div id="txc-vbpl-mc-with-common-copy--full-main-content">
                        <div id="txc-vbpl-page--main-content" class="txc-vbpl-full-main-content">
                            {@render children()}
                        </div>
                    </div>
                {/if}
                <Footer />
            </div>
        </div>
    {/if}
</div>

<style>

    #libery-website-content {
        width: 100dvw;
        display: grid;
        place-items: center;

        &.page-layout-VBPL {
            height: 100dvh;
        }
    }

    
    /*=============================================
    =       VBPL(Video Background Page Layout)    =
    =============================================*/
    
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

            & > #txc-vbpl-side-content {
                grid-row: 1 / span 2;
            }

            & > #txc-vbpl-main-content {
                grid-column: 2;
                grid-row:  2 / span 1;
            }

            & > #txc-vbpl-navbar-wrapper {
                grid-column: 2 / span 1;
                grid-row: 1;
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

        
        /*----------  Full main content  ----------*/
        
            #txc-vbpl-mc-with-common-copy--full-main-content {
                display: grid;
                grid-template-columns: 1fr;
            }

            #txc-vbpl-page--main-content.txc-vbpl-full-main-content {
                display: grid;
                width: 100%;
                height: 100%;
                place-items: center;
            }
    
    /*=====  End of VBPL layout  ======*/
    
    
    /*=============================================
    =            Responsive            =
    =============================================*/
    
        @media only screen and (max-width: 1080px) {
            #txc-video-background-page-layout {
                display: flex;
                flex-direction: column;
                column-gap: normal;
                row-gap: 5.2dvh;

                & #txc-vbpl-side-content, & #txc-vbpl-main-content > :first-child {
                    padding-inline: 12.5dvw;
                }
            }

            /* 
             Same as #txc-vbpl-side-content but with double specificity.
            */
            #txc-vbpl-side-content:not(#something-else) {
                height: max-content;
                margin-top: 4.8437dvh;
                place-items: center start;

                & #txc-vbpl-sc-logo-wrapper {
                    width: 40.1951dvw;
                }
            }

            #txc-vbpl-main-content {                
                & > #txc-vbpl-mc-with-common-copy, & > #txc-vbpl-mc-with-common-copy--full-main-content {
                    grid-template-columns: 1fr;
                }
            }

            :global(#txc-video-background-page-layout #txc-vbpl-page--main-content:has(main:empty)) {
                display: none;
            }
            :global(#txc-video-background-page-layout #txc-vbpl-page--common-content:has(+ #txc-vbpl-page--main-content main:not(:empty))) {
                display: none;
            }

            #txc-vbpl-page--common-content {
                container-type: size;
                width: 43.4259dvw;
                height: 35.2604dvh;
                container-name: mobile-vertical-cc;
            }
        }
    
    /*=====  End of Responsive  ======*/
    
    
</style>