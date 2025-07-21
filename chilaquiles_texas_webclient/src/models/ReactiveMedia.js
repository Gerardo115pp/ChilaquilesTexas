import { isBrowser } from "../libs/utils";

/**
 * A calss that represents a media breakpoint. It is a group of rules, mainly related to viewport size, that 
 * determine whether the current navigator matches a criteria defined at instantiation time. The main purpose for this class is to have
 * an homogeneous set of constraints for determining what media(that is, graphical media, mainly video and images) should be used in the
 * current navigator.
 */
export class MediaBreakpoint {
    /**
     * The minimum width at which this breakpoint should be triggered.
     * @type {number | undefined}
     */
    #min_viewport_width;

    /**
     * @param {BreakpointRules} rules
     * @typedef {Object} BreakpointRules
     * @property {number} [min_viewport_width]
     */
    constructor(rules) {
        this.#min_viewport_width = rules.min_viewport_width;
    }

    /**
     * Whether the current navigator's viewport size satisfies the breakpoint's constraints.
     * @returns {boolean}
     */
    #satisfiesViewportSize() {
        if (!isBrowser()) return false;

        const satisfies_width = this.#min_viewport_width !== undefined && globalThis.innerWidth >= this.#min_viewport_width;

        return satisfies_width;
    }

    /**
     * Whether the current navigator matches the criteria defined, and therefore triggers this breakpoint.
     * @returns {boolean}
     */
    viable() {
        if (!isBrowser()) return false;

        return this.#satisfiesViewportSize();
    }
}

/**
 * @typedef {Object} ReactiveMedia
 * @property {string} media_resource_uri
 * @property {MediaBreakpoint} breakpoint
 */

/**
 * A list of media associated with breakpoints and a base media. 
 */
export class ReactiveMediaList {

    /**
     * The base media's URL.
     * @type {string}
     */
    #base_media;

    /**
     * The list of media breakpoints.
     * @type {ReactiveMedia[]}
     */
    #media_breakpoints;

    /**
     * @param {string} base_media - If nothing in the `media_breakpoints` list is viable, query methods will fallback to this.
     * @param {ReactiveMedia[]} media_breakpoints - A list of media resources associated with breakpoints.
     */
    constructor(base_media, media_breakpoints) {
        this.#base_media = base_media;
        this.#media_breakpoints = media_breakpoints;
    }

    /**
     * Returns the first viable media resource URI or the base media if no breakpoint are viable.
     * The breakpoints will be checked for viability in the order they were given at instantiation.
     * @return {string}
     */
    getFirstViableMedia() {
        let viable_media = this.#base_media;

        for (const media of this.#media_breakpoints) {
            if (media.breakpoint.viable()) {
                viable_media = media.media_resource_uri;
                break;
            }
        }

        return viable_media;
    }
}