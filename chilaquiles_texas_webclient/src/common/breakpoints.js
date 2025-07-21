import { MediaBreakpoint } from "@models/ReactiveMedia";

export const breakpoints = {
    XL: new MediaBreakpoint({
        min_viewport_width: 2300,
    }),
    L: new MediaBreakpoint({
        min_viewport_width: 1300,
    }),
    M: new MediaBreakpoint({
        min_viewport_width: 600,
    }),
    S: new MediaBreakpoint({
        min_viewport_width: 300,
    })
}