import { isBrowser } from "@libs/utils"
import { writable } from "svelte/store";
import { isMobileByDefault, layout_change_threshold, VIEWPORT_SIZES } from "./layout_settings";
import { isMobile } from "./layout_utils";

/**
 * Contains a barrage of properties regarding to navigator characteristics. used for reactive layout changes.
* @typedef {Object} LayoutProperties
 * @property {boolean} IS_MOBILE - Whether the current layout is mobile or not.
 * @property {number} VIEWPORT_WIDTH - The current viewport width.
*/

/**
 * A local readable version of the layout properties.
 * @type {LayoutProperties}
 */
let local_layout_properties = {
    IS_MOBILE: isMobileByDefault(),
    VIEWPORT_WIDTH: isMobileByDefault() ? VIEWPORT_SIZES.MOBILE.WIDTH : VIEWPORT_SIZES.DESKTOP.WIDTH,
}

/**
 * A writable store that contains the characteristics about the navigator. primarily used for reactive layout changes.
 * @type {import("svelte/store").Writable<LayoutProperties>}
 */
const layout_properties = writable(local_layout_properties);

/**
 * Whether the layout `setupLayout` function has been called.
 * @type {boolean}
 */
let layout_setup_done = false;

/**
 * Defines the layout properties based on the current navigator. also sets up the event listeners that will update
 * writable store properties when relevant events occur. To dismiss this observers, call `dismissLayout()`.
 */
export const setupLayout = () => {
    if (layout_setup_done) {
        removeLayoutEventListeners();
        layout_setup_done = false;
    }

    defineLayoutProperties()
    addLayoutEventListeners();

    layout_setup_done = true;
}

/**
 * Dismisses the layout observers. Call to clean up when layout_properties and it's observers are no longer needed. This
 * will keep the current `layout_properties` but they will not be updated anymore.
 * @returns {void}
 */
export const dismissLayout = () => {
    if (!layout_setup_done) return;

    removeLayoutEventListeners();
    layout_setup_done = false;
}

/**
 * Updates the layout properties based on the current navigator. This completely overwrites the $layout_properties reference.
 */
function defineLayoutProperties() {
    const is_mobile = isMobile();
    let viewport_width = is_mobile ? VIEWPORT_SIZES.MOBILE.WIDTH : VIEWPORT_SIZES.DESKTOP.WIDTH;

    if (isBrowser()) {
        viewport_width = globalThis.innerWidth;
    }

    /**
     * @type {LayoutProperties}
     */
    const new_layout_properties = {
        IS_MOBILE: is_mobile,
        VIEWPORT_WIDTH: viewport_width,
    }

    local_layout_properties = new_layout_properties;
    layout_properties.set(local_layout_properties);
}

/*=============================================
=            DOM observation            =
=============================================*/

    /**
     * Adds dom observation event listeners for relevant layout changes.
     * @returns {void}
     */
    const addLayoutEventListeners = () => {
        addResizeEventListener();
    }

    /**
     * Adds a resize event listener to the global object to observe viewport changes.
     * This is used to update layout properties when the viewport is resized.
     * @returns {void}
     */
    const addResizeEventListener = () => {
        if (!isBrowser()) return;

        globalThis.addEventListener('resize', handleResizeEvent, {
            passive: true,
        });
    }

    /**
     * Handles the resize event on the global object.
     * @returns {void}
     */
    const handleResizeEvent = () => {
        const resize_diff_percentage = Math.abs(globalThis.innerWidth - local_layout_properties.VIEWPORT_WIDTH) / globalThis.innerWidth;

        if (layout_change_threshold <= resize_diff_percentage) {
            defineLayoutProperties();
        }
    }

    /**
     * Removes a resize event listener from the global object to observe viewport changes.
     * @returns {void}
     */
    const removeResizeEventListener = () => {
        if (!isBrowser()) return;

        globalThis.removeEventListener('resize', handleResizeEvent);
    }

    /**
     * Removes dom observation event listeners for relevant layout changes.
     * @returns {void}
     */
    const removeLayoutEventListeners = () => {
        removeResizeEventListener();
    }

/*=====  End of DOM observation  ======*/

export default layout_properties;