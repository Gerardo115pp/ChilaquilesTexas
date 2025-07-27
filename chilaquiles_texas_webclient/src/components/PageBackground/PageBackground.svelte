<script>
    import { browser } from '$app/environment';
    import { page } from '$app/state';
    import { onMount, tick, untrack } from 'svelte';
    
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
        $effect(handlePageBackgroundChangeEffect)

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
         * A blob url object corresponding to the active frame of the page video background when a navigation transition started.
         * used to fade from that frame to the new video. 
         * @type {string | undefined}
         */
        let video_transition_frame = $state();

        /**
         * Whether the cover image for the current `page_background` object has been loaded or not.
         * @type {boolean}
         */
        let is_page_background_cover_loaded = $state(false);

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

        loadCoverImage(page_background);

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
                        flushCurrentPageBackground,
                        isPageBackgroundStateUninitialized,
                        loadCoverImage: () => loadCoverImage(page_background),
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
                    console.log(`video_transition_frame: ${video_transition_frame}`);
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
         * Captures a frame from the video element as a webp. returns the frame as an image encoded in url form.
         * it will return null, if it can't retrieve the video element.
         * @returns {Promise<string | null>}
         */
        const captureVideoFrame = async () => {
            const video_element = getPageVideoBackgroundElement();

            if (video_element === null) {
                return null;
            }

            video_element.pause();

            let canvas = document.createElement("canvas");

            canvas.width = video_element.videoWidth;
            canvas.height = video_element.videoHeight;

            let ctx = canvas.getContext('2d');

            if (ctx === null) {
                console.error(`In @components/PageBackground/PageBackground.${captureVideoFrame.name}: Failed to get canvas context.`);
                return null;
            }

            ctx.drawImage(video_element, 0, 0, canvas.width, canvas.height);

            const mime_type = "image/webp";

            const response = new Promise((resolve, reject) => {
                canvas.toBlob((image_blob) => {
                    if (image_blob === null) {
                        reject(`In @components/PageBackground/PageBackground.${captureVideoFrame.name}: Failed to create blob from canvas.`);
                        return;
                    }
                    
                    const object_url = URL.createObjectURL(image_blob);

                    resolve(object_url);
                })
            });

            return response
        }

        /**
         * Flushes the current page background object.
         * @returns {void}
         */
        const flushCurrentPageBackground = () => {
            console.debug(`In @components/PageBackground/PageBackground.${flushCurrentPageBackground.name}: flushing current page background.`);
            is_page_background_cover_loaded = false;
            is_page_background_video_loaded = false;

            cover_image_url = undefined;
            video_background_url = undefined;
        }

        /**
         * Returns the video element for the page video background if it exists. null otherwise.
         * @returns {HTMLVideoElement | null}
         */
        const getPageVideoBackgroundElement = () => {
            const video_element_id = "txcbill-video-background";
            let local_video_element = document.getElementById(video_element_id);

            if (local_video_element == null || !(local_video_element instanceof HTMLVideoElement)) {
                console.error(`In @components/PageBackground/PageBackground.${getPageVideoBackgroundElement.name}: No video element with id '${video_element_id}' found.`);
                return null;
            }

            return local_video_element
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
        const handleCoverImageLoad = async event => {
            console.debug(`In @components/PageBackground/PageBackground.${handleCoverImageLoad.name}: Cover image '${cover_image_url}' loaded.`);

            is_page_background_cover_loaded = true;

            loadVideoBackground(page_background);
        }

        /**
         * Handles the load event of the video background.
         * @param {Event} event
         */
        const handleVideoBackgroundLoad = event => {
            is_page_background_video_loaded = true;
        }

        /**
         * Handles the `page_background` prop change effect.
         * @returns {void}
         */
        function handlePageBackgroundChangeEffect() {
            console.debug(`In @components/PageBackground/PageBackground.${handlePageBackgroundChangeEffect.name}: Refreshing page background.`);
            if (page_background == null) {
                console.log(`In @components/PageBackground/PageBackground.${handlePageBackgroundChangeEffect.name}: No page background found.`);
            }

            untrack(_handlePageBackgroundChange);
        }

        /**
         * Handles the `page_background` prop change. called by `handlePageBackgroundChangeEffect`
         * @returns {Promise<void>}
         */
        async function _handlePageBackgroundChange() {
            if (isPageBackgroundStateUninitialized()) {
                return;
            }

            await updateTransitionFrame();

            flushCurrentPageBackground();

            await tick();

            loadCoverImage(page_background);
        }

        /**
         * Whether the component state, related to the page background, is in a default state.
         * @returns {boolean}
         */
        const isPageBackgroundStateUninitialized = () => {
            const background_loaded = is_page_background_cover_loaded && is_page_background_video_loaded;
            return !background_loaded || cover_image_url === undefined || video_background_url === undefined;
        }

        /**
         * Whether the video background is loaded in the component state.
         * @returns {boolean}
         */
        const isVideoBackgroundURLDefined = () => {
            return is_page_background_video_loaded && video_background_url !== undefined;
        }

        /**
         * loads the cover image URL for the billboard.
         * @param {import('@models/PageBackgrounds').PageBackground} page_bg
         * @returns {void}
         */
        function loadCoverImage(page_bg) {
            if (!isPageBackgroundStateUninitialized()) {
                flushCurrentPageBackground();
            }

            const new_cover_url = page_bg.CoverImages.getFirstViableMedia();

            cover_image_url = new_cover_url;

            console.debug(`In @components/PageBackground/PageBackground.${loadCoverImage.name}: Cover image url set to: ${cover_image_url}`);
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

            video_background_url = resource_url;

            console.debug(`In @components/PageBackground/PageBackground.${loadVideoBackground.constructor.name}: video url (${resource_url}) changed`);
        }

        /**
         * Resets the state of the PageBackground component.
         * @returns {void}
         */
        const resetComponentState = () => {
            flushCurrentPageBackground();
        }

        /**
         * Updates the value of the video background transition frame from the current video background.
         * @returns {Promise<void>}
         */
        const updateTransitionFrame = async () => {
            if (!isVideoBackgroundURLDefined()) {
                console.error(`In @components/PageBackground/PageBackground.${updateTransitionFrame.name}: Video background is not defined.`);
                return;
            }

            const new_transition_frame_url = await captureVideoFrame();

            if (new_transition_frame_url === null) {
                console.error(`In @components/PageBackground/PageBackground.${updateTransitionFrame.name}: Failed to capture video frame.`);
                return;
            }

            if (video_transition_frame !== undefined) {
                URL.revokeObjectURL(video_transition_frame);
            }

            video_transition_frame = new_transition_frame_url;
            console.debug(`In @components/PageBackground/PageBackground.${updateTransitionFrame.name}: video transition frame updated to: ${video_transition_frame}`);
        }
    
    /*=====  End of Methods  ======*/
    
    
</script>

<div id="page-bg-billboard">
    <div id="pbgbill-underlay" class="pbgbill-content">
        {#if video_transition_frame}
            <div class="pbgbill-underlay-transition-frame pbgbill-underlay-wrapper"
                class:invisible-underlay={is_page_background_cover_loaded} 
            >
                <img id="txcbill-transition-frame" 
                    class="billboard-media"
                    src="{video_transition_frame}"
                    alt="" 
                >
            </div>
        {/if}
        {#if cover_image_url !== undefined}
            <div class="pbgbill-underlay-cover pbgbill-underlay-wrapper"
                class:invisible-underlay={is_page_background_video_loaded && video_background_url != null}
            >
                <img 
                    class="billboard-media"
                    src="{cover_image_url}"
                    alt=""
                    onload={handleCoverImageLoad}
                />
            </div>
        {/if}
        {#if video_background_url !== undefined}
            <div class="pbgbill-underlay-video pbgbill-underlay-wrapper"
                class:invisible-underlay={!is_page_background_video_loaded}
            >
                <video 
                    id="txcbill-video-background"
                    class="billboard-media"
                    oncanplay={handleVideoBackgroundLoad}
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
            z-index: var(--z-index-b-1);
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

        & .pbgbill-underlay-cover {
            z-index: var(--z-index-b-3);
        }

        & .pbgbill-underlay-video {
            z-index: var(--z-index-b-4);
        }
    }

    .pbgbill-content > .pbgbill-underlay-wrapper {
        /**
            Position absolute works by positioing the element
            on it's closest relative positioned ancestor(the common pattern).
            but if none is present, it positions itself on its closest 'conaining block'
            @see: https://developer.mozilla.org/en-US/docs/Web/CSS/position
            @see: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Containing_block#identifying_the_containing_block

            Long story short, position absolute will, in this case, position the element on #pbgbill-underlay.pbgbill-content because
            that element is the closest containing block, and thats
            because is a container(container: inline-size).
        */
        position: absolute;
        height: 100%;
        width: 100%;

        &.invisible-underlay {
            transition: opacity 0.5s ease-out;
            opacity: 0;
        }

        & .billboard-media {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .invisible-underlay:has(#txcbill-video-background) {
        transition: opacity 0s linear;
    }
</style>