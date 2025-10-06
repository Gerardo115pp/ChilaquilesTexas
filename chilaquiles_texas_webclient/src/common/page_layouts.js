export const page_layouts = Object.freeze({
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