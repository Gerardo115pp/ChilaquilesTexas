<script>
    import { getNavigatorLang } from "@libs/LangUtils";
    import { onMount } from "svelte";
    
    /*=============================================
    =            Properties            =
    =============================================*/

        /**
        * @typedef {Object} WorkInProgressBTNProps
         * @property {string} enabled_label
         * @property {string} href
         * @property {string | null} [id_selector=null] 
         * @property {boolean} [enabled=false]
        */

        /**
         * @type {WorkInProgressBTNProps}
         */
        let {
            enabled_label,
            href,
            id_selector=null,
            enabled: btn_enabled= false,
        } = $props();

        /**
         * The default work-in-progress label
         * @type {string}
         */
        const default_work_in_progress_label = "Coming soon...";
    
        /**
         * The work in progress labels for supported languages.
         * @type {Map<string, string>}
         */
        const work_in_progress_labels = new Map([
            ["en", default_work_in_progress_label],
            ["es", "Ya Merito..."]
        ]);

        /**
         * The used work-in-progress label.
         * @type {string}
         */
        let current_work_in_progress_label = $state(btn_enabled ? enabled_label : default_work_in_progress_label);
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        configureNavigatorLang();
    });

    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /**
         * Configures the correct menu section for the navigator's lang.
         * @returns {void}
         */
        const configureNavigatorLang = () => {
            if (btn_enabled) return;

            const navigator_lang = getNavigatorLang("en");
            const new_work_in_progress_label = work_in_progress_labels.get(navigator_lang);

            if (new_work_in_progress_label == null) return;

            current_work_in_progress_label = new_work_in_progress_label;
        }
    
    /*=====  End of Methods  ======*/
</script>

<a id={id_selector} href="{btn_enabled ? href : null}" class="txc-button" class:disabled={!btn_enabled}>
    {current_work_in_progress_label}
</a>