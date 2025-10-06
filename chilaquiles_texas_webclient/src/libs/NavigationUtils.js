
import { website_page_paths } from "@app/common/page_paths"
import { joinPath } from "./utils"

/*=============================================
=            Page path generators            =
=============================================*/

    /**
     * Returns a path for the generic work-in-progress page for the given language.
     * @param {"en" | "es"} lang
     * @returns {string}
     */
    export const generateWorkInProgressPath = lang => {
        return joinPath(`/${lang}`, website_page_paths.WORK_IN_PROGRESS.path)
    }

/*=====  End of Page path generators  ======*/

