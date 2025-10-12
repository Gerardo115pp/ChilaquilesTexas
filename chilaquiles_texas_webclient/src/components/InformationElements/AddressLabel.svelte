<script>
    import { external_links } from "@app/common/page_paths";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
        * @typedef {Object} AddressLabelProps
         * @property {string} [font_size="var(--txc-links-size, 1em)"]
        */  

        /**
         * @type {AddressLabelProps}
         */
        const { font_size="var(--txc-links-size, 1em)" } = $props();


    
    /*=====  End of Properties  ======*/
    
    
</script>

<a 
    id="txc-vbpl-footer-contact-address"
    target="_blank"
    rel="noopener noreferrer"
    href="{external_links.ADDRESS}"
    class="txc-vbpl-footer-contact-item"
    style:font-size="{font_size}"
>
    702 E 11TH STREET, HOUSTON, TEXAS
</a>

<style>
    a#txc-vbpl-footer-contact-address {
        white-space: nowrap;
        text-decoration: none;
    }
</style>