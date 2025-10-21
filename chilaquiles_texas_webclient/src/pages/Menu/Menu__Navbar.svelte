<script>
    import { website_page_paths } from "@app/common/page_paths";
    import LosChilaquilesLogo from "@components/icons/LosChilaquilesLogo.svelte";
    import AddressLabel from "@components/InformationElements/AddressLabel.svelte";
    import OpenHoursLabel from "@components/InformationElements/OpenHoursLabel.svelte";
    import PhoneLabel from "@components/InformationElements/PhoneLabel.svelte";
    import layout_properties from "@stores/layout/layout";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
        * @typedef {Object} MenuNavbarProps
         * @property {string} current_locale
         * @property {import('./menu_page_components').MenuLocaleChangeCallback} onLocaleChange
        */

        /**
         * @type {MenuNavbarProps}
         */
        let { 
            current_locale,
            onLocaleChange
        } = $props();
    
    /*=====  End of Properties  ======*/
    
</script>

{#snippet lang_controller()}
    <button class="rmp-mn-locale-option" class:active-locale={current_locale === 'es'} onclick={() => onLocaleChange('es')}>
        Menú Español
    </button>
    <button class="rmp-mn-locale-option" class:active-locale={current_locale === 'en'} onclick={() => onLocaleChange('en')}>
        English Menu
    </button>
{/snippet}
{#snippet logo_element()}
    <div id="rmp-mn-logo-wrapper" class="txc-menu-navbar-item">
        <a href="{website_page_paths.HOME.path}">
            <LosChilaquilesLogo />
        </a>
    </div>
{/snippet}
{#snippet address_element()}
    <div class="txc-menu-navbar-item">
        <AddressLabel />
    </div>
{/snippet}
{#snippet open_hours_element()}
    <div class="txc-menu-navbar-item">
        <OpenHoursLabel />
    </div>
{/snippet}
{#snippet phone_element()}
    <div class="txc-menu-navbar-item">
        <PhoneLabel />
    </div>
{/snippet}

<nav id="txc-ic-menu-navbar">
    {#if $layout_properties.ORIENTATION_LANDSCAPE}
        <div id="txc-ic-menu-content--left">
            {@render lang_controller()}
        </div>
        <div id="txc-ic-menu-content--center">
            {@render address_element()}
            {@render logo_element()}
            {@render open_hours_element()}
        </div>
        <div id="txc-ic-menu-content--right">
            {@render phone_element()}
        </div>
    {:else}
        <div id="txc-ic-menu-content-mobile--logo" class="txc-ic-menu-content-mobile--content-row">
            {@render logo_element()}
        </div>
        <div id="txc-ic-menu-content-mobile--lang-controlers" class="txc-ic-menu-content-mobile--content-row">
            {@render lang_controller()}
        </div>
        <div id="txc-ic-menu-content-mobile--open-days" class="txc-ic-menu-content-mobile--content-row">
            {@render open_hours_element()}
        </div>
        <div id="txc-ic-menu-content-mobile--misc-address" class="txc-ic-menu-content-mobile--content-row">
            {@render address_element()}
            {@render phone_element()}
        </div>
    {/if}
</nav>

<style>
    nav#txc-ic-menu-navbar {
        width: 100%;
        height: 100%;
        display: flex;
        container-type: size;
        justify-content: space-between;
        align-items: center;
        font-size: min(calc(var(--font-size-1) * .95), .75dvw);
    }

    /* -------------------------------------------------------------------------- */
    /*                              LANDSCAPE LAYOUT                              */
    /* -------------------------------------------------------------------------- */

        /*----------  Left content  ----------*/
        
            #txc-ic-menu-content--left {
                display: flex;
            }

            button.rmp-mn-locale-option {
                font-family: var(--font-read);
                background: transparent;
                border: none;
                color: var(--body-fg-color);
                text-transform: none;
                font-size: 1em;
                transition: color 0.3s ease-out, scale 0.1s ease-out;
                padding-block: 0;
                padding-inline: 1em;
                
                &.active-locale {
                    font-weight: bolder;
                    text-decoration: underline;
                    color: hsl(from var(--theme-color) h s calc(l * 0.8) / 1);
                }

                &:not(.active-locale):hover {
                    cursor: pointer;
                    color: hsl(from var(--theme-color) h 100% l / 1);
                    transform-origin: center;
                    scale: 1.03;
                }

                &:not(:last-child) {
                    border-right: 1px solid var(--body-fg-color);
                }
            }

        
        /*----------  Center Content  ----------*/

            #txc-ic-menu-content--center {
                display: flex;
                align-items: center;
                gap: 3em;
            }

            #rmp-mn-logo-wrapper {
                width: min(200px, 9.5cqw);
                height: max-content;

                & > a {
                    width: 100%;
                }
            }

        
        /*----------  Right Content  ----------*/
        #txc-ic-menu-content--right {
            font-size: 1.2em;
        }
    
    /* -------------------------------------------------------------------------- */
    /*                              RESPONSIVE RULES                              */
    /* -------------------------------------------------------------------------- */

        @media (max-aspect-ratio: 0.99) {
            /* not landscape */
            nav#txc-ic-menu-navbar {
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: repeat(4, 1fr);
                font-size: min(calc(var(--font-size-3) * 1.6), 3dvw);
            }

            #rmp-mn-logo-wrapper {
                width: 40cqw;
                /* margin: 0 auto; */
            }
        }

        .txc-ic-menu-content-mobile--content-row{
            display: flex;
            justify-content: center;
        }
        
        #txc-ic-menu-content-mobile--misc-address, #txc-ic-menu-content-mobile--open-days {
            font-size: 1.24em;
        }

        #txc-ic-menu-content-mobile--open-days {
            & .txc-menu-navbar-item {
                width: 100%;
            }
        }

        #txc-ic-menu-content-mobile--misc-address {
            justify-content: space-between;
        }
</style>