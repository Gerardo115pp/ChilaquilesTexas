import { website_page_paths } from "./page_paths";
import { DEFAULT_LAYOUT } from "./page_layouts";

/*=============================================
=            Page Layout assignation         =
=============================================*/

    /**
     * returns the layout assigned for the given page pathname.
     * @param {string} pathname
     * @returns {import('./page_layouts').PageLayout} 
     */
    export function determinePageLayout (pathname) {
        let page_layout = DEFAULT_LAYOUT;

        for (const page of Object.values(website_page_paths)) {
            if (page.test_path(pathname)) {
                page_layout = page.layout;
                break;
            }
        }

        return page_layout;
    }

/*=====  End of Page Layout assignation maps  ======*/