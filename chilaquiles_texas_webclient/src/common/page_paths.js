import { page_layouts, DEFAULT_LAYOUT } from "./page_layouts"

/**
* @typedef {Object} WebsitePagePath
 * @property {string} name
 * @property {string} path
 * @property {(pathname: string) => boolean} test_path - Optional function to test if a given path matches this page. if defined, takes precedence over `path`.
 * @property {import('./page_layouts').PageLayout} layout
*/

/*=============================================
=            Website pages definitions            =
=============================================*/

    /**
     * @this {WebsitePagePath}
     * @param {string} pathname
     * @returns {boolean}
     */
    function defaultPathnameTest(pathname) {
        return this.path === pathname;
    }


    /**
     * @type {WebsitePagePath}
     */
    const home_page = {
        name: "Home",
        path: '/',
        test_path: defaultPathnameTest,
        layout: DEFAULT_LAYOUT
    }

    /**
     * @type {WebsitePagePath}
     */
    const about_us_page = {
        name: "About Us",
        path: '/our-history',
        test_path: defaultPathnameTest,
        layout: page_layouts.VBPL_FULL_MAIN_CONTENT 
    }

    /**
     * @type {WebsitePagePath}
     */
    const cover_menu_page = {
        name: "Menu",
        path: '/cover-menu',
        test_path: defaultPathnameTest,
        layout: DEFAULT_LAYOUT
    }

    /**
     * @type {WebsitePagePath}
     */
    const san_miguel_page = {
        name: "San Miguel",
        path: '/san-miguel',
        test_path: defaultPathnameTest,
        layout: DEFAULT_LAYOUT
    }

    /**
     * @type {WebsitePagePath}
     */
    const coffee_page = {
        name: "Coffee",
        path: '/coffee',
        test_path: defaultPathnameTest,
        layout: DEFAULT_LAYOUT
    }

    /**
     * @type {WebsitePagePath}
     */
    const pan_dulce_page = {
        name: "Pan Dulce",
        path: '/pan-dulce',
        test_path: defaultPathnameTest,
        layout: DEFAULT_LAYOUT
    }

    /**
     * @type {WebsitePagePath}
     */
    const menu_page = {
        name: "Menu",
        path: '/menu',
        test_path: defaultPathnameTest,
        layout: page_layouts.INDEPENDENT_CONTENT 
    }

    /**
     * @type {WebsitePagePath}
     */
    const work_in_progress = {
        name: "Work In Progress",
        path: '/work-in-progress',
        test_path: (pathname) => pathname.endsWith('/work-in-progress'),
        layout: page_layouts.INDEPENDENT_CONTENT
    }

/*=====  End of Website pages definitions  ======*/

/**
 * @readonly
 * @enum {WebsitePagePath}
 */
export const website_page_paths = Object.freeze({
    HOME: home_page,
    ABOUT_US_PAGE: about_us_page,
    COVER_MENU_PAGE: cover_menu_page,
    SAN_MIGUEL_PAGE: san_miguel_page,
    COFFEE_PAGE: coffee_page,
    PAN_DULCE_PAGE: pan_dulce_page,
    MENU_PAGE: menu_page,
    WORK_IN_PROGRESS: work_in_progress
});

export const external_links = {
    ADDRESS: "https://g.co/kgs/BzDK3Hu",
    EMAIL: "mailto: hola@loschilaquiles.com",
    PHONE: "tel: +18324697664",
    INSTAGRAM: "https://instagram.com/loschilaquiles",
    SPOTIFY: "https://open.spotify.com/playlist/3KNS6keFi8j2YLiQqPsuiX?pi=oqGSNiKfTtCFk",
    GENERIC_WORK_IN_PROGRESS: "/en/work-in-progress",
    ORDER_ONLINE: "/en/work-in-progress"
}
