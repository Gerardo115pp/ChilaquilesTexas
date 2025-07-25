<script>
    import { image_resources } from "@app/common/page_medias";
    import { onMount } from "svelte";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * The restaurant's image url.
         * @type {string | undefined}
         */
        let restaurant_image_url = $state();
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        loadRestaurantImageUrl();
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Loads the restaurant's image url.
         * @returns {void}
         */
        const loadRestaurantImageUrl = () => {
            const new_image_url = image_resources.RESTAURANT_RENDER.getFirstViableMedia();

            restaurant_image_url = new_image_url;
        }
    
    /*=====  End of Methods  ======*/
    
    
    
</script>
<main id="txc-cover-menu-page">
    <article id="txc-cm-content" class="txc-common-main-content-layout">
        <header id="txc-cm-content-header">
            <h1 id="txc-cm-ch-title">
                Los Chilaquiles<br/>
                <strong>
                    NOW OPENS IN HOUSTON
                </strong>
            </h1>
        </header>
        <p class="txc-cm-content-p main-content-paragraph">
            After 20 years of cooking in Mexico,<br/>
            we brought our kind of breakfast to Houston.One that moves at its own pace,<br/>
            and doesn't care what the clock says.Because here, breakfast has no rules,<br/>
            and that's exactly how we like it.
        </p>
        <ul class="txc-ctas-container">
            <button class="txc-button">
                Menu & Order Online
            </button>
        </ul>
    </article>
    <aside id="txc-cm-restaurant-image-wrapper">
        {#if restaurant_image_url != null}
            <img 
                id="txc-cm-restaurant-image"
                src="{restaurant_image_url}" 
                alt="This is our magnificent restaurant" 
            >
        {/if}
    </aside>
</main>

<style>
    main#txc-cover-menu-page {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: space-between;
    }
</style>