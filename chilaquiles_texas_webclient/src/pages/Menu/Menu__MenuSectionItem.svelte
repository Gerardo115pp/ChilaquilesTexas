<script>
    import { browser } from '$app/environment';
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    
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

        /* --------------------------- Template Fragments --------------------------- */

            /**
             * The warning tag used for spicy level
             * @type {import('@models/RestaurantMenu').WarningTag | null} 
             */
            let spicy_level = $state(null);

        /* -------------------------------------------------------------------------- */

        /**
         * The item's warning tags that will be rendered.
         * @type {import('@models/RestaurantMenu').WarningTag[]}
         */
        let warning_tags = $state([]);

        /**
         * Enables dev tools debug mode.
         * @type {boolean}
         */
        const debug_mode = true;
    
    /*=====  End of Properties  ======*/

    onMount(() => {
        setupWarningTags(the_item);
    })
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        /*=============================================
        =            Debug            =
        =============================================*/

                /**
                 * Handle click on menu items when debug mode is enabled. it attaches an object with the
                 * state of the menu item component to the global object.
                 * @param {MouseEvent} event
                 */
                const debugMSI__debugClickHandler = (event) => {
                    if (!debug_mode) return;

                    debugMSI__attachDebugMethods();
                }
        
                /**
                 * Returns the object where all the gallery debug state is stored.
                 * @returns {Object}
                 */
                const debugMSI__getComponentDebugObject = () => {
                    if (!browser || !debug_mode) return {};

                    const DEBUG_STATE_NAME = "clicked_menu_item";

                    // @ts-ignore
                    if (!globalThis[DEBUG_STATE_NAME]) {
                        // @ts-ignore
                        globalThis[DEBUG_STATE_NAME] = {

                        };   
                    }

                    // @ts-ignore
                    return globalThis[DEBUG_STATE_NAME];
                }
        
                /**
                 * Attaches debug methods to the globalThis object for debugging purposes.
                 * @returns {void}
                 */
                const debugMSI__attachDebugMethods = () => {
                    if (!browser || !debug_mode) return;

                    const menu_section_item = debugMSI__getComponentDebugObject();

                    // @ts-ignore - for debugging purposes we do not care whether the globalThis object has the method name. same reason for all other ts-ignore in this function.
                    menu_section_item.printComponentState = debugMSI__printComponentState;

                    // @ts-ignore
                    menu_section_item.Page = page;

                    // @ts-ignore - state retrieval functions.
                    menu_section_item.State = {
                        the_item,
                        warning_tags,
                        spicy_level
                    }

                    // @ts-ignore - Internal method references.
                    menu_section_item.Methods = {
                        processWarningTags: () => setupWarningTags(the_item)
                    }
                }

                /**
                 * Prints the whole gallery state to the console.
                 * @returns {void}
                 */
                const debugMSI__printComponentState = () => {
                    console.log("%cPageBackground State", "color: green; font-weight: bold;");
                    console.group("Properties");
                    console.log(`the_item: %O`, the_item);
                    console.log(`warning_tags: %O`, $state.snapshot(warning_tags));
                    console.log(`spicy_level: %O`, spicy_level);
                    console.groupEnd();
                }

                /**
                 * Attaches an arbitrary object as a globalThis.meg_timeline_states.<group_name>{...timestamp -> object }.
                 * @param {string} group_name
                 * @param {object} object_to_snapshot
                 * @returns {void}
                 */
                const debugMSI__attachSnapshot = (group_name, object_to_snapshot) => {
                    if (!browser || !debug_mode) return;

                    const stack = new Error().stack;
                    const datetime_obj = new Date();
                    const timestamp = `${datetime_obj.toISOString()}-${datetime_obj.getTime()}`;

                    const snapshot = {
                        timestamp,
                        stack,
                        object_to_snapshot,
                    }

                    const debug_object = debugMSI__getComponentDebugObject();

                    // @ts-ignore - that meg_timeline_states exists on globalThis if not, create it.
                    if (!debug_object.timeline_states) {
                        // @ts-ignore
                        debug_object.timeline_states = {};
                    }

                    // @ts-ignore
                    if (!debug_object.timeline_states[group_name]) {
                        // @ts-ignore
                        debug_object.timeline_states[group_name] = [];
                    }

                    // @ts-ignore
                    debug_object.timeline_states[group_name].push(snapshot);
                }        
        
        /*=====  End of Debug  ======*/

        /**
         * A function that detects a specific Template fragment from a warning tag.
        * @callback WarningTag_TemplateFragmente_detector
         * @param {import('@models/RestaurantMenu').WarningTag} warning_tag
         * @returns {boolean}
        */

        /**
         * Detects and set the spicy warning tag
         * @type {WarningTag_TemplateFragmente_detector}
         */
        const detectSpicyLevelFragment = warning_tag => {
            const warning_tag_fragment = "{{spicy}}";
            let matches = false;

            if (warning_tag.Text === warning_tag_fragment) {
                matches = true;
                spicy_level = warning_tag;
            }
            
            return matches
        }

        /**
         * Process the warning tags. Separates plain text warning tags from template fragments.
         * @param {import('@models/RestaurantMenu').MenuItem} menu_item
         */
        const setupWarningTags = (menu_item) => {
            const new_warning_tags = /** @type {import('@models/RestaurantMenu').WarningTag[]}*/ ([]);

            for (let wt of menu_item.Warnings) {
                if (wt.isTemplateFragment()) {
                    processTemplateFragmentWarningTag(wt);
                    continue;
                }

                new_warning_tags.push(wt);
            }

            warning_tags = new_warning_tags;
        }

        /**
         * Process the given template fragment WarningTag
         * @param {import('@models/RestaurantMenu').WarningTag} warning_tag
         */
       const processTemplateFragmentWarningTag = (warning_tag) => {
            let template_fragment_detected = false;

            template_fragment_detected = detectSpicyLevelFragment(warning_tag);
            if (template_fragment_detected) return;

            console.error(`In @pages/Menu/Menu__MenuSectionItem.processTemplateFragmentWarningTag: Unrecognized template fragment in warning tag: %O`, warning_tag);
       }


    
    /*=====  End of Methods  ======*/
    
    
</script>

<div class="txc-menu-msw-menu-item"
    onclick={debugMSI__debugClickHandler}
>
    <hgroup class="txc-menu-msw-mi--item-header">
        <div class="txc-menu-msw-mi-ih-left">
            <h4 class="txc-menu-msw-mi--item-name">
                {the_item.Title}
            </h4>
            <strong class="price-tag">
                {#if the_item.Price > 0}
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(the_item.Price)}
                {/if}
            </strong>
            <ul class="txc-menu-msw-mi--item-warnings">
                {#if the_item.ParenthesesLabel}
                     <li class="txc-menu-msw-mi--item">
                        ({the_item.ParenthesesLabel})
                     </li>
                {/if}
                {#each warning_tags as warning_tag}
                    <li class="txc-menu-msw-mi--item txc-menu-msw-mi--item-warning {warning_tag.HtmlClasses}">
                        {warning_tag.Text}
                    </li>
                {/each}
            </ul>
        </div>
        <div class="txc-menu-msw-mi-ih-right">
        </div>
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

    
    /*=============================================
    =            Menu Item Header            =
    =============================================*/
    
        hgroup.txc-menu-msw-mi--item-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .txc-menu-msw-mi-ih-left {
            display: grid;
            max-width: 90%;
            grid-template-columns: minmax(auto, max-content) 5em;
            column-gap: 1em;

            & h4.txc-menu-msw-mi--item-name {
                grid-column: 1 / span 1;
                font-size: 1.1em;
            }

            & strong.price-tag {
                grid-column: 2 / span 1;
                font-size: .9em;
            }

            & ul.txc-menu-msw-mi--item-warnings {
                grid-column: 1 / -1;
                grid-row: 2;
            }
        }
    
    
    /*=====  End of Menu Item Header  ======*/
    
    



    .txc-menu-msw-mi--content { 
        & p.txc-menu-msw-mi--description { 
            font-size: .9;
            margin: 0;
        }
    }
</style>