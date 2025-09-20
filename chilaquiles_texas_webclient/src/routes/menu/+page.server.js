/**
 * @type {import('./$types').PageServerLoad}
 */
export function load(request_data) {
    let accept_language = request_data.request?.headers?.get('accept-language') ?? undefined;
    console.log(`in [${request_data.url}] : Accept-Language:`, accept_language);

    if (accept_language != null) {
        accept_language = processLocaleIdentifier(accept_language);        
    }

    return {
        language: accept_language
    }
}

/**
 * Processes an Accept-Language header identifier and returns the locale with the highest quality value. 
 * @param {string} identifier 
 * @returns 
 */
const processLocaleIdentifier = identifier => {
    let selected_locale = 'en';

    let highest_quality = -0.1;

    const identifiers = identifier.split(', ');

    for (let h=0; h < identifiers.length; h++) {
        let [locale, qstr] = identifiers[h].split(';q=');
        locale = /\b[a-z]{2}\b/.exec(locale)?.[0] ?? '';

        if (locale === '') {
            continue;
        }


        let q = parseFloat(qstr) ?? 0;

        if (q > highest_quality) {
            highest_quality = q;
            selected_locale = locale;
        }
    }

    return selected_locale;
}