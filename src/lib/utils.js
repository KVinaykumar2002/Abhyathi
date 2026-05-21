/**
 * Merge class names; falsy values are omitted.
 * @param  {...(string | undefined | false | null)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
