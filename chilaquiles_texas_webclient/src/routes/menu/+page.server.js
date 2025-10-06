import { processAcceptLanguageHeader } from '@libs/lang_utils';

/**
 * @type {import('./$types').PageServerLoad}
 */
export function load(request_data) {
    let accept_language = processAcceptLanguageHeader(request_data.request.headers)

    console.log(`in [${request_data.url}] : Accept-Language:`, accept_language);

    return {
        language: accept_language
    }
}
