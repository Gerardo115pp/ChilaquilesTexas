<script>
    import { website_page_paths } from "@app/common/page_paths";
    import LosChilaquilesLogo from "@components/icons/LosChilaquilesLogo.svelte";

    
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
    <button class="rmp-mn-locale-option" class:active-locale={current_locale === 'en'} onclick={() => onLocaleChange('en')}>
        English
    </button>
    <div id="rmp-mn-logo-wrapper">
        <a href="{website_page_paths.HOME.path}">
            <LosChilaquilesLogo />
        </a>
    </div>
    <button class="rmp-mn-locale-option" class:active-locale={current_locale === 'es'} onclick={() => onLocaleChange('es')}>
        Español
    </button>
</nav>

<style>
    nav#txc-ic-menu-navbar {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        column-gap: var(--spacing-2);
        align-items: center;
    }

    button.rmp-mn-locale-option {
        font-family: var(--font-read);
        background: transparent;
        border: none;
        color: hsl(from var(--theme-color) h s calc(l * 0.8) / 1);
        text-transform: none;
        font-size: var(--font-size-1);
        transition: color 0.3s ease-out;
        
        &.active-locale {
            font-weight: bolder;
            text-decoration: underline;
        }
        
        &:not(.active-locale):hover {
            cursor: pointer;
            color: hsl(from var(--theme-color) h calc(s * 0.5) calc(l * 0.9) / 1);
        }
    }

    #rmp-mn-logo-wrapper {
        width: min(200px, 9.5%);
        height: max-content;

        & > a {
            width: 100%;
        }
    }
</style>