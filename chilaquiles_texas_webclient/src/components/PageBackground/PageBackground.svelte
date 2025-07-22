<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';


    
    /*=============================================
    =            Properties            =
    =============================================*/

        /**
        * @typedef {Object} PageBackgroundProps
         * @property {import('@models/PageBackgrounds').PageBackground} page_background
        */
    
        /**
         * The page background object the billboard will render.
         * @type {PageBackgroundProps}
         */
        let { page_background } = $props();

        /**
         * The url of the `page_background` cover image.
         * @type {string | undefined}
         */
        let cover_image_url = $state();
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        if (!browser) return;

        loadCoverImage();
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * loads the cover image URL for the billboard.
         * @returns {void}
         */
        const loadCoverImage = () => {
            const new_cover_url = page_background.CoverImages.getFirstViableMedia();

            cover_image_url = new_cover_url;
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<div id="page-bg-billboard">
    <div id="pbgbill-underlay" class="pbgbill-content">
        {#if cover_image_url !== undefined}
            <div class="pbgbill-underlay-cover">
                <img 
                    src="{cover_image_url}"
                    alt=""
                >
            </div>
        {/if}
    </div>
    <div id="pbgbill-veneer"></div>
</div>

<style>
    #page-bg-billboard {
        width: 100%;
        height: 0;
        container-type: inline-size;

        & #pbgbill-underlay {
            z-index: var(--z-index-b-5);
        }

        & #pbgbill-veneer {
            z-index: var(--z-index-b-4);
        }
    }

    #pbgbill-underlay {
        container-type: size;

        & img, video {
            width: 100cqw;
            height: 100cqh;
        }
    }

    .pbgbill-content {
        position: fixed;
        inset: 0;
        width: 100cqw;
        height: 100dvh;
    }
</style>