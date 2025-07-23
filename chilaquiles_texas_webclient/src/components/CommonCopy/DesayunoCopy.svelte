<script>
    import { website_page_paths } from "@app/common/page_paths";
</script>

<article id="txc-vbpl-common-copy--breakfast">
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
            our hometown: <a href="{website_page_paths.SAN_MIGUEL_PAGE.path}">San Miguel Cuyutlán</a>
        </p>
    </section>
    <section class="txc-vbpl-ccb-section">
        <p>
            <a href="{website_page_paths.COVER_MENU_PAGE.path}">Cooking</a> is more than<br/>
            just putting ingredients together.
        </p>
    </section>
    <section class="txc-vbpl-ccb-section">
        <p>
            <a href="{website_page_paths.COFFEE_PAGE.path}">Coffee</a> is how we connect
        </p>
    </section>
    <section class="txc-vbpl-ccb-section">
        <p>
            <a href="{website_page_paths.PAN_DULCE_PAGE.path}">Pan Dulce</a> is our religion</p>
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
        display: flex;
        flex-direction: column;
        font-size: var(--font-size-p);
        row-gap: 2.09em;

        & a {
            font-family: var(--font-titles);
        }

        & p {
            margin: 0;
        }
    }

    
    /*=============================================
    =            Header            =
    =============================================*/
    
        header#txc-vbpl-ccb-header {
            font-size: calc(var(--font-size-h1) * 0.49107);

            & hgroup {
                font-size: inherit;
            }

            & h1 {
                font-size: inherit;
                line-height: 1;
            }            

            & hgroup > h1 + p {
                font-family: var(--font-titles);
                line-height: 1;
                font-size: 0.8em;
            }
        }
    
    /*=====  End of Header  ======*/
    
    
</style>