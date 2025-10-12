<script>
    import { external_links } from "@app/common/page_paths";
    
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
    id="txc-vbpl-footer-contact-email"
    target="_blank"
    rel="noopener noreferrer"
    href="{external_links.EMAIL}"
    style:font-size="{font_size}"
>
    hola@loschilaquiles.com
</a>

<style>
    a#txc-vbpl-footer-contact-email {
        font-family: var(--font-titles);
        white-space: nowrap;
        text-decoration: none;
    }
</style>