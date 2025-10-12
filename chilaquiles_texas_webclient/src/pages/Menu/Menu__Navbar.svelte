<script>
    import { website_page_paths } from "@app/common/page_paths";
    import LosChilaquilesLogo from "@components/icons/LosChilaquilesLogo.svelte";
    import AddressLabel from "@components/InformationElements/AddressLabel.svelte";
    import OpenHoursLabel from "@components/InformationElements/OpenHoursLabel.svelte";
    import PhoneLabel from "@components/InformationElements/PhoneLabel.svelte";

    
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

<nav id="txc-ic-menu-navbar">
    <div id="txc-ic-menu-content--left">
        <button class="rmp-mn-locale-option" class:active-locale={current_locale === 'es'} onclick={() => onLocaleChange('es')}>
            Menú Español
        </button>
        <button class="rmp-mn-locale-option" class:active-locale={current_locale === 'en'} onclick={() => onLocaleChange('en')}>
            English Menu
        </button>
    </div>
    <div id="txc-ic-menu-content--center">
        <div class="txc-ic-mc-cc-content-item">
            <AddressLabel />
        </div>
        <div id="rmp-mn-logo-wrapper" class="txc-ic-mc-cc-content-item">
            <a href="{website_page_paths.HOME.path}">
                <LosChilaquilesLogo />
            </a>
        </div>
        <div class="txc-ic-mc-cc-content-item">
            <OpenHoursLabel />
        </div>
    </div>
    <div id="txc-ic-menu-content--right">
        <PhoneLabel />
    </div>
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
    
    
</style>