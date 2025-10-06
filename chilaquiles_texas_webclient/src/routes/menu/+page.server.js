import { processAcceptLanguageHeader } from '@libs/LangUtils';
import { generateWorkInProgressPath } from '@libs/NavigationUtils';
import { redirect } from '@sveltejs/kit';

const enabled_web_menu = true; // whether to redirect to work in progress page

/**
 * @type {import('./$types').PageServerLoad}
 */
export function load(request_data) {
    let accept_language = processAcceptLanguageHeader(request_data.request.headers)

    console.log(`in [${request_data.url}] : Accept-Language:`, accept_language);

    if (!enabled_web_menu) {
        const redirection_code = 307;
        const redirection_lang = accept_language === "en" || accept_language === "es" ? accept_language : "en";
        const redirection_uri = generateWorkInProgressPath(redirection_lang);
        redirect(redirection_code, redirection_uri)
        return;
    }

    return {
        language: accept_language
    }
}
