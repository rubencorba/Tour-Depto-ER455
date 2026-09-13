/**
 * Matches small (phone-sized) screens in portrait orientation.
 * Tablets and desktops intentionally fall outside this query, since the
 * "rotate your device" prompt is only relevant to phones.
 */
export const PORTRAIT_PHONE_QUERY = '(max-width: 767px) and (orientation: portrait)';
/**
 * Detects a mobile device the same way Pannellum itself does internally
 * (to decide whether to show its VR/orientation button): sniffing the
 * user agent for "mobi". Unlike a viewport media query, this doesn't
 * change when the device is rotated or when a desktop window is resized.
 */
export function isMobileUserAgent(): boolean {
  return typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('mobi');
}