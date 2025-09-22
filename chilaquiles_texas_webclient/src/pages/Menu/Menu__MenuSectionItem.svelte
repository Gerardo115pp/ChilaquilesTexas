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
    <headlines class="txc-menu-msw-mi--item-header">
        <h4>
            {the_item.Title}
        </h4>
        {#if the_item.Price > 0}
            <strong class="price-tag">USD {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(the_item.Price)}</strong>
        {/if}
    </headlines>
    <div class="txc-menu-msw-mi--content">
        <p class="txc-menu-msw-mi--description">
            {the_item.Description}
        </p>
    </div>
</div>