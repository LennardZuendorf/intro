/**
 * Inline pre-paint boot script. Runs synchronously before first paint and does
 * two things:
 *
 * 1. Marks `<html class="js">` so JS-gated CSS (the `[data-reveal]` scroll-reveal
 *    hide rule) applies from frame 0 — and, crucially, does NOT apply when JS is
 *    disabled, so no-JS visitors see all content instead of a blank page.
 * 2. Restores the stored accent (`lz_accent`) by setting `--primary` on <html>,
 *    eliminating the flash of the default lime accent.
 *
 * Intentionally does NOT touch `.dark` — mode no-flash is handled by
 * next-themes' own script. Interfering with that class would race it.
 */

import { ACCENT_OPTIONS, ACCENT_STORAGE_KEY as STORAGE_KEY } from './accents';

// Serialise once at build time so the browser payload is a simple string.
const inlineScript = `(function(){document.documentElement.classList.add('js');try{var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(s&&${JSON.stringify([...ACCENT_OPTIONS])}.indexOf(s)!==-1){document.documentElement.style.setProperty('--primary',s);}}catch(e){}})();`;

/**
 * Renders a blocking <script> tag (no async/defer) so the browser executes it
 * synchronously before any CSS paint, matching the pattern next-themes uses for
 * its own mode script.
 */
export function AccentScript() {
  return <script dangerouslySetInnerHTML={{ __html: inlineScript }} />;
}
