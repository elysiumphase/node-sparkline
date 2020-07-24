/**
 * Object helper library.
 *
 * Exports :
 *   - exists(thing) -> Boolean
 *   - is(Type, thing) -> Boolean
 *   - hasOwn(thing, prop) -> Boolean
 */

/**
 * @func exists
 *
 * whether the specified value is not null, undefined or NaN
 * @param  {Any} thing
 * @return {Boolean}
 */
const exists = function exists(thing) {
  return !(thing === undefined || thing === null || Number.isNaN(thing));
};

/**
 * @func is
 *
 * whether the specified value is from the specified type regarding its whole prototype
 * @param  {Function} Type a type function
 * @param  {Any} thing
 * @return {Boolean}
 */
const is = function is(Type, thing) {
  return exists(Type)
  && exists(thing)
  && (thing.constructor === Type
  || thing instanceof Type);
};

/**
 * @func hasOwn
 *
 * whether a specified object has a property in its own prototype, works with symbols
 * @param  {Any} thing
 * @param  {Any} prop
 * @return {Boolean}
 */
const hasOwn = function hasOwn(thing, prop) {
  return exists(thing) && Reflect.ownKeys(thing).indexOf(prop) !== -1;
};

// exports
module.exports = Object.freeze({
  exists,
  is,
  hasOwn,
});
