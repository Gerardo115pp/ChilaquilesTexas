<script>
    import { page } from '$app/state';
    import { external_links, website_page_paths } from '@app/common/page_paths.js';
    import SpotifyIcon from '@components/icons/SpotifyIcon.svelte';
    import NavBurgerButton from './NavBurgerButton.svelte';
    import MobileNavDialog from './MobileNavDialog.svelte';
    import { writable } from 'svelte/store';
    import { afterNavigate } from '$app/navigation';
    import { generateWorkInProgressPath } from '@libs/NavigationUtils';
    import { getNavigatorLang } from '@libs/LangUtils';
    import { onMount } from 'svelte';

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
        * @typedef {Object} DesktopNavbarProps
         * @property {import('../navbar.d.ts').NavOption[]} nav_options - The navigation options.
        */

        /**
         * @type {DesktopNavbarProps}
         */
        let { nav_options } = $props();

        /**
         * Whether the navigation dialog should be visible
         * @type {import('svelte/store').Writable<boolean>}
         */
        let display_nav_dialog = writable(false);
    
    /*=====  End of Properties  ======*/
    
    afterNavigate(() => {
        defineNavigationDialogOpened(false);
    })
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Handles the click event on the mobile navbar burger button.
         * @param {MouseEvent} event
         */
        const handleBurgerButtonClick = event => {
            display_nav_dialog.set(true);
        }

        /**
         * Sets the open state of the navigation menu dialog.
         * @param {boolean} is_open
         */
        const defineNavigationDialogOpened = is_open => {
            display_nav_dialog.set(is_open);
        }

        /**
         * The order online url
         * @type {string}
         */
        let order_online_url = $state(generateWorkInProgressPath("en"));
    
    /*=====  End of Methods  ======*/

    onMount(() => {
        // @ts-ignore
        order_online_url = generateWorkInProgressPath(getNavigatorLang("en"))
    });
    
</script>

<MobileNavDialog 
    nav_options={nav_options}
    open_state={display_nav_dialog}
/>
<nav id="txc-mobile-navbar"
    class:is-home-page={page.url.pathname === website_page_paths.HOME.path}
>
    <div id="txc-mnv-content-right">
        <menu id="txc-mnv-cr-navoptions">
            {#each nav_options as nv_option_item}
                <li class="txc-mnv-cr-navoption">
                    <a href="{nv_option_item.href}" class="force-hover">
                        {nv_option_item.name}
                    </a>
                </li>
            {/each}
        </menu>
    </div>
    <div id="txc-mnv-content-left">
        <button id="txc-mnv-burger-wrapper"
            onclick={handleBurgerButtonClick}
        >
            <NavBurgerButton />
        </button>
        <ul id="txc-mnv-cl-socials">
            <li id="txc-mnv-cl-si-spotify" class="txc-mnv-cl-socials-item">
                <a href="{external_links.SPOTIFY}" target="_blank" rel="noopener noreferrer">
                    <span class="txc-mnv-cl-socials-item-icon-wrapper">
                        <SpotifyIcon />
                    </span>
                    <h3 class="txc-mnv-cl-socials-item-text">
                        Let our playlist ease you into the day
                    </h3>
                </a>
            </li>
        </ul>
        <a href="{order_online_url}" id="txc-mnv-order-online-btn" class="txc-button">
            ORDER ONLINE
        </a>
    </div>
</nav>

<style>
    nav#txc-mobile-navbar {
        display: flex;
        container-type: size;
        width: 100%;
        height: var(--navbar-height);
        justify-content: space-between;   
    }

    button#txc-mnv-burger-wrapper {
        display: none;
        padding: 0;
        border: none;
    }
    
    /*=============================================
    =            NavOptions            =
    =============================================*/
    
        #txc-mnv-content-right {
            display: grid;
            width: max-content;
            place-items: center;
        }
        
        menu#txc-mnv-cr-navoptions {
            box-sizing: border-box;
            display: flex;
            width: max-content;
            font-size: 0.952380rem;
            gap: 4.8231cqw;
            align-items: center;
            list-style: none;
            margin: 0;
            padding: 0;

            & li.txc-mnv-cr-navoption a {
                font-family: var(--font-titles);
                color: var(--grey-1);
                font-weight: bold;
                text-transform: uppercase;
                text-decoration: none;
                white-space: nowrap;
            }
        }

    
    /*=====  End of NavOptions  ======*/

    ul#txc-mnv-cl-socials {
        display: none;
    }
    
    /*=============================================
    =            Home page alt            =
    =============================================*/
    
        nav#txc-mobile-navbar.is-home-page {
            align-items: center;

            & #txc-mnv-content-right {
                display: none;
            }

            & #txc-mnv-content-left {
                display: flex;
                align-items: center;
            }

            & #txc-mnv-burger-wrapper {
                display: block;
                width: 6.4308cqw;
            }
        }
    
        .is-home-page ul#txc-mnv-cl-socials {
            display: flex;
            width: auto;
            align-items: center;
            align-self: stretch;
            gap: 0.8095rem;
            border: 1px solid var(--grey-1);
            padding-inline: 1.2em;
            margin: 0;
        }

        li#txc-mnv-cl-si-spotify.txc-mnv-cl-socials-item {
            display: flex;
            height: 100cqh;
            column-gap: calc(var(--font-size-1) * .75);
            align-items: center;

            & > a {
                display: flex;
                height: 100%;
                column-gap: inherit;
                align-items: center;
                text-decoration: none;
            }

            & h3 {
                color: var(--grey-1);
                font-size: calc(1.5 * var(--font-size-1));
                font-weight: normal;
                text-transform: none;
            }

            .txc-mnv-cl-socials-item-icon-wrapper {
                height: 52.7927%;
                aspect-ratio: 1 / 1;
            }
        }
    
    /*=====  End of Current page alt  ======*/
    
    #txc-mnv-content-left {
        display: flex;
        column-gap: 5.528cqw;
    }

    
    /*=============================================
    =            Responsive            =
    =============================================*/

        @container (width <= 1080px) {
            menu#txc-mnv-cr-navoptions {
                font-size: 2.8cqw;
            }

            #txc-mnv-order-online-btn {
                display: flex;
                align-self: stretch;
                justify-content: center;
                align-items: center;
                font-size: calc(0.35 * var(--navbar-height));
                padding-block: 0;
            }
        }
    
        @container (width <= 400px) {
            menu#txc-mnv-cr-navoptions {
                font-size: 2.4cqw;
            }
        }
    /*=====  End of Responsive  ======*/

</style>