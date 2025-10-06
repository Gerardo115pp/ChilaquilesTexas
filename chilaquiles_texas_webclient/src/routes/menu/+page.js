import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { toISOLocale } from '@libs/LangUtils';
import { generateWorkInProgressPath } from '@libs/NavigationUtils';
import { DEFAULT_MENU_LANG } from '@models/RestaurantMenu';

const menu_page_enabled = false; // whether to redirect to work-in-progress page

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

    if (!menu_page_enabled) {
        const redirection_lang = selected_language === "en" || selected_language === "es" ? selected_language : "en";
        const redirection_uri = generateWorkInProgressPath(redirection_lang);
        goto(redirection_uri);
    }

    return {
        language: selected_language
    };
}
