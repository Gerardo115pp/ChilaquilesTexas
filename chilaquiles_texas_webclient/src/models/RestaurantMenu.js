import { 
    GetMenuMetadataRequest,
    GetMenuSectionRequest
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

    class MenuItemMod {

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

    class WarningTag {

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
         * The text of the warning tag.
         * @returns {string}
         */
        get Text() {
            return this.#text;
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

    class MenuItem {
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
    * @typedef {Object} MenuSectionParams
     * @property {string} title
     * @property {string} section_uuid
     * @property {string} item_list_title
     * @property {MenuItemParams[]} items
     * @property {MenuItemModParams[]} modifiers
     * @property {MenuItemModParams[]} extras
     * @property {string} teaser_image_url
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
         * @type {string[]}
         */
        #html_classes;

        /**
         * @param {MenuSectionParams} params
         */
        constructor(params) {
            this.#title = params.title;
            this.#section_uuid = params.section_uuid;
            this.#item_list_title = params.item_list_title || "";
            this.#items = Array.isArray(params.items) ? params.items.map(i => new MenuItem(i)) : [];
            this.#modifiers = Array.isArray(params.modifiers) ? params.modifiers.map(m => new MenuItemMod(m)) : [];
            this.#extras = Array.isArray(params.extras) ? params.extras.map(e => new MenuItemMod(e)) : [];
            this.#teaser_image_url = params.teaser_image_url || "";
            this.#html_classes = Array.isArray(params.html_classes) ? params.html_classes : [];
        }

        get Title() {
            return this.#title;
        }

        get SectionUUID() {
            return this.#section_uuid;
        }

        get ItemListTitle() {
            return this.#item_list_title;
        }

        get Items() {
            return this.#items;
        }

        get Modifiers() {
            return this.#modifiers;
        }

        get Extras() {
            return this.#extras;
        }

        get TeaserImageUrl() {
            return this.#teaser_image_url;
        }

        get HtmlClasses() {
            return this.#html_classes;
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
            menu_section = new MenuSection(response.data);
        }
    } catch (error) {
        console.error("In @models/RestaurantMenu.getMenuSection: failed to get menu section", error);
    }

    return menu_section;
}