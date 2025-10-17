<script>
    import { external_links } from "@app/common/page_paths";
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
        * @typedef {Object} PhoneLabelProps
         * @property {string} [font_size="var(--txc-links-size, 1em)"]
        */  

        /**
         * @type {PhoneLabelProps}
         */
        const { font_size="var(--txc-links-size, 1em)" } = $props();


    
    /*=====  End of Properties  ======*/
    
    
</script>

<a 
    id="txc-vbpl-footer-contact-phone"
    target="_blank"
    rel="noopener noreferrer"
    href="{external_links.PHONE}"
    style:font-size="{font_size}"
>
    +1 713 393 7824
</a>

<style>
    a#txc-vbpl-footer-contact-phone {
        font-family: var(--font-titles);
        white-space: nowrap;
        text-decoration: none;
    }
</style>