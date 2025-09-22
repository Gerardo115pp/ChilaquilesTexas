import { HttpResponse, arrayToParam, attributesToJson } from "../base";
import { menu_service } from "../services";

/**
 * Returns the metadata of the menu for the requested lang identifier
 */
export class GetMenuMetadataRequest {

    static endpoint = menu_service;

    /**
     * @param {string} lang_iso_639 - example: en = English
     */
    constructor(lang_iso_639) {
        this.lang_iso = lang_iso_639;
    }

    toJson = attributesToJson.bind(this);

    /**
     * @returns {Promise<HttpResponse<import("@models/RestaurantMenu").MenuMetadata | null>>}
     */
    do = async () => {
        const url = `${GetMenuMetadataRequest.endpoint}/${this.lang_iso}/menu_metadata.json`;

        /**
         * @type {import("@models/RestaurantMenu").MenuMetadata | null}
         */
        let menu_metadata = null;

        /**
         * @type {Response}
         */
        let response;

        try {
            response = await fetch(url);

            if (response.ok) {
                menu_metadata = await response.json();
            }
        } catch (error) {
            console.error(`In @libs/Communication/services_requests/restaurant_menu.GetMenuMetadata.do: failed to fetch menu metadata for ${this.lang_iso}`, error);

            throw error;
        }

        return new HttpResponse(response, menu_metadata);
    }
}

/**
 * Returns the requested menu section by the file and lang identifiers
 */
export class GetMenuSectionRequest {

    static endpoint = menu_service;

    /**
     * @param {string} lang_iso_639 - example: en = English
     * @param {string} section_file - example: appetizers = appetizers.json
     */
    constructor(lang_iso_639, section_file) {
        this.lang_iso = lang_iso_639;
        this.section_file = section_file;
    }

    toJson = attributesToJson.bind(this);

    /**
     * @returns {Promise<HttpResponse<import("@models/RestaurantMenu").MenuSectionParams | null>>}
     */
    do = async () => {
        const url = `${GetMenuSectionRequest.endpoint}/${this.lang_iso}/${this.section_file}`;

        /**
         * @type {import("@models/RestaurantMenu").MenuSectionParams | null}
         */
        let menu_section = null;

        /**
         * @type {Response}
         */
        let response;

        try {
            response = await fetch(url);

            if (response.ok) {
                menu_section = await response.json();
            }
        } catch (error) {
            console.error(`In @libs/Communication/services_requests/restaurant_menu.GetMenuSection.do: failed to fetch menu section ${this.section_file} for ${this.lang_iso}`, error);

            throw error;
        }

        return new HttpResponse(response, menu_section);
    }
}

/**
 * Returns a menu's section html snippets for the requested lang identifier.
 */
export class GetMenuSectionHtmlSnippetsRequest {
    static endpoint = menu_service;

    /**
     * @param {string} lang_iso_639 - example: en = English
     * @param {string} snippet_file 
     */
    constructor(lang_iso_639, snippet_file) {
        this.lang_iso = lang_iso_639;
        this.snippet_file = snippet_file;
    }

    toJson = attributesToJson.bind(this);

    /**
     * @returns {Promise<HttpResponse<string | null>>}
     */
    do = async () => {
        const url = `${GetMenuSectionHtmlSnippetsRequest.endpoint}/${this.lang_iso}/html_content/${this.snippet_file}`;

        /**
         * @type {string | null}
         */
        let html_snippet = null;

        /**
         * @type {Response}
         */
        let response;

        try {
            response = await fetch(url);

            if (response.ok) {
                html_snippet = await response.text();
            }
        } catch (error) {
            console.error(`In @libs/Communication/services_requests/restaurant_menu.GetMenuSectionHtmlSnippets.do: failed to fetch menu section html snippet ${this.snippet_file} for ${this.lang_iso}`, error);

            throw error;
        }

        return new HttpResponse(response, html_snippet);
    }
}