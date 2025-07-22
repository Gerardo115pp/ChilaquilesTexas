import { breakpoints } from "./breakpoints";
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

    export const page_backgrounds = {
        home: HOME_PAGE_BACKGROUND,
        our_history: OUR_HISTORY_BACKGROUND,
        san_miguel: SAN_MIGUEL_BACKGROUND,
        menu: MENU_BACKGROUND,
        coffee: COFFEE_BACKGROUND,
        pan_dulce: PAN_DULCE_BACKGROUND
    };  
/*=====  End of Page backgrounds  ======*/



