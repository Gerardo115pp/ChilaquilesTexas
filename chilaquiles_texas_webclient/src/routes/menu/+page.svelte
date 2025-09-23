<script>
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { 
        getMenuMetadata,
        getMenuSection
    } from "@models/RestaurantMenu";
    import MenuSectionComponent from "@pages/Menu/Menu__MenuSection.svelte";
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
        let user_lang = $state(page_props.language);

        /**
         * The menu metadata.
         * @type {import('@models/RestaurantMenu').MenuMetadata | null}
         */
        let menu_metadata = $state(null);

        /**
         * @type {import('@models/RestaurantMenu').MenuSection | null}
         * @deprecated
         */
        let current_menu_section = $state(null);

        /**
         * The list of loaded menu sections.
         * @type {import('@models/RestaurantMenu').MenuSection[]}
         */
        let loaded_menu_sections = $state([]);

        /**
         * A file to MenuSection map used to scroll to sections when clicking on the menu listing.
         * @type {Map<string, import('@models/RestaurantMenu').MenuSection>}
         */
        let menu_section_map = new Map();

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
                        getMenuMetadata,
                        getLoadedMenuSections: () => loaded_menu_sections,
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

                loaded_menu_sections = [first_section];

                requestIdleCallback(progressivelyLoadAllMenuSections);
            }
        
        /*=====  End of Setup  ======*/

        /**
         * Changes the locale to the give ISO 639 language code.
         * @param {string} new_locale
         * @returns {Promise<void>}
         */
        const changeLocale = async (new_locale) => {
            if (menu_metadata === null) {
                console.error("In @routes/menu/+page.svelte.changeLocale: menu metadata is not loaded yet.");
                return;
            }

            if (new_locale === menu_metadata.lang) return;

            resetMenuState();

            user_lang = new_locale;

            setupMenuData();
        }

        /**
         * Returns an html element containing the menu section with the given filename.
         * @param {string} section_file
         * @returns {HTMLElement | null}
         */
        const getMenuSectionElementByFile = (section_file) => {
            const menu_section = menu_section_map.get(section_file);

            if (menu_section === undefined) return null;

            const menu_section_id = `menu-section--${menu_section.SectionUUID}`;

            return document.getElementById(menu_section_id);
        }

        /**
         * Handles the change of the menu locale from the navbar.
         * @param {string} new_locale
         * @return {void}
         */
        const handleLocaleChange = (new_locale) => {
            console.log(`Locale change requested: ${new_locale}`);

            changeLocale(new_locale);
        }

        /**
         * Handles the click on a menu section from the listing.
         * @param {MouseEvent} event
         * @returns {void}
         */
        const handleMenuSectionClick = (event) => {
            const target = event.target;

            if (!(target instanceof HTMLElement)) return;

            const section_file = target.dataset.sectionFile;

            if (!section_file) return;

            console.log(`Menu section click requested: ${section_file}`);

            const section_element = getMenuSectionElementByFile(section_file);
            
            if (section_element === null) {
                console.error(`In @routes/menu/+page.svelte.handleMenuSectionClick: failed to find menu section element for file: ${section_file}`);
                return;
            }

            section_element.scrollIntoView({
                behavior: 'instant',
                block: 'start',
            });
        }

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

            if (menu_section !== null) {
                menu_section_map.set(section_file, menu_section);
            }

            return menu_section;
        }

        /**
         * Recursive function that progressively loads all menu sections while giving the DOM time to breathe.
         * @returns {Promise<void>}
         */
        const progressivelyLoadAllMenuSections = async () => {
            if (menu_metadata === null) {
                console.error("In @routes/menu/+page.svelte.progressivelyLoadAllMenuSections: menu metadata is not loaded yet.");
                return;
            }

            if (loaded_menu_sections.length >= menu_metadata.load_order.length) return;

            const next_section_file = menu_metadata.load_order[loaded_menu_sections.length];

            const next_section = await loadMenuSection(next_section_file);

            if (next_section === null) {
                console.error(`In @routes/menu/+page.svelte.progressivelyLoadAllMenuSections: failed to load menu section: ${next_section_file}`);
                return;
            }

            loaded_menu_sections = [...loaded_menu_sections, next_section];

            requestIdleCallback(progressivelyLoadAllMenuSections)
        }

        /**
         * Resets the loaded menu state.
         * @returns {void}
         */
        const resetMenuState = () => {
            menu_metadata = null;
            current_menu_section = null;
            loaded_menu_sections = [];
            menu_section_map.clear();
        }
    
    /*=====  End of Methods  ======*/
    
</script>

<main id="txc-restaurant-menu-page">
    <div id="txc-rmp-content-wrapper">
        <header id="txc-rmp--navbar" class="txc-rmp-content-area">
            <MenuNavbar 
                current_locale={menu_metadata !== null ? menu_metadata.lang : user_lang}
                onLocaleChange={handleLocaleChange}
            />
        </header>
        <div id="txc-rmp--menu-listing" class="txc-rmp-content-area">
            <article id="rmp-ml--san-miguel-copy">
                <header id="rmp-ml-smc--header">
                    <h2>
                        FROM SAN MIGUEL,<br>WITH FLAVOR
                    </h2>
                    <p class="main-content-paragraph">
                        Ours is a kitchen born in the<br> highlands of San Miguel Cuyutlán,<br>
                        where cows still have names and<br> every recipe has a reason.<br>
                        We don’t rush. We simmer, steep,<br> stir with memory, not manuals,<br>
                        because breakfast has no rules.
                    </p>
                    <h1>
                        Welcome to<br>Los Chilaquiles.
                    </h1>
                </header>
            </article>
            <div id="txc-rmp-ml-calls-to-action">
                <button class="discourage-btn">
                    Download
                </button>
                <button >
                    Order Online
                </button>
            </div>
            <ol id="txc-rmp-ml--sections-list">
                {#if menu_metadata}
                    {#each menu_metadata.menu_listing as section_item}
                        <li onclick={handleMenuSectionClick} class="txc-rmp-ml--listing-section-item" data-section-file={section_item.section_file}>
                            {section_item.section_name}
                        </li>
                    {/each}
                {/if}
            </ol>
        </div>
        <article id="txc-rmp--menu-content" class="txc-rmp-content-area">
                {#if menu_metadata}
                    {#each loaded_menu_sections as menu_section}
                        <section class="txc-rmp-menu-section-wrapper">
                            <MenuSectionComponent
                                the_section={menu_section}
                            />
                        </section>
                    {/each}
                {/if}
        </article>
    </div>
</main>

<style>
    main#txc-restaurant-menu-page {
        width: 100svw;
        height: 100svh;
        container-type: size;
        overflow: hidden;
    }
    
    #txc-rmp-content-wrapper {
        --content-separation-border: 1px solid var(--grey-5);
        
        display: grid;
        width: 100cqw;
        height: 100cqh;
        grid-template-columns: minmax(250px, 30%) repeat(2, 1fr);
        row-gap: var(--spacing-3);
        grid-template-rows: minmax(100px, 10cqh) 1fr;
        padding-block: var(--spacing-1);
        padding-inline: var(--spacing-2);

    }

    .txc-rmp-content-area {
        width: 100%;
        height: 100%;
    }
    
    /*=============================================
    =            Menu layout grid            =
    =============================================*/

        /*----------  Menu navbar  ----------*/
        
            header#txc-rmp--navbar {
                grid-column: 1 / -1;
                grid-row: 1 / 2;
            }
        
        /*----------  Listing  ----------*/

            #txc-rmp--menu-listing {
                grid-column: 1 / span 1;
                grid-row: 2 / span 1;
            }
        
        /*----------  Content  ----------*/

            #txc-rmp--menu-content {
                grid-column: 2 / span 2;
                grid-row: 2 / span 1
            }
    
    /*=====  End of Menu content  ======*/


    
    /*=============================================
    =            Menu navbar            =
    =============================================*/
    
        header#txc-rmp--navbar {
            border-bottom: var(--content-separation-border);
        }
    
    /*=====  End of Menu navbar  ======*/

    /*=============================================
    =            Menu Listing            =
    =============================================*/
    
        #txc-rmp--menu-listing {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-3);
            padding: var(--spacing-1) var(--spacing-4);
            border-right: var(--content-separation-border);
        }

        /*----------  Header article  ----------*/
        
            article#rmp-ml--san-miguel-copy {
                color: var(--theme-color);
                font-size: calc(var(--font-size-1) * 0.8);
                text-align: left;
            } 

            header#rmp-ml-smc--header {
                display: flex;
                flex-direction: column;
                gap: calc(var(--spacing-2) * 1);

                & h1, & h2 {
                    font-size: 2em;
                }

                & > p.main-content-paragraph {
                    font-size: 1.2em;
                    color: var(--body-fg-color);
                    line-height: 1.3;
                    font-weight: lighter;
                    text-align: inherit;
                    margin: 0;
                }
            }
        
        /*----------  Calls to action  ----------*/

            #txc-rmp-ml-calls-to-action {
                display: flex;
                column-gap: var(--spacing-2);

                & > button {
                    text-transform: none;
                    padding-block: calc(var(--spacing-1) * 1.5);
                }

                & > button.discourage-btn {
                    color: var(--theme-color);
                }
            }
        
        
        /*----------  Sections list  ----------*/
        
            ol#txc-rmp-ml--sections-list {
                cursor: default;
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                font-size: var(--font-size-1);
                row-gap: calc(var(--spacing-2) * 1.1);
                grid-template-columns: repeat(2, 1fr);
                
                & > li.txc-rmp-ml--listing-section-item {
                    width: 100%;
                    text-align: left;
                    transition: color 0.3s ease-out;
                }

                & > li.txc-rmp-ml--listing-section-item:hover {
                    color: var(--theme-color);
                }
            }
    
    /*=====  End of Menu Listing  ======*/
    
    /*=============================================
    =            Menu content            =
    =============================================*/

            article#txc-rmp--menu-content {
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: column;
                padding-left: var(--spacing-4);
                box-shadow: inset 8px 0 8px -8px var(--grey-3);
                gap: var(--spacing-4);
                overflow-y: auto;

                & > section.txc-rmp-menu-section-wrapper {
                    padding-block: var(--spacing-2);
                }

                & > section.txc-rmp-menu-section-wrapper:not(:last-child) {
                    border-bottom: var(--content-separation-border);
                }
            }

    /*=====  End of Menu content  ======*/
</style>