<script>
    import Footer from "@components/Footer/Footer.svelte";
    import CloseButton from "@components/icons/CloseButton.svelte";
    import LosChilaquilesLogo from "@components/icons/LosChilaquilesLogo.svelte";
    import SpotifyIcon from "@components/icons/SpotifyIcon.svelte";
    
    /*=============================================
    =            Properties            =
    =============================================*/

        /**
        * @typedef {Object} MobileNavDialogProps
         * @property {import('../navbar.d.ts').NavOption[]} nav_options - The navigation options.
         * @property {import('svelte/store').Writable<boolean>} open_state
        */

        /**
         * @type {MobileNavDialogProps}
         */
        let { nav_options, open_state } = $props();

    /*=====  End of Properties  ======*/
   
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Handles the click event on the close button.
         * @param {MouseEvent} event
         */
        const handleCloseButtonClick = event => {
            open_state.set(false);
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<dialog open={$open_state} id="txc-mobile-nav-dialog">
    <div id="txc-mnd-content-wrapper">
        <header id="txc-mnd-header">
            <div id="txc-mnd-h-logo-wrapper">
                <LosChilaquilesLogo />
            </div>
            <div id="txc-mnd-actions-wrapper">
                <button id="txc-mnd-h-aw-close-btn"
                    onclick={handleCloseButtonClick}
                >
                    <CloseButton />
                </button>
            </div>
        </header>
        <div id="txc-mnd-navigation-wrapper">
            <menu id="txc-mnd-nav-menu">
                {#each nav_options as nv_item}
                    <li class="txc-mnd-nm-nav-option">
                        <a href="{nv_item.href}">
                            {nv_item.name}
                        </a>
                    </li> 
                {/each}
                <li class="txc-mnd-social-link">
                    <a href="#">
                        <span class="txc-mnd-sl-socials-item-icon-wrapper">
                            <SpotifyIcon />
                        </span>
                        <h3 class="txc-mnd-sl-socials-item-text">
                            Let our playlist ease<br/> you into the day
                        </h3>
                    </a>
                </li>
            </menu>
        </div>
        <div id="txc-mnd-foot-content">
            <button id="txc-mnd-order-online">
                ORDER ONLINE
            </button>
            <Footer />
        </div>
    </div>
</dialog>

<style>
    dialog#txc-mobile-nav-dialog {
        position: fixed;
        inset: 0;
        background: var(--theme-color);
        container-type: size;
        width: 100dvw;
        height: 100dvh;
        padding: var(--padding--video-background-page);
        color: var(--grey-1);
        border: none;
        z-index: var(--z-index-t-5);
    }

    #txc-mnd-content-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        row-gap: 11cqh;
    }
    
    /*=============================================
    =            Header            =
    =============================================*/
    
        header#txc-mnd-header {
            display: flex;
            height: 11.11cqh;
            align-items: flex-start;
            justify-content: space-between;

            & #txc-mnd-h-logo-wrapper {
                height: 100%;
                aspect-ratio: 2.75;
            }

            & #txc-mnd-actions-wrapper {
                height: 5cqh;
            }
            & #txc-mnd-actions-wrapper button {
                height: 100%;
                aspect-ratio: 1 / 1;
                padding: 0;
                border: none;
            }
        }
    
    /*=====  End of Header  ======*/
    
    
    /*=============================================
    =            Navigation Wrapper            =
    =============================================*/
    
    #txc-mnd-navigation-wrapper {
            overflow: auto;
            width: 100%;
            height: 45.78cqh;
        }

        #txc-mnd-navigation-wrapper menu#txc-mnd-nav-menu {
            display: flex;
            width: 53.4%;
            height: 100%;
            flex-direction: column;
            font-size: calc(2.836 *var(--font-size-3));
            gap: 6.5%;

            & > li {
                width: 100%;
                height: 7cqh;
            }

            & > li.txc-mnd-nm-nav-option {
                border-bottom: 6px solid var(--grey-1);
            }

            & > li.txc-mnd-nm-nav-option a {
                display: block;
                width: max-content;
                font-size: inherit;
                text-decoration: none;
                text-transform: uppercase;
            }

        }

        li.txc-mnd-social-link {

            & > a {
                display: flex;
                gap: 0.71em;
                display: flex;
                text-decoration: none;
            }

            & .txc-mnd-sl-socials-item-icon-wrapper {
                display: block;
                width: 8.8cqw;
            }

            & h3 {
                font-size: 0.5334em;
            }
        }

    
    /*=====  End of Navigation Wrapper  ======*/

    #txc-mnd-foot-content {

        display: flex;
        flex-direction: column;
        row-gap: .8em;

        & button#txc-mnd-order-online {
            width: 100%;
            color: var(--theme-color);
            background-color: var(--grey-1);
            padding: calc(var(--spacing-3) * 0.90625) 0;
            font-size: calc(var(--font-size-4) * 1.6667);
            border-color: var(--grey-1);
        }
    }

    
</style>