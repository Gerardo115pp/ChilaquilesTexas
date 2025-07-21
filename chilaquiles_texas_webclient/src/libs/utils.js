/**
 * Whether the code is running on a windowed environment.
 * @returns {boolean}
 */
export const isBrowser = () => globalThis.addEventListener !== undefined;