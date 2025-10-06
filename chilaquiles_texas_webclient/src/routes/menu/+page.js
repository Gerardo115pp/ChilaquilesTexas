import { browser } from '$app/environment';
import { toISOLocale } from '@libs/lang_utils';
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
