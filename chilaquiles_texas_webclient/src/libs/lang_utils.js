
/**
 * Processes an Accept-Language header identifier and returns the locale with the highest quality value. 
 * @param {Headers} headers 
 * @returns {string | undefined}
 */
export const processAcceptLanguageHeader = headers => {
    const accept_language = headers.get('accept-language') ?? undefined;

    if (accept_language == null) return undefined;

    let selected_locale = 'en';

    let highest_quality = -0.1;

    const identifiers = accept_language.split(', ');

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

/**
 * Converts RFC 5646(e.g 'en-US') to ISO-639(e.g 'en') locale identifiers.
 * @param {string} locale
 * @return {string | undefined}
 */
export const toISOLocale = locale => {
    const parts = locale.split('-');

    if (parts.length != 2) {
        return undefined;
    }

    return parts[0];
}