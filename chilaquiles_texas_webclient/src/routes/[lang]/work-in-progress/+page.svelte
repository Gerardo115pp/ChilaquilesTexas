<script>
    import { website_page_paths } from '@app/common/page_paths';
    import LosChilaquilesLogo from '@components/icons/LosChilaquilesLogo.svelte';
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * @type {import('./$types').PageProps}
         */
        let { data:page_props } = $props();

        /**
         * Work in progress label.
         * @type {string}
         */
        const work_in_progress_label = page_props.work_in_progress_label;
       
    /*=====  End of Properties  ======*/

</script>

<main id="txc-work-in-progress-page">
    <header id="txc-wip-page-header">
        <nav id="txc-ic-menu-navbar">
            <div id="wipp-navbar-logo">
                <a href="{website_page_paths.HOME.path}">
                    <LosChilaquilesLogo />
                </a>
            </div>
        </nav>
    </header>
    <div id="txc-page-content-wrapper">
        <h1>{work_in_progress_label}</h1>
    </div>
</main>

<style>

    main#txc-work-in-progress-page {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 15% auto;
        width: 100svw;
        height: 100svh;
        container-type: size;
        overflow: hidden;
    }
    
    /*=============================================
    =            Navbar            =
    =============================================*/
    
        nav#txc-ic-menu-navbar {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            column-gap: var(--spacing-2);
            align-items: center;
        }

        #wipp-navbar-logo {
            width: min(300px, 80%);
            height: max-content;

            & > a {
                width: 100%;
            }
        }
    
    /*=====  End of Navbar  ======*/
    
    #txc-page-content-wrapper {
        display: grid;
        place-items: center;

        & > h1 {
            width: 60%;
            text-align: center;
        }
    }
    
</style>