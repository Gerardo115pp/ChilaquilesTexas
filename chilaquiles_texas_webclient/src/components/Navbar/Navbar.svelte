<script>
    import InstagramIcon from "@components/icons/InstagramIcon.svelte";
    import SpotifyIcon from "@components/icons/SpotifyIcon.svelte";
    import { external_links, website_page_paths } from "@app/common/page_paths";


    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
        * @typedef {Object} NavOption
         * @property {string} name
         * @property {string} href
        */

        /**
         * @type {NavOption[]}
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
    
    /*=====  End of Properties  ======*/
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
                <h3 class="txc-nv-cl-socials-item-text">
                    Let our playlist ease you into the day
                </h3>
                <span class="txc-nv-cl-socials-item-icon-wrapper">
                    <SpotifyIcon />
                </span>
            </li>
            <li class="txc-nv-cl-socials-item">
                <a href="{external_links.INSTAGRAM}" class="txc-nv-cl-socials-item-icon-wrapper">
                    <InstagramIcon />
                </a>
            </li>
        </ul>
        <button id="txc-nv-order-online-btn" class="txc-button">
            Order Online
        </button>
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
            font-size: 0.952380rem;
            gap: 3.2857rem;
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
            gap: 0.8095rem;
            margin: 0;
        }

        li.txc-nv-cl-socials-item {
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

            .txc-nv-cl-socials-item-icon-wrapper {
                height: 100%;
                aspect-ratio: 1 / 1;
            }
        }

    /*=====  End of Socials  ======*/
    
    
    
</style>