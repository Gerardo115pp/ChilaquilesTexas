<script>
    import { external_links } from '@app/common/page_paths.js';
    import WorkInProgressBTN from '@components/Buttons/WorkInProgressBTN.svelte';
    import InstagramIcon from '@components/icons/InstagramIcon.svelte';
    import SpotifyIcon from '@components/icons/SpotifyIcon.svelte';
    import { getNavigatorLang } from '@libs/LangUtils.js';
    import { generateWorkInProgressPath } from '@libs/NavigationUtils.js';
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

<nav id="txc-navbar">
    <div id="txc-nv-content-right">
        <menu id="txc-nv-cr-navoptions">
            {#each nav_options as nv_option_item}
                <li class="txc-nv-cr-navoption">
                    <a href="{nv_option_item.href}" class="force-hover">
                        {nv_option_item.name}
                    </a>
                </li>
            {/each}
        </menu>
    </div>
    <div id="txc-nv-content-left">
        <ul id="txc-nv-cl-socials">
            <li class="txc-nv-cl-socials-item">
                <a target="_blank" rel="noopener noreferrer" href="{external_links.SPOTIFY}">
                    <h3 class="txc-nv-cl-socials-item-text">
                        Let our playlist ease you into the day
                    </h3>
                    <span class="txc-nv-cl-socials-item-icon-wrapper">
                        <SpotifyIcon />
                    </span>
                </a>
            </li>
            <li class="txc-nv-cl-socials-item">
                <a 
                   target="_blank"
                   rel="noopener noreferrer"
                   href="{external_links.INSTAGRAM}" 
                   class="txc-nv-cl-socials-item-icon-wrapper"
                >
                    <InstagramIcon />
                </a>
            </li>
        </ul>
        <WorkInProgressBTN 
            href={order_online_url}
            enabled_label="Order Online"
            id_selector="txc-nv-order-online-btn"
        />
    </div>
</nav>

<style>

    nav#txc-navbar {
        display: flex;
        container-type: inline-size;
        width: 100%;
        min-height: var(--navbar-height);
        height: max-content;
        justify-content: space-between;
    }
    
    /*=============================================
    =            NavOptions            =
    =============================================*/
    
        #txc-nv-content-right {
            display: grid;
            width: max-content;
            place-items: center;
        }
        
        menu#txc-nv-cr-navoptions {
            box-sizing: border-box;
            display: flex;
            width: max-content;
            font-size: 1.3cqw;
            gap: 5.5em;
            align-items: center;
            list-style: none;
            margin: 0;
            padding: 0;

            & li.txc-nv-cr-navoption a {
                font-family: var(--font-titles);
                color: var(--grey-1);
                font-weight: bold;
                text-transform: uppercase;
                text-decoration: none;
                white-space: nowrap;
            }
        }
    
    /*=====  End of NavOptions  ======*/
    
    /* TODO: Fucking dyslexia conspired against me again. This is actually on the RIGHT, not left. */
    #txc-nv-content-left {
        display: flex;
        column-gap: 5.528cqw;
    }
    
    /*=============================================
    =            Socials            =
    =============================================*/
    
        ul#txc-nv-cl-socials {
            display: flex;
            align-items: center;
            gap: 0.8em;
            margin: 0;
        }

        li.txc-nv-cl-socials-item {
            display: flex;
            height: 26px;
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
                font-size: var(--font-size-1);
                font-weight: normal;
                text-transform: none;
                text-decoration: none;
            }

            .txc-nv-cl-socials-item-icon-wrapper {
                height: 100%;
                aspect-ratio: 1 / 1;
            }
        }

    /*=====  End of Socials  ======*/
   
    
    /*=============================================
    =            Responsiveness            =
    =============================================*/
    
        @container (width < 1200px) {
            li.txc-nv-cl-socials-item h3.txc-nv-cl-socials-item-text {
                display: none;
            }
        }
    
    /*=====  End of Responsiveness  ======*/
    
    
</style>