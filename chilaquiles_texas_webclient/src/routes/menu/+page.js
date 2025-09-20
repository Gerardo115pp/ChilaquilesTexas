import { browser } from '$app/environment';
import { DEFAULT_MENU_LANG } from '@models/RestaurantMenu';

/**
 * @type {import('./$types').PageLoad}
 */
export function load(page_load) {
    let page_loaded_language = page_load.data.language;

    let navigator_language = undefined;

    if (browser) {
        navigator_language = globalThis.navigator.language;
        navigator_language = toISOLocale(navigator_language);
        console.log("Navigator language:", navigator_language);
    }

    let selected_language = navigator_language ?? page_loaded_language ?? DEFAULT_MENU_LANG;

    return {
        language: selected_language
    };
}

/**
 * Converts RFC 5646(e.g 'en-US') to ISO-639(e.g 'en') locale identifiers.
 * @param {string} locale
 * @return {string}
 */
const toISOLocale = locale => {
    const parts = locale.split('-');

    if (parts.length != 2) {
        return DEFAULT_MENU_LANG;
    }

    return parts[0];
}