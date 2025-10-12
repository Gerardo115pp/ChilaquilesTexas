<script>
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
        * @typedef {Object} OpenHoursProps
         * @property {string} [font_size="var(--txc-links-size, 1em)"]
        */  

        /**
         * @type {OpenHoursProps}
         */
        const { font_size } = $props();

    
    /*=====  End of Properties  ======*/
    
    
</script>

<hgroup id="txc-vbpl-footer-open-days"
    style:font-size="{font_size}"
>
    <h4>
        SEVEN DAYS A WEEK / <strong>FROM 7AM TO 3PM</strong>
    </h4>
</hgroup>

<style>
    hgroup#txc-vbpl-footer-open-days {
        display: flex;
        align-self: stretch;
        border: 1px solid currentColor;
        place-items: center;
        padding-inline: 1.1428em;
        padding-block: 0.6em;
        white-space: nowrap;

        & h4 {
            font-family: var(--font-read);
        }

        & h4 > strong {
            font-family: var(--font-titles);
        }
    }

    @container (width <= 980px) {


        hgroup#txc-vbpl-footer-open-days {
            display: flex;
            justify-content: center;
            padding-inline: 0;
            padding: min(13px, calc(var(--spacing-3) * 0.90625)) 0;
        }
    }
</style>