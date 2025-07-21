import { ReactiveMediaList } from "./ReactiveMedia";

/**
 * Represents a background for one of the website's pages. The backgrounds in most cases are videos. This clusters different variations of the same background, with different resolutions.
 * And a similar list for cover images for the background video.
 */
export class PageBackground {

    /**
     * The cover // thumbnail for the background.
     * @type {ReactiveMediaList}
     */
    #cover_images;

    /**
     * The background video for the page.
     * @type {ReactiveMediaList}
     */
    #background_video;

    /**
     * @param {ReactiveMediaList} cover_images
     * @param {ReactiveMediaList} background_video
     */
    constructor(cover_images, background_video) {
        this.#cover_images = cover_images;
        this.#background_video = background_video;
    }
    
    /**
     * The cover images for the background.
     * @type {ReactiveMediaList}
     */
    get CoverImages() {
        return this.#cover_images;
    }

    /**
     * The background video for the page.
     * @type {ReactiveMediaList}
     */
    get BackgroundVideo() {
        return this.#background_video;
    }
}