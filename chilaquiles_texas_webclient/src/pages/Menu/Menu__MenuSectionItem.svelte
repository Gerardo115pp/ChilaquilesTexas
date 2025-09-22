<script>
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
        * @typedef {Object} MenuSectionItemProps
         * @property {import('@models/RestaurantMenu').MenuItem} the_item - The menu item to render.
        */ 

        /**
         * The menu item to render.
        * @type {MenuSectionItemProps}
         */
        let { the_item } = $props();
    
    /*=====  End of Properties  ======*/

</script>

<div class="txc-menu-msw-menu-item">
    <hgroup class="txc-menu-msw-mi--item-header">
        <h4 class="txc-menu-msw-mi--item-name">
            {the_item.Title}
        </h4>
        {#if the_item.Price > 0}
            <strong class="price-tag">USD {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(the_item.Price)}</strong>
        {/if}
    </hgroup>
    <div class="txc-menu-msw-mi--content">
        <p class="txc-menu-msw-mi--description">
            {the_item.Description}
        </p>
    </div>
</div>

<style>
    .txc-menu-msw-menu-item {
        display: flex;
        flex-direction: column;
        font-size: var(--font-size-1);
        gap: var(--spacing-1);
    }

    hgroup.txc-menu-msw-mi--item-header {
        display: flex;
        gap: 2ch;

        & h4.txc-menu-msw-mi--item-name {
            font-size: 1.1em;
        }
        & strong.price-tag {
            font-weight: lighter;
            font-size: .9em;
        }
    }
    .txc-menu-msw-mi--content { 
        & p.txc-menu-msw-mi--description { 
            font-size: .9;
            margin: 0;
        }
    }
</style>