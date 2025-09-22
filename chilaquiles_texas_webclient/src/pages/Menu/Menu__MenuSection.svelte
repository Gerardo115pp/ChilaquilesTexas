<script>
    import MenuSectionItem from './Menu__MenuSectionItem.svelte';

    /*=============================================
    =            Properties            =
    =============================================*/

        /**
        * @typedef {Object} MenuSectionProps
         * @property {import('@models/RestaurantMenu').MenuSection} the_section - The menu section to render.
        */
    
        /**
        * The menu section to render.
         * @type {MenuSectionProps}
         */
        let { the_section } = $props();

        /**
         * The section css id
         * @type {string}
         * @constant
         */
        const menu_section_id = `menu-section--${the_section.SectionUUID}`;

        /* -------------------------- extra content section ------------------------- */

            /**
             * The 'about' content some menu sections have. usually in a red box.
             * @type {HTMLElement | null}
             */
            let section_about_content = null;

            /**
             * The header top description
             * @type {HTMLElement | null}
             */
            let section_header_top_desc = null;

            /**
             * the header bottom description
             * @type {HTMLElement | null}
             */
            let section_header_bottom_desc = null;

    /*=====  End of Properties  ======*/
</script>



<div id={menu_section_id} class="txc-menu--menu-section-wrapper">
    <header class="txc-menu-msw--header">
        <h3 class="txc-menu-msw--section-title">
            {the_section.Title}
        </h3>
        {#if section_header_top_desc !== null}
            <div class="txc-menu-msw--top-description">
                {section_header_top_desc}
            </div>
        {/if}
        <div class="txc-menu-msw--image-wrapper">
            {#if the_section.TeaserImageUrl !== ""}
                <img src="{the_section.TeaserImageUrl}" alt="depicts a dish from {the_section.Title}">
            {/if}
        </div>
        {#if section_header_bottom_desc !== null}
            <div class="txc-menu-msw--bottom-description">
                {section_header_bottom_desc}
            </div>
        {/if}
    </header>
    <ul class="txc-menu-msw--section-items">
        {#each the_section.Items as menu_item}
            <li class="txc-menu-msw--section-item">
                <MenuSectionItem
                    the_item={menu_item}
                />
            </li>
        {/each}
    </ul>
    {#if section_about_content !== null}
        <footer class="txc-menu-msw--about-footer">
            {section_about_content}
        </footer>
    {/if}
</div>

<style>
    .txc-menu--menu-section-wrapper { 
        width: 100%;
        display: grid;
        grid-template-columns: 30% auto;
    }

    /*=============================================
    =            Header            =
    =============================================*/
    
        header.txc-menu-msw--header {
            font-size: var(--font-size-1)
        }

        h3.txc-menu-msw--section-title {
            font-size: 1em;
        }

        /* .txc-menu-msw--top-description {} */

        .txc-menu-msw--image-wrapper {
            width: 100%;

            & img {
                max-width: 100%;
                object-fit: contain;
            }
        }

        /* .txc-menu-msw--bottom-description {} */
    
    /*=====  End of Header  ======*/
    
    ul.txc-menu-msw--section-items { 
        display: flex;
        width: 100%;
        flex-wrap: wrap;

        & li.txc-menu-msw--section-item { 
            width: 40%;
            container-type: inline-size;
        }
    }


    /* footer.txc-menu-msw--about-footer { } */
</style>