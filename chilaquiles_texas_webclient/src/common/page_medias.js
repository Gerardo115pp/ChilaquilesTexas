import { breakpoints } from "./breakpoints";
import { website_page_paths } from "./page_paths";
import { PageBackground } from "@models/PageBackgrounds";
import { ReactiveMediaList } from "@models/ReactiveMedia";

const website_resources_prefix = "/resources";
const covers_prefix = `${website_resources_prefix}/covers`;
const videos_prefix = `${website_resources_prefix}/videos`;

/**
 * @param {string} filename 
 * @returns {string}
 */
const toCoverURI = (filename) => `${covers_prefix}/${filename}`;

/**
 * @param {string} filename 
 * @returns {string}
 */
const toVideoURI = (filename) => `${videos_prefix}/${filename}`;


/*=============================================
=            Page backgrounds            =
=============================================*/

    const HOME_PAGE_BACKGROUND = new PageBackground(
        new ReactiveMediaList(toCoverURI("home-original.webp"), [
            {
                breakpoint: breakpoints.XL,
                media_resource_uri: toCoverURI("home-XL.webp"),
            },
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toCoverURI("home-L.webp"),
            },
            {
                breakpoint: breakpoints.M,
                media_resource_uri: toCoverURI("home-M.webp"),
            },
            {
                breakpoint: breakpoints.S,
                media_resource_uri: toCoverURI("home-S.webp"),
            }
        ]), 
        new ReactiveMediaList(toVideoURI("home_page/home_mobile_av1_small.mp4"), [
                {
                    breakpoint: breakpoints.L,
                    media_resource_uri: toVideoURI("home_page/home_av1.mp4"),
                }
            ]
        )
    );

    const OUR_HISTORY_BACKGROUND = new PageBackground(
        new ReactiveMediaList(toCoverURI('san_miguel_houston-original.webp'), [
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toCoverURI('san_miguel_houston-L.webp'),
            },
            {
                breakpoint: breakpoints.M,
                media_resource_uri: toCoverURI('san_miguel_houston-M.webp'),
            },
            {
                breakpoint: breakpoints.S,
                media_resource_uri: toCoverURI('san_miguel_houston-S.webp'),
            }
        ]),
        new ReactiveMediaList(toVideoURI('san_miguel_page/san_miguel_houston_av1_sd_small.mp4'), [
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toVideoURI('san_miguel_page/san_miguel_houston_av1.mp4'),
            }
        ])
    );

    const SAN_MIGUEL_BACKGROUND = new PageBackground(
        new ReactiveMediaList(toCoverURI('vaca-original.webp'), [
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toCoverURI('vaca-L.webp'),
            },
            {
                breakpoint: breakpoints.M,
                media_resource_uri: toCoverURI('vaca-M.webp'),
            },
            {
                breakpoint: breakpoints.S,
                media_resource_uri: toCoverURI('vaca-S.webp'),
            }
        ]),
        new ReactiveMediaList(toVideoURI('vaca_page/vaca_mobile_av1_sd_small.mp4'), [
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toVideoURI('vaca_page/vaca_av1.mp4'),
            }
        ])
    );

    const MENU_BACKGROUND = new PageBackground(
        new ReactiveMediaList(toCoverURI('cooking-original.webp'), [
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toCoverURI('cooking-L.webp'),
            },
            {
                breakpoint: breakpoints.M,
                media_resource_uri: toCoverURI('cooking-M.webp'),
            },
            {
                breakpoint: breakpoints.S,
                media_resource_uri: toCoverURI('cooking-S.webp'),
            }
        ]),
        new ReactiveMediaList(toVideoURI('cooking_page/cooking_mobile_av1_sd_small.mp4'), [
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toVideoURI('cooking_page/cooking_av1.mp4'),
            }
        ])
    );

    const COFFEE_BACKGROUND = new PageBackground(
        new ReactiveMediaList(toCoverURI('coffee-original.webp'), [
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toCoverURI('coffee-L.webp'),
            },
            {
                breakpoint: breakpoints.M,
                media_resource_uri: toCoverURI('coffee-M.webp'),
            },
            {
                breakpoint: breakpoints.S,
                media_resource_uri: toCoverURI('coffee-S.webp'),
            }
        ]),
        new ReactiveMediaList(toVideoURI('coffee_page/coffee_mobile_av1_sd_small.mp4'), [
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toVideoURI('coffee_page/coffee_av1.mp4'),
            }
        ])
    );

    const PAN_DULCE_BACKGROUND = new PageBackground(
        new ReactiveMediaList(toCoverURI('pan_dulce-original.webp'), [
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toCoverURI('pan_dulce-L.webp'),
            },
            {
                breakpoint: breakpoints.M,
                media_resource_uri: toCoverURI('pan_dulce-M.webp'),
            },
            {
                breakpoint: breakpoints.S,
                media_resource_uri: toCoverURI('pan_dulce-S.webp'),
            }
        ]),
        new ReactiveMediaList(toVideoURI('pan_dulce_page/pan_dulce_mobile_av1_sd_small.mp4'), [
            {
                breakpoint: breakpoints.L,
                media_resource_uri: toVideoURI('pan_dulce_page/pan_dulce_av1.mp4'),
            }
        ])
    );

    /**
    * @typedef {Object} PageToBackgroundRelation
     * @property {import('./page_paths').WebsitePagePath} page_data
     * @property {PageBackground} background
    */

    /**
     * @type {Map<string, PageToBackgroundRelation>}
     */
    const video_background_pages = new Map([
        [website_page_paths.HOME.path, { 
            page_data: website_page_paths.HOME,
            background: HOME_PAGE_BACKGROUND 
        }],
        [website_page_paths.ABOUT_US_PAGE.path, {
            page_data: website_page_paths.ABOUT_US_PAGE,
            background: OUR_HISTORY_BACKGROUND
        }],
        [website_page_paths.COVER_MENU_PAGE.path, {
            page_data: website_page_paths.COVER_MENU_PAGE,
            background: MENU_BACKGROUND
        }],
        [website_page_paths.SAN_MIGUEL_PAGE.path, {
            page_data: website_page_paths.SAN_MIGUEL_PAGE,
            background: SAN_MIGUEL_BACKGROUND
        }],
        [website_page_paths.COFFEE_PAGE.path, {
            page_data: website_page_paths.COFFEE_PAGE,
            background: COFFEE_BACKGROUND
        }],
        [website_page_paths.PAN_DULCE_PAGE.path, {
            page_data: website_page_paths.PAN_DULCE_PAGE,
            background: PAN_DULCE_BACKGROUND
        }]
    ]);

    /**
     * Checks if the given page path is a video background page.
     * @param {string} page_path - The path of the page to check.
     * @returns {boolean} - Returns true if the page is a video background page, false
     */
    export const isVideoBackgroundPage = (page_path) => {
        return video_background_pages.has(page_path);
    }

    /**
     * Returns and object containing the page data and background for the given page path.
     * @param {string} page_path 
     * @returns {PageToBackgroundRelation | null} 
     */
    export const getPageBackground = (page_path) => {
        return video_background_pages.get(page_path) || null;
    }
/*=====  End of Page backgrounds  ======*/



