/**
 * Inline pre-paint script that restores the stored accent BEFORE first paint.
 *
 * Reads `lz_accent` from localStorage and sets `--primary` on <html>.
 * This eliminates the flash of the default lime accent when the visitor
 * has chosen a different accent.
 *
 * Intentionally does NOT touch `.dark` — mode no-flash is handled by
 * next-themes' own script. Interfering with that class would race it.
 */

const VALID_ACCENTS = ['#C6FF2E', '#FF2E9A', '#21E6E0', '#FF6A1A'];
const STORAGE_KEY = 'lz_accent';

// Serialise once at build time so the browser payload is a simple string.
const inlineScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(s&&${JSON.stringify(VALID_ACCENTS)}.indexOf(s)!==-1){document.documentElement.style.setProperty('--primary',s);}}catch(e){}})();`;

/**
 * Renders a blocking <script> tag (no async/defer) so the browser executes it
 * synchronously before any CSS paint, matching the pattern next-themes uses for
 * its own mode script.
 */
export function AccentScript() {
  return <script dangerouslySetInnerHTML={{ __html: inlineScript }} />;
}
