<script>
    import { website_page_paths } from "@app/common/page_paths";
    import { page } from "$app/state";
    import { afterNavigate } from "$app/navigation";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * Current page. the value is use to determine what parts of the text get dimmed.
         * @type {string}
         */
        let current_page_pathname = $state(page.url.pathname);

        /**
         * Whether the current page is root(usually that means pathname is '/')
         * @type {boolean}
         */
        let is_root_page = $derived(current_page_pathname === website_page_paths.HOME.path);
    
    /*=====  End of Properties  ======*/

    afterNavigate(() => {
        handleCSRNavigate();
    })

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Updates `current_page_pathname`.
         * @returns {void}
         */
        const handleCSRNavigate = () => {
            current_page_pathname = page.url.pathname;
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<article id="txc-vbpl-common-copy--breakfast"
    style:--copy-color={is_root_page ? "var(--grey-1)" : "var(--grey-7)"}
>
    <header id="txc-vbpl-ccb-header">
        <hgroup id="txc-vbpl-ccb-header-headlines">
            <h1>
                Breakfast
            </h1>
            <p>
                is a state of mind
            </p>
        </hgroup>
    </header>
    <section class="txc-vbpl-ccb-section">
        <p>
            We use flavor to transport you to<br/>
            our hometown: <a class="force-hover" class:active-page={current_page_pathname === website_page_paths.SAN_MIGUEL_PAGE.path} href="{website_page_paths.SAN_MIGUEL_PAGE.path}">San Miguel Cuyutlán</a>
        </p>
    </section>
    <section class="txc-vbpl-ccb-section">
        <p>
            <a class="force-hover" class:active-page={current_page_pathname === website_page_paths.COVER_MENU_PAGE.path} href="{website_page_paths.COVER_MENU_PAGE.path}">Cooking</a> is more than<br/>
            just putting ingredients together.
        </p>
    </section>
    <section class="txc-vbpl-ccb-section">
        <p>
            <a class="force-hover" class:active-page={current_page_pathname === website_page_paths.COFFEE_PAGE.path} href="{website_page_paths.COFFEE_PAGE.path}">Coffee</a> is how we connect
        </p>
    </section>
    <section class="txc-vbpl-ccb-section">
        <p>
            <a class="force-hover" class:active-page={current_page_pathname === website_page_paths.PAN_DULCE_PAGE.path} href="{website_page_paths.PAN_DULCE_PAGE.path}">Pan Dulce</a> is our religion</p>
    </section>
    <section class="txc-vbpl-ccb-section">
        <hgroup>
            <h2>
                <span>Welcome to</span>
                <br/>
                <span>desayuno.</span>
            </h2>
        </hgroup>
    </section>
</article>

<style>
    article#txc-vbpl-common-copy--breakfast {
        --desayuno-titles-font-size: calc(var(--font-size-h1) * 0.39107);

        display: flex;
        flex-direction: column;
        color: var(--copy-color);
        font-size: min(var(--font-size-p), 2svh);
        row-gap: 2.09em;

        & a {
            color: inherit;
            font-family: var(--font-titles);
        }

        & a.active-page {
            color: var(--grey-1);
        }

        & p {
            color: inherit;
            margin: 0;
        }

        & p, h1, a {
            transition: color 0.3s ease-out;
        }

        & h1, h2 {
            font-size: var(--desayuno-titles-font-size);
        }
    }
    
    /*=============================================
    =            Header            =
    =============================================*/
    
        header#txc-vbpl-ccb-header {
            font-size: var(--desayuno-titles-font-size);

            & hgroup {
                font-size: inherit;
            }

            & h1 {
                font-size: 1.2em;
                line-height: 1;
            }            

            & hgroup > h1 + p {
                font-family: var(--font-titles);
                line-height: 1;
                font-size: 1em;
            }
        }
    
    /*=====  End of Header  ======*/

    
    @container mobile-vertical-cc (width <= 1080px)  {
        article#txc-vbpl-common-copy--breakfast {
            font-size: 4.2494cqh;
            row-gap: 10.4874cqh;
        }

        header#txc-vbpl-ccb-header {
            font-size: 11.0782cqh;
        }
    }
</style>