<script>
    import MenuNavbar from "@pages/Menu/Menu__Navbar.svelte";
</script>

<main id="txc-restaurant-menu-page">
    <div id="txc-rmp-content-wrapper">
        <header id="txc-rmp--navbar" class="txc-rmp-content-area">
            <MenuNavbar />
        </header>
        <div id="txc-rmp--menu-listing" class="txc-rmp-content-area"><article class="txc-common-main-content-layout" id="rmp-ml--san-miguel-copy">
            <header id="rmp-ml-smc--header">
                <h2>
                    FROM SAN MIGUEL,<br>WITH FLAVOR
                </h2>
                <p class="main-content-paragraph">
                    Oursisa kitchen born inthe<br> highlands ofSan Miguel Cuyutlán,<br>
                    wherecows still have names and<br> every recipehasa reason.<br>
                    Wedon’t rush.We simmer, steep,<br> stirwithmemory,notmanuals,<br>
                    becausebreakfast hasno rules.
                </p>
                <h1>
                    Welcome to<br>Los Chilaquiles.
                </h1>
            </header>
        </article></div>
        <div id="txc-rmp--menu-content" class="txc-rmp-content-area">menu content</div>
    </div>
</main>

<style>
    main#txc-restaurant-menu-page {
        width: 100%;
        min-height: 100dvh;
    }
    
    #txc-rmp-content-wrapper {
        --content-separation-border: 1px solid var(--grey-5);
        
        display: grid;
        grid-template-columns: minmax(250px, 30%) repeat(2, 1fr);
        row-gap: var(--spacing-3);
        grid-template-rows: minmax(100px, 18%) 1fr;
        padding-block: var(--spacing-1);
        padding-inline: var(--spacing-2);

    }
    
    /*=============================================
    =            Menu content            =
    =============================================*/

        .txc-rmp-content-area {
            width: 100%;
            height: 100%;
        }
        
        /*----------  Menu navbar  ----------*/
        
            header#txc-rmp--navbar {
                grid-column: 1 / -1;
                grid-row: 1 / 2;
                border-bottom: var(--content-separation-border);
            }
        
        /*----------  Listing  ----------*/

            #txc-rmp--menu-listing {
                grid-column: 1 / span 1;
                grid-row: 2 / span 1;
                border-right: var(--content-separation-border);
            }

            article#rmp-ml--san-miguel-copy {
                color: var(--theme-color);
            }
        
        /*----------  Content  ----------*/

            #txc-rmp--menu-content {
                grid-column: 2 / span 1;
                grid-row: 2 / span 1
            }

    
    /*=====  End of Menu content  ======*/
</style>