<script>
    import { page } from '$app/state';
    import { external_links, website_page_paths } from '@app/common/page_paths.js';
    import InstagramIcon from '@components/icons/InstagramIcon.svelte';
    import SpotifyIcon from '@components/icons/SpotifyIcon.svelte';
    import NavBurgerButton from './NavBurgerButton.svelte';

    
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
    
    /*=====  End of Properties  ======*/
    
    
</script>

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
        <div id="txc-mnv-burger-wrapper">
            <NavBurgerButton />
        </div>
        <ul id="txc-mnv-cl-socials">
            <li class="txc-mnv-cl-socials-item">
                <span class="txc-mnv-cl-socials-item-icon-wrapper">
                    <SpotifyIcon />
                </span>
                <h3 class="txc-mnv-cl-socials-item-text">
                    Let our playlist ease you into the day
                </h3>
            </li>
        </ul>
        <button id="txc-mnv-order-online-btn" class="txc-button">
            ORDER ONLINE
        </button>
    </div>
</nav>

<style>

    nav#txc-mobile-navbar {
        display: flex;
        container-type: inline-size;
        width: 100%;
        min-height: var(--navbar-height);
        height: max-content;
        justify-content: space-between;   
    }

    #txc-mnv-burger-wrapper {
        display: none;
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
            padding-inline: 1.83em;
            margin: 0;
        }

        li.txc-mnv-cl-socials-item {
            display: flex;
            height: 26px;
            column-gap: calc(var(--font-size-1) * .75);
            align-items: center;

            & h3 {
                color: var(--grey-1);
                font-size: var(--font-size-1);
                font-weight: normal;
                text-transform: none;
            }

            .txc-mnv-cl-socials-item-icon-wrapper {
                height: 100%;
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
        }
    
    /*=====  End of Responsive  ======*/
    
    

</style>