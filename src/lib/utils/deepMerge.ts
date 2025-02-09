/**
 * Checks if the given item is a simple object.
 *
 * This function determines whether the provided item is a non-null object
 * that is not an array.
 *
 * @param item - The value to be checked.
 * @returns A boolean indicating whether the item is a simple object.
 *          Returns true if the item is a non-null object and not an array,
 *          false otherwise.
 */
export function isObject(item: unknown): boolean {
  // @ts-expect-error by design
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Performs a deep merge of two objects.
 *
 * This function recursively merges the properties of the source object into the target object.
 * If a property exists in both objects and is an object itself, it will be merged recursively.
 * Otherwise, the property from the source object will overwrite the one in the target object.
 *
 * @param target - The target object to merge into.
 * @param source - The source object whose properties will be merged into the target.
 * @returns A new object that is the result of deeply merging the source into the target.
 *          The original target object is not modified.
 * @typeParam T - The type of the target object.
 * @typeParam R - The type of the source object.
 */
// eslint-disable-next-line no-restricted-exports
export default function deepMerge<T, R>(target: T, source: R): T {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}
