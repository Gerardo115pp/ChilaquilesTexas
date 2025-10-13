import { 
    GetMenuMetadataRequest,
    GetMenuSectionRequest,
    GetMenuSectionHtmlSnippetsRequest
} from "@libs/Communication/services_requests/restaurant_menu";

/**
 * The default language to render the menu in.
 * @type {string}
 * @constant
 * @default "en"
 */
export const DEFAULT_MENU_LANG = "en"

/**
 * The different menu languages Los chilaquiles supports. Lang identifier -> menu_metadata_file
 * @type {Set<string>}
 */
const menu_languages = new Set([
    "en",
    "es"
]);

/**
* @typedef {Object} MenuSectionFileItem
 * @property {string} section_name
 * @property {string} section_file
*/

/**
* @typedef {Object} MenuMetadata
 * @property {string[]} load_order
 * @property {MenuSectionFileItem[]} menu_listing
 * @property {string} lang
*/


/*=============================================
=            Menu models            =
=============================================*/

    /**
    * @typedef {Object} MenuItemModParams
     * @property {string} text
     * @property {number} price
     * @property {string} parentheses_label
     * @property {string[]} html_classes
    */

    export class MenuItemMod {

        /**
         * the text of the menu modifier
         * @type {string}
         */
        #text;

        /**
         * The price related to the modifier.
         * @type {number | null}
         */
        #price;

        /**
         * A text to be rendered in parenthesis after the modifier text.
         * @type {string | null}
         */
        #parentheses_label;

        /**
         * A list of html classes to be applied to the modifier's element.
         * @type {string[]}
         */
        #html_classes;
        
        /**
         * @param {MenuItemModParams} params
         */
        constructor(params) {
            this.#text = params.text;
            this.#price = params.price > 0 ? params.price : null;
            this.#parentheses_label = params.parentheses_label || null;
            this.#html_classes = params.html_classes;
        }

        /**
         * The main text of the menu modifier
         * @returns {string}
         */
        get Text() {
            return this.#text;
        }

        /**
         * The price related to the modifier or null if there's no price change.
         * @returns {number | null}
         */
        get Price() {
            return this.#price;
        }

        /**
         * A text to be rendered in parenthesis after the modifier text or null if there's no such text.
         * @returns {string | null}
         */
        get ParenthesesLabel() {
            return this.#parentheses_label;
        }

        /**
         * A list of html classes to be applied to the modifier's element.
         * @returns {string[]}
         */
        get HtmlClasses() {
            return this.#html_classes;
        }
    }


    /**
    * @typedef {Object} WarningTagParams
     * @property {string} text
     * @property {number} danger_level
     * @property {string[]} html_classes
    */

    export class WarningTag {

        /**
         * The text of the warning tag.
         * @type {string}
         */
        #text;

        /**
         * The danger level of the warning tag. From 1 to 5, 5 being the most dangerous.
         * @type {number}
         */
        #danger_level;
        
        /**
         * A list of html classes to be applied to the warning tag's element.
         * @type {string[]}
         */
        #html_classes;

        /**
         * @param {WarningTagParams} params
         */
        constructor(params) {
            this.#text = params.text;
            this.#danger_level = params.danger_level;
            this.#html_classes = params.html_classes;
        }

        /**
         * Whether the element is a template fragment. meaning is meant to be replaced by something else, no
         * rendered directly.
         * @returns {boolean}
         */
        isTemplateFragment() {
            return this.#text.startsWith("{{");
        }

        /**
         * The danger level of the warning tag.
         * @returns {number}
         */
        get DangerLevel() {
            return this.#danger_level;
        }

        /**
         * A list of html classes to be applied to the warning tag's element.
         * @returns {string[]}
         */
        get HtmlClasses() {
            return this.#html_classes;
        }

        /**
         * The text of the warning tag.
         * @returns {string}
         */
        get Text() {
            return this.#text;
        }
    }


    /**
    * @typedef {Object} MenuItemParams
     * @property {string} title
     * @property {string} item_uuid
     * @property {number} price
     * @property {string} description
     * @property {WarningTagParams[]} warnings
     * @property {MenuItemModParams[]} item_modifiers
     * @property {MenuItemModParams[]} item_extras
     * @property {string} parentheses_label
     * @property {string[]} html_classes
    */

    export class MenuItem {
        /**
         * @type {string}
         */
        #title;

        /**
         * @type {string}
         */
        #item_uuid;

        /**
         * @type {number}
         */
        #price;

        /**
         * @type {string}
         */
        #description;

        /**
         * @type {WarningTag[]}
         */
        #warnings;
        
        /** 
         * @type {MenuItemMod[]}
         */
        #item_modifiers;

        /**
         * @type {MenuItemMod[]}
         */
        #item_extras;

        /**
         * @type {(string|null)}
         */
        #parentheses_label;

        /**
         * @type {string[]}
         */
        #html_classes;

        /**
         * @param {MenuItemParams} params
         */
        constructor(params) {
            this.#title = params.title;
            this.#item_uuid = params.item_uuid;
            this.#price = params.price;
            this.#description = params.description || "";
            this.#warnings = Array.isArray(params.warnings) ? params.warnings.map(w => new WarningTag(w)) : [];
            this.#item_modifiers = Array.isArray(params.item_modifiers) ? params.item_modifiers.map(m => new MenuItemMod(m)) : [];
            this.#item_extras = Array.isArray(params.item_extras) ? params.item_extras.map(e => new MenuItemMod(e)) : [];
            this.#parentheses_label = params.parentheses_label || null;
            this.#html_classes = Array.isArray(params.html_classes) ? params.html_classes : [];
        }

        get Title() {
            return this.#title;
        }

        get ItemUUID() {
            return this.#item_uuid;
        }

        get Price() {
            return this.#price;
        }

        get Description() {
            return this.#description;
        }

        get Warnings() {
            return this.#warnings;
        }

        get ItemModifiers() {
            return this.#item_modifiers;
        }

        get ItemExtras() {
            return this.#item_extras;
        }

        get ParenthesesLabel() {
            return this.#parentheses_label;
        }

        get HtmlClasses() {
            return this.#html_classes;
        }
    }

    /**
     * Represents different snippet sections for menu section templates.
     */
    export class MenuSectionSnippets {

        static about_content_id = "section-about-content";

        static header_top_desc_id = "section-header-top-description";

        static header_bottom_desc_id = "section-header-bottom-description";

        /**
         * the content for the "about" section of the menu section template.
         * @type {string}
         */
        #about_content;

        /**
         * the content for the "header top description" section of the menu section template.
         * @type {string}
         */
        #top_desc;

        /**
         * the content for the "header bottom description" section of the menu section template.
         * @type {string}
         */
        #bottom_desc;

        /**
         * @param {string} html_snippets
         */
        constructor(html_snippets) {
            this.#about_content = "";
            this.#top_desc = "";
            this.#bottom_desc = "";

            const parser = new DOMParser();

            const doc = parser.parseFromString(html_snippets, "text/html");

            const about_content_element = doc.getElementById(MenuSectionSnippets.about_content_id);
            if (about_content_element != null) {
                about_content_element.removeAttribute("id");
                about_content_element.classList.add(MenuSectionSnippets.about_content_id);
                this.#about_content = about_content_element.outerHTML;
            }

            const top_desc_element = doc.getElementById(MenuSectionSnippets.header_top_desc_id);
            if (top_desc_element != null) {
                top_desc_element.removeAttribute("id");
                top_desc_element.classList.add(MenuSectionSnippets.header_top_desc_id);
                this.#top_desc = top_desc_element.outerHTML;
            }

            const bottom_desc_element = doc.getElementById(MenuSectionSnippets.header_bottom_desc_id);
            if (bottom_desc_element != null) {
                bottom_desc_element.removeAttribute("id");
                bottom_desc_element.classList.add(MenuSectionSnippets.header_bottom_desc_id);
                this.#bottom_desc = bottom_desc_element.outerHTML;
            }

            
        }

        /**
         * the content for the "about" section of the menu section template.
         * @returns {string}
         */
        get AboutContent() {
            return this.#about_content;
        }

        /**
         * the content for the "header top description" section of the menu section template.
         * @returns {string}
         */
        get TopDescription() {
            return this.#top_desc;
        }

        /**
         * the content for the "header bottom description" section of the menu section template.
         * @returns {string}
         */
        get BottomDescription() {
            return this.#bottom_desc;
        }
    }


    /**
    * @typedef {Object} MenuSectionParams
     * @property {string} title
     * @property {string} section_uuid
     * @property {string} item_list_title
     * @property {MenuItemParams[]} items
     * @property {MenuItemModParams[]} modifiers
     * @property {MenuItemModParams[]} extras
     * @property {string} teaser_image_url
     * @property {string} external_sections
     * @property {string[]} html_classes
    */

    export class MenuSection {

        /**
         * @type {string}
         */
        #title;

        /**
         * @type {string}
         */
        #section_uuid;
        
        /**
         * @type {string}
         */
        #item_list_title;

        /**
         * @type {MenuItem[]}
         */
        #items;

        /**
         * @type {MenuItemMod[]}
         */
        #modifiers;

        /**
         * @type {MenuItemMod[]}
         */
        #extras;

        /**
         * @type {string}
         */
        #teaser_image_url;

        /**
         * A url to an html file containing html snippets to be rendered at key template sections
         * @type {string}
         */
        #external_sections;

        /**
         * The content snippets to be rendered in key template sections.
         * @type {MenuSectionSnippets | null}
         */
        #content_snippets;

        /**
         * @type {string[]}
         */
        #html_classes;

        /**
         * The language identifier of the menu section.
         * @type {string}
         */
        #section_lang;
         

        /**
         * @param {MenuSectionParams} params
         * @param {string} section_lang
         */
        constructor(params, section_lang) {
            this.#title = params.title;
            this.#section_uuid = params.section_uuid;
            this.#item_list_title = params.item_list_title || "";
            this.#items = Array.isArray(params.items) ? params.items.map(i => new MenuItem(i)) : [];
            this.#modifiers = Array.isArray(params.modifiers) ? params.modifiers.map(m => new MenuItemMod(m)) : [];
            this.#extras = Array.isArray(params.extras) ? params.extras.map(e => new MenuItemMod(e)) : [];
            this.#teaser_image_url = params.teaser_image_url || "";
            this.#external_sections = params.external_sections || "";
            this.#html_classes = Array.isArray(params.html_classes) ? params.html_classes : [];
            this.#content_snippets = null;

            this.#section_lang = section_lang;
        }

        /**
         * Different extras dishes that can extend the base item. e.g: Side of rice, Side of beans, etc.
         * @returns {MenuItemMod[]} 
         */
        get Extras() {
            return this.#extras;
        }

        /**
         * A url to an html file containing html snippets to be rendered at key template sections
         * @returns {string}
         */
        get ExternalSections() {
            return this.#external_sections;
        }

        /**
         * Returns the content snippets associated with the menu section.
         * @returns {Promise<MenuSectionSnippets | null>}
         */
        getContentSnippets = async () => {
            if (this.#content_snippets != null) return this.#content_snippets;

            if (this.#external_sections === "") return null;

            const html_snippets = await getMenuSectionHtmlSnippets(this.#external_sections, this.#section_lang);

            if (html_snippets == null) return null;

            this.#content_snippets = new MenuSectionSnippets(html_snippets);

            return this.#content_snippets;
        }

        /**
         * HTML classes to modify the appearance of the menu section.
         * @returns {string[]}
         */
        get HtmlClasses() {
            return this.#html_classes;
        }

        /**
         * A shorter version of the title to be used for list views.
         * @returns {string}
         */
        get ItemListTitle() {
            return this.#item_list_title;
        }

        /**
         * The different dishes of this menu section.
         * @returns {MenuItem[]}
         */
        get Items() {
            return this.#items;
        }

        /**
         * Different modifiers that can be applied to the items of this section. e.g: Extra cheese, No onions, etc.
         * @returns {MenuItemMod[]}
         */
        get Modifiers() {
            return this.#modifiers;
        }

        /**
         * The unique identifier for the menu section.
         * @returns {string}
         */
        get SectionUUID() {
            return this.#section_uuid;
        }

        /**
         * The title of the menu section.
         * @returns {string}
         */
        get Title() {
            return this.#title;
        }

        /**
         * A url to an image to be used as a teaser or thumbnail for the menu section.
         * @returns {string}
         */
        get TeaserImageUrl() {
            return this.#teaser_image_url;
        }
    }

/*=====  End of Menu models  ======*/



/**
 * Returns the metadata to render a menu in a given language if available. if it's not available then the function returns the
 * metadata for the default language. 
 * @param {string} lang_iso
 * @returns {Promise<MenuMetadata | null>}
 */
export async function getMenuMetadata(lang_iso) {
    let valid_lang_iso = menu_languages.has(lang_iso) ? lang_iso : DEFAULT_MENU_LANG;

    const request = new GetMenuMetadataRequest(valid_lang_iso);

    /**
     * @type {MenuMetadata | null}
     */
    let menu_metadata = null; 

    try {
        const response = await request.do();

        menu_metadata = response.data;
    } catch (error) {
        console.error("In @models/RestaurantMenu.getMenuMetadata: failed to get menu metadata", error);
    }

    return menu_metadata;
}

/**
 * Returns a menu section by it's given file name and language identifier.
 * @param {string} section_file 
 * @param {string} lang_iso 
 * @returns {Promise<MenuSection | null>}
 */
export async function getMenuSection(section_file, lang_iso) {
    let valid_lang_iso = menu_languages.has(lang_iso) ? lang_iso : DEFAULT_MENU_LANG;

    const request = new GetMenuSectionRequest(valid_lang_iso, section_file);

    /**
     * @type {MenuSection | null}
     */
    let menu_section = null;

    try {
        const response = await request.do();

        if (response.data != null) {
            menu_section = new MenuSection(response.data, valid_lang_iso);
        }
    } catch (error) {
        console.error("In @models/RestaurantMenu.getMenuSection: failed to get menu section", error);
    }

    return menu_section;
}

/**
 * Returns the HTML snippets in the given snippet filename and language identifier.
 * @param {string} snippet_file 
 * @param {string} lang_iso 
 * @returns {Promise<string | null>}
 */
export async function getMenuSectionHtmlSnippets(snippet_file, lang_iso) {
    let valid_lang_iso = menu_languages.has(lang_iso) ? lang_iso : DEFAULT_MENU_LANG;

    const request = new GetMenuSectionHtmlSnippetsRequest(valid_lang_iso, snippet_file);

    /**
     * @type {string | null}
     */
    let html_snippets = null;

    try {
        const response = await request.do();

        html_snippets = response.data;
    } catch (error) {
        console.error("In @models/RestaurantMenu.getMenuSectionHtmlSnippets: failed to get menu section html snippets", error);
    }

    return html_snippets;
}