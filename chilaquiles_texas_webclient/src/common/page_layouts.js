import { website_page_paths } from "./page_paths";

const page_layouts = Object.freeze({
    VBPL_DEFAULT: "VBPL", // Video Background Page Layout
    VBPL_FULL_MAIN_CONTENT: "FMC",
    INDEPENDENT_CONTENT: "IC"
});

/**
 * @typedef {(typeof page_layouts)[keyof typeof page_layouts]} PageLayout
 */

/**
 * @type {PageLayout}
 */
export const DEFAULT_LAYOUT = /** @type {PageLayout} */ (page_layouts.VBPL_DEFAULT);


/*=============================================
=            Page Layout assignation         =
=============================================*/
    // If a given is not in one of these maps, assume it requires the `DEFAULT_LAYOUT`.

    const vbpl_full_main_content_pages = new Set([
        website_page_paths.ABOUT_US_PAGE.path
    ]);

    const independent_content_pages = new Set([
        website_page_paths.MENU_PAGE.path
    ])

    /**
     * returns the layout assinged for the given page pathname.
     * @param {string} pathname
     * @returns {PageLayout} 
     */
    export function determinePageLayout (pathname) {
        let page_layout = DEFAULT_LAYOUT;

        if (vbpl_full_main_content_pages.has(pathname)) { // check: VBPL_FULL_MAIN_CONTENT
            page_layout = page_layouts.VBPL_FULL_MAIN_CONTENT;
        } else if (independent_content_pages.has(pathname)) { // check: INDEPENDENT_CONTENT
            page_layout = page_layouts.INDEPENDENT_CONTENT;
        }

        return page_layout;
    }

/*=====  End of Page Layout assignation maps  ======*/



export default page_layouts;