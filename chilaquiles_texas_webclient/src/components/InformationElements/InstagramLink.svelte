<script>
    import { external_links } from "@app/common/page_paths";
    import InstagramIcon from "@components/icons/InstagramIcon.svelte";
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
        * @typedef {Object} EmailLabelProps
         * @property {string} [font_size="var(--txc-links-size, 1em)"]
        */  

        /**
         * @type {EmailLabelProps}
         */
        const { font_size } = $props();

    
    /*=====  End of Properties  ======*/
    
    
</script>

<a 
    id="txc-vbpl-footer-instagram"
    target="_blank"
    rel="noopener noreferrer"
    href="{external_links.INSTAGRAM}" 
    class="txc-nv-cl-socials-item-icon-wrapper"
    style:font-size="{font_size}"
>
    <InstagramIcon />
</a>

<style>
    a#txc-vbpl-footer-instagram {
        font-family: var(--font-titles);
        white-space: nowrap;
        text-decoration: none;
    }
</style>