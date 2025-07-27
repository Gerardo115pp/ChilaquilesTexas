/**
 * If there is a resize on the viewport but is not bigger than this threshold, the layout is not considered changed
 * @type {number} - a value between 0 and 1
 */
export const layout_change_threshold = 0.05;

/**
 * The most common viewport sizes by device type
 */
export const VIEWPORT_SIZES = {
    MOBILE: {
        WIDTH: 412,
        HEIGHT: 732,
    },
    TABLET: { // Don't consider this too much, it will probably not be used. TODO: upon confirmation, remove this.
        WIDTH: 768,
        HEIGHT: 1024
    },
    DESKTOP: {
        WIDTH: 1440,
        HEIGHT: 1080
    }
}

/**
 * Whether layout functions, when unable to determine client type(mobile, tablet, desktop), should default to mobile.
 * @type {boolean}
 */
let assume_mobile_if_uncertain = false;

/**
 * Whether layout functions, when unable to determine client type(mobile, tablet, desktop), should default to mobile.
 * @returns {boolean}
 */
export function isMobileByDefault() {
    return assume_mobile_if_uncertain;
}

/**
 * Changes the default behavior of layout functions when unable to determine client type to assume it's mobile or not.
 * @param {boolean} assume_mobile 
 * @return {void}
 */
export function setMobileDefaultAssumption(assume_mobile) {
    assume_mobile_if_uncertain = assume_mobile;
}