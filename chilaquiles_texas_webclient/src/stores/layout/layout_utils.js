import { isMobileByDefault, VIEWPORT_SIZES } from "./layout_settings";
import { isBrowser } from "@libs/utils";


export function isMobile() {
    if (!isBrowser()) {
        return isMobileByDefault();
    }

    let is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!is_mobile && window.innerWidth < VIEWPORT_SIZES.MOBILE.WIDTH) {
        is_mobile = true;
    }

    
    return is_mobile;
}