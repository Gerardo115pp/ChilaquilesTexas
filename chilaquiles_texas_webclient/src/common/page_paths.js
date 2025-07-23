/**
* @typedef {Object} WebsitePagePath
 * @property {string} name
 * @property {string} path
*/

/*=============================================
=            Website pages definitions            =
=============================================*/



    /**
     * @type {WebsitePagePath}
     */
    const home_page = {
        name: "Home",
        path: '/'
    }

    /**
     * @type {WebsitePagePath}
     */
    const about_us_page = {
        name: "About Us",
        path: '/our-history'
    }

    /**
     * @type {WebsitePagePath}
     */
    const cover_menu_page = {
        name: "Menu",
        path: '/cover-menu'
    }

    /**
     * @type {WebsitePagePath}
     */
    const san_miguel_page = {
        name: "San Miguel",
        path: '/san-miguel'
    }

    /**
     * @type {WebsitePagePath}
     */
    const coffee_page = {
        name: "Coffee",
        path: '/coffee'
    }

    /**
     * @type {WebsitePagePath}
     */
    const pan_dulce_page = {
        name: "Pan Dulce",
        path: '/pan-dulce'
    }

/*=====  End of Website pages definitions  ======*/

export const website_page_paths = {
    HOME: home_page,
    ABOUT_US_PAGE: about_us_page,
    COVER_MENU_PAGE: cover_menu_page,
    SAN_MIGUEL_PAGE: san_miguel_page,
    COFFEE_PAGE: coffee_page,
    PAN_DULCE_PAGE: pan_dulce_page
}

export const external_links = {
    ADDRESS: "https://g.co/kgs/BzDK3Hu",
    EMAIL: "mailto: hola@loschilaquiles.com",
    PHONE: "tel: +18324697664",
    INSTAGRAM: "https://instagram.com/loschilaquiles"
}
