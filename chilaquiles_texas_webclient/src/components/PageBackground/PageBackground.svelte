<script>
    import { browser } from '$app/environment';
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    import { on } from 'svelte/events';
    
    /*=============================================
    =            Properties            =
    =============================================*/

        /**
        * @typedef {Object} PageBackgroundProps
         * @property {import('@models/PageBackgrounds').PageBackground} page_background
        */
    
        /**
         * The page background object the billboard will render.
         * @type {PageBackgroundProps}
         */
        let { page_background } = $props();

        /**
         * The url of the `page_background` cover image.
         * @type {string | undefined}
         */
        let cover_image_url = $state();

        /**
         * The url for the `page_background` video background.
         * @type {string | undefined}
         */
        let video_background_url = $state();

        /**
         * Whether the cover image for the current `page_background` object has been loaded or not.
         * @type {boolean}
         */
        let is_page_background_cover_loaded = false;

        /**
         * Whether the video background for the current `page_background` object has been loaded or not.
         * @type {boolean}
         */
        let is_page_background_video_loaded = $state(false);

        /**
         * Whether the component is in debug mode. this will make state information and methods available through the
         * navigator's dev tools.
         * @type {boolean}
         */
        const debug_mode = true;
    
    /*=====  End of Properties  ======*/
    
    onMount(() => {
        if (!browser) return;

        loadCoverImage();

        if (debug_mode) {
            debugTPB__attachDebugMethods();
        }
    });
    
    /*=============================================
    =            Methods            =
    =============================================*/
        /*=============================================
        =            Debug            =
        =============================================*/

                /**
                 * Returns the object where all the gallery debug state is stored.
                 * @returns {Object}
                 */
                const debugTPB__getComponentDebugObject = () => {
                    if (!browser || !debug_mode) return {};

                    const DEBUG_STATE_NAME = "page_background";

                    // @ts-ignore
                    if (!globalThis[DEBUG_STATE_NAME]) {
                        // @ts-ignore
                        globalThis[DEBUG_STATE_NAME] = {

                        };   
                    }

                    // @ts-ignore
                    return globalThis[DEBUG_STATE_NAME];
                }
        
                /**
                 * Attaches debug methods to the globalThis object for debugging purposes.
                 * @returns {void}
                 */
                const debugTPB__attachDebugMethods = () => {
                    if (!browser || !debug_mode) return;

                    const meg_gallery_debug_state = debugTPB__getComponentDebugObject();

                    // @ts-ignore - for debugging purposes we do not care whether the globalThis object has the method name. same reason for all other ts-ignore in this function.
                    meg_gallery_debug_state.printComponentState = debugTPB__printComponentState;

                    // @ts-ignore
                    meg_gallery_debug_state.Page = page;

                    // @ts-ignore - state retrieval functions.
                    meg_gallery_debug_state.State = {
                        getCurrentPageBackground,
                        getCurrentVideoBackground,
                        getCurrentCoverImage,
                        isPageBackgroundCoverLoaded: () => is_page_background_cover_loaded,
                        isPageBackgroundVideoLoaded: () => is_page_background_video_loaded,
                    }

                    // @ts-ignore - Internal method references.
                    meg_gallery_debug_state.Methods = {
                        resetComponentState,
                    }
                }

                /**
                 * Prints the whole gallery state to the console.
                 * @returns {void}
                 */
                const debugTPB__printComponentState = () => {
                    console.log("%cPageBackground State", "color: green; font-weight: bold;");
                    console.group("Properties");
                    console.log(`page_background: %O`, page_background);
                    console.log(`is_page_background_cover_loaded: ${is_page_background_cover_loaded}`);
                    console.log(`is_page_background_video_loaded: ${is_page_background_video_loaded}`);
                    console.log(`cover_image_url: ${cover_image_url}`);
                    console.log(`video_background_url: ${video_background_url}`);
                    console.groupEnd();
                }

                /**
                 * Attaches an arbitrary object as a globalThis.meg_timeline_states.<group_name>{...timestamp -> object }.
                 * @param {string} group_name
                 * @param {object} object_to_snapshot
                 * @returns {void}
                 */
                const debugTPB__attachSnapshot = (group_name, object_to_snapshot) => {
                    if (!browser || !debug_mode) return;

                    const stack = new Error().stack;
                    const datetime_obj = new Date();
                    const timestamp = `${datetime_obj.toISOString()}-${datetime_obj.getTime()}`;

                    const snapshot = {
                        timestamp,
                        stack,
                        object_to_snapshot,
                    }

                    const debug_object = debugTPB__getComponentDebugObject();

                    // @ts-ignore - that meg_timeline_states exists on globalThis if not, create it.
                    if (!debug_object.timeline_states) {
                        // @ts-ignore
                        debug_object.timeline_states = {};
                    }

                    // @ts-ignore
                    if (!debug_object.timeline_states[group_name]) {
                        // @ts-ignore
                        debug_object.timeline_states[group_name] = [];
                    }

                    // @ts-ignore
                    debug_object.timeline_states[group_name].push(snapshot);
                }
        
        /*=====  End of Debug  ======*/

        /**
         * Flushes the current page background object.
         * @returns {void}
         */
        const flushCurrentPageBackground = () => {
            is_page_background_cover_loaded = false;
            is_page_background_video_loaded = false;

            cover_image_url = undefined;
            video_background_url = undefined;
        }

        /**
         * Returns the current page.
         * @return {import('@models/PageBackgrounds').PageBackground}
         */
        const getCurrentPageBackground = () => {
            return page_background;
        }

        /**
         * Returns the current video background url.
         * @returns {string | undefined}
         */
        const getCurrentVideoBackground = () => {
            return video_background_url;
        }

        /**
         * Returns the current cover image url.
         * @returns {string | undefined}
         */
        const getCurrentCoverImage = () => {
            return cover_image_url;
        }

        /**
         * Handles the load event of the cover image.
         * @param {Event} event 
         */
        const handleCoverImageLoad = event => {
            is_page_background_cover_loaded = true;

            loadVideoBackground(page_background);
        }

        /**
         * loads the cover image URL for the billboard.
         * @returns {void}
         */
        const loadCoverImage = () => {
            const new_cover_url = page_background.CoverImages.getFirstViableMedia();

            cover_image_url = new_cover_url;
        }

        /**
         * Loads the page background video URL.
         * @param {import('@models/PageBackgrounds').PageBackground} page_bg
         * @returns {Promise<void>}
         */
        const loadVideoBackground = async page_bg => {
            const resource_url = page_bg.BackgroundVideo.getFirstViableMedia();

            if (resource_url === "") {
                console.error(`In @components/PageBackground/PageBackground.${loadCoverImage.constructor.name}: failed to retrieve a valid video url for: %O`, page_bg);
                return;
            }

            const video_element = await prefetchVideoElement(resource_url);

            if (video_element == null) {
                console.error(`In @components/PageBackground/PageBackground.${loadVideoBackground.constructor.name}: failed to prefetch video element for url: %O`, resource_url);
                return;
            }

            video_background_url = video_element.src;
            is_page_background_video_loaded = true;

            console.debug(`In @components/PageBackground/PageBackground.${loadVideoBackground.constructor.name}: video element(${resource_url}) loaded: %O`, video_element);
        }

        /**
         * Fetches the given video url into a video element and returns it when the load event is triggered.
         * returns null if there is an error while loading the video.
         * @param {string} video_url
         * @returns {Promise<HTMLVideoElement | null>}
         */
        const prefetchVideoElement = video_url => {
            const video_element = document.createElement('video');

            video_element.src = video_url;
            video_element.muted = true;
            video_element.autoplay = true;

            const response = new Promise((resolve, reject) => {
                video_element.onloadeddata = () => {
                    resolve(video_element);
                }

                video_element.onerror = () => {
                    resolve(null);
                }
            });

            return response;
        }

        /**
         * Resets the state of the PageBackground component.
         * @returns {void}
         */
        const resetComponentState = () => {
            flushCurrentPageBackground();
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<div id="page-bg-billboard">
    <div id="pbgbill-underlay" class="pbgbill-content">
        {#if cover_image_url !== undefined && !(is_page_background_video_loaded && video_background_url != null)}
            <div class="pbgbill-underlay-cover pbgbill-underlay-wrapper">
                <img 
                    class="billboard-media"
                    src="{cover_image_url}"
                    alt=""
                    onload={handleCoverImageLoad}
                >
            </div>
        {:else if video_background_url !== undefined && is_page_background_video_loaded}
            <div class="pbgbill-underlay-video pbgbill-underlay-wrapper">
                <video 
                    id="txcbill-video-background"
                    class="billboard-media"
                    src="{video_background_url}"
                    muted
                    autoplay
                    loop
                >

                </video>
            </div>
        {/if}
    </div>
    <div id="pbgbill-veneer"></div>
</div>

<style>
    #page-bg-billboard {
        width: 100%;
        height: 0;
        container-type: inline-size;

        & #pbgbill-underlay {
            z-index: var(--z-index-b-5);
        }

        & #pbgbill-veneer {
            z-index: var(--z-index-b-4);
        }
    }

    #pbgbill-underlay {
        container-type: size;

        & img, video {
            width: 100cqw;
            height: 100cqh;
        }
    }

    .pbgbill-content {
        position: fixed;
        inset: 0;
        width: 100cqw;
        height: 100dvh;
    }

    .pbgbill-content > .pbgbill-underlay-wrapper {
        height: 100%;
        width: 100%;

        & .billboard-media {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>