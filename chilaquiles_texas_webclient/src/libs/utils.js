/**
 * Whether the code is running on a windowed environment.
 * @returns {boolean}
 */
export const isBrowser = () => globalThis.addEventListener !== undefined;


/*----------  Text processing functions  ----------*/

    /**
     * Clears trailing and leading slashes for a given string. returns a copy of the string if any modifications where required or
     * the same string otherwise.
     * @param {string} str
     * @returns {string}
     */
    export const trimSlashes = str => {
        const has_leading_slash = str.startsWith('/');
        const has_trailing_slash = str.endsWith('/');

        if (!has_trailing_slash && !has_leading_slash) return str;

        const new_str = str.split('/').filter((f) => f !== '').join('/');

        return new_str;
    }


    /*----------  Paths  ----------*/

        /**
         * Join joins any number of path elements into a single path, separating them with slashes.
         * Empty elements are ignored. The result is Cleaned. However, if the argument list is empty
         * or all its elements are empty, Join returns an empty string.
         * @param {...string} path_elements
         * @returns {string}
         */
        export const joinPath = (...path_elements) => {
            if (path_elements.length < 1) return "";

            const is_absolute_path = path_elements[0].startsWith('/');

            /**
             * @type {string[]}
             */
            const fragments = [];

            path_elements.forEach(path_element => {
                fragments.push(...path_element.split('/'));
            });

            let new_string = fragments.filter(pe => pe !== '').join('/');

            if (is_absolute_path) {
                new_string = '/' + new_string;
            }

            return new_string;
        }


