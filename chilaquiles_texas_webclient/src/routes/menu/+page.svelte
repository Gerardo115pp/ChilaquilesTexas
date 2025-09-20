<script>
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { 
        getMenuMetadata,
        getMenuSection
    } from "@models/RestaurantMenu";
    import MenuNavbar from "@pages/Menu/Menu__Navbar.svelte";
    import { onMount } from "svelte";
    
    /*=============================================
    =            Properties            =
    =============================================*/

        /**
         * @type {import('./$types').PageProps}
         */
        let { data:page_props } = $props();

        /**
         * The ISO 639 language code preferred by the user.
         * @type {string}
         */
        const user_lang = page_props.language;

        /**
         * The menu metadata.
         * @type {import('@models/RestaurantMenu').MenuMetadata | null}
         */
        let menu_metadata = $state(null);

        /**
         * @type {import('@models/RestaurantMenu').MenuSection | null}
         */
        let current_menu_section = $state(null);

        /**
         * Enables the debug mode for the component.
         * @type {boolean}
         * @constant
         */
        const debug_mode = true;

    /*=====  End of Properties  ======*/
    
    
    onMount(() => {
        setupMenuData();

        if (debug_mode) {
            debugMP__attachDebugMethods();
        }
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/
        
        /*=============================================
        =            Debug            =
        =============================================*/
        
                /**
                 * Returns the object where all the gallery debug state is stored.
                 * @returns {Object}
                 */
                const debugMP__getComponentDebugObject = () => {
                    if (!browser || !debug_mode) return {};

                    const DEBUG_STATE_NAME = "menu_page";

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
                const debugMP__attachDebugMethods = () => {
                    if (!browser || !debug_mode) return;

                    const meg_gallery_debug_state = debugMP__getComponentDebugObject();

                    // @ts-ignore - for debugging purposes we do not care whether the globalThis object has the method name. same reason for all other ts-ignore in this function.
                    meg_gallery_debug_state.printComponentState = debugMP__printComponentState;

                    // @ts-ignore
                    meg_gallery_debug_state.Page = page;

                    // @ts-ignore - state retrieval functions.
                    meg_gallery_debug_state.State = {
                        getUserLang: () => user_lang,
                    }

                    // @ts-ignore - Internal method references.
                    meg_gallery_debug_state.Methods = {
                        getMenuMetadata
                    }
                }

                /**
                 * Prints the whole gallery state to the console.
                 * @returns {void}
                 */
                const debugMP__printComponentState = () => {
                    console.log("%cPageBackground State", "color: green; font-weight: bold;");
                    console.group("Properties");
                    // console.log(`page_background: %O`, page_background);
                    // console.log(`is_page_background_cover_loaded: ${is_page_background_cover_loaded}`);
                    // console.log(`is_page_background_video_loaded: ${is_page_background_video_loaded}`);
                    // console.log(`cover_image_url: ${cover_image_url}`);
                    // console.log(`video_background_url: ${video_background_url}`);
                    // console.log(`video_transition_frame: ${video_transition_frame}`);
                    console.groupEnd();
                }

                /**
                 * Attaches an arbitrary object as a globalThis.meg_timeline_states.<group_name>{...timestamp -> object }.
                 * @param {string} group_name
                 * @param {object} object_to_snapshot
                 * @returns {void}
                 */
                const debugMP__attachSnapshot = (group_name, object_to_snapshot) => {
                    if (!browser || !debug_mode) return;

                    const stack = new Error().stack;
                    const datetime_obj = new Date();
                    const timestamp = `${datetime_obj.toISOString()}-${datetime_obj.getTime()}`;

                    const snapshot = {
                        timestamp,
                        stack,
                        object_to_snapshot,
                    }

                    const debug_object = debugMP__getComponentDebugObject();

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

        
        /*=============================================
        =            Setup            =
        =============================================*/
        
            /**
             * Sets the necessary data to render the first menu section.
             * @returns {Promise<void>}
             */
            const setupMenuData = async () => {
                /**
                 * @type {import('@models/RestaurantMenu').MenuMetadata | null}
                 */
                let new_metadata = null;

                try {
                    new_metadata = await loadMenuMetadata();
                } catch (error) {
                    console.error("In @routes/menu/+page.svelte.setupMenuData: failed to load menu metadata", error);

                    return;
                }

                menu_metadata = new_metadata;

                if (menu_metadata.load_order.length < 0) {
                    console.error("In @routes/menu/+page.svelte.setupMenuData: menu metadata has no sections to load.");
                    return;
                }

                let first_section_file = menu_metadata.load_order[0];

                let first_section = await loadMenuSection(first_section_file);

                if (first_section === null) {
                    console.error(`In @routes/menu/+page.svelte.setupMenuData: failed to load first menu section: ${first_section_file}`);
                    return;
                }

                current_menu_section = first_section;
            }
        
        /*=====  End of Setup  ======*/

        /**
         * Loads the menu metadata for the user's preferred language if available, otherwise falls back to the default language.
         * @returns {Promise<import('@models/RestaurantMenu').MenuMetadata>}
         */
        const loadMenuMetadata = async () => {
            const new_metadata = await getMenuMetadata(user_lang);

            if (new_metadata === null) {
                throw new Error(`In @routes/menu/+page.svelte.loadMenuMetadata: failed to load menu metadata.`);
            }

            return new_metadata;
        }

        /**
         * Loads the given menu section by filename.
         * @param {string} section_file
         * @returns {Promise<import('@models/RestaurantMenu').MenuSection | null>}
         */
        const loadMenuSection = async (section_file) => {
            if (menu_metadata === null) {
                console.error("In @routes/menu/+page.svelte.loadMenuSection: menu metadata is not loaded yet.");
                return null;
            }

            /** @type {import('@models/RestaurantMenu').MenuSection | null} */
            let menu_section = null;

            menu_section = await getMenuSection(section_file, menu_metadata.lang);

            return menu_section;
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<main id="txc-restaurant-menu-page">
    <div id="txc-rmp-content-wrapper">
        <header id="txc-rmp--navbar" class="txc-rmp-content-area">
            <MenuNavbar />
        </header>
        <div id="txc-rmp--menu-listing" class="txc-rmp-content-area"><article class="txc-common-main-content-layout" id="rmp-ml--san-miguel-copy">
            <header id="rmp-ml-smc--header">
                <h2>
                    FROM SAN MIGUEL,<br>WITH FLAVOR
                </h2>
                <p class="main-content-paragraph">
                    Oursisa kitchen born inthe<br> highlands ofSan Miguel Cuyutlán,<br>
                    wherecows still have names and<br> every recipehasa reason.<br>
                    Wedon’t rush.We simmer, steep,<br> stirwithmemory,notmanuals,<br>
                    becausebreakfast hasno rules.
                </p>
                <h1>
                    Welcome to<br>Los Chilaquiles.
                </h1>
            </header>
        </article></div>
        <div id="txc-rmp--menu-content" class="txc-rmp-content-area">
            {#if current_menu_section !== null}
                menu content: {current_menu_section.Title}
            {/if}
        </div>
    </div>
</main>

<style>
    main#txc-restaurant-menu-page {
        width: 100%;
        min-height: 100dvh;
    }
    
    #txc-rmp-content-wrapper {
        --content-separation-border: 1px solid var(--grey-5);
        
        display: grid;
        grid-template-columns: minmax(250px, 30%) repeat(2, 1fr);
        row-gap: var(--spacing-3);
        grid-template-rows: minmax(100px, 18%) 1fr;
        padding-block: var(--spacing-1);
        padding-inline: var(--spacing-2);

    }
    
    /*=============================================
    =            Menu content            =
    =============================================*/

        .txc-rmp-content-area {
            width: 100%;
            height: 100%;
        }
        
        /*----------  Menu navbar  ----------*/
        
            header#txc-rmp--navbar {
                grid-column: 1 / -1;
                grid-row: 1 / 2;
                border-bottom: var(--content-separation-border);
            }
        
        /*----------  Listing  ----------*/

            #txc-rmp--menu-listing {
                grid-column: 1 / span 1;
                grid-row: 2 / span 1;
                border-right: var(--content-separation-border);
            }

            article#rmp-ml--san-miguel-copy {
                color: var(--theme-color);
            }
        
        /*----------  Content  ----------*/

            #txc-rmp--menu-content {
                grid-column: 2 / span 1;
                grid-row: 2 / span 1
            }

    
    /*=====  End of Menu content  ======*/
</style>