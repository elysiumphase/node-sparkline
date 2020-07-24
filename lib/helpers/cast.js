/**
 * Type casting library utility.
 *
 *    - num(thing, { le, ge } = {}) -> Number or undefined
 */
const { is, exists } = require('./object');

/**
 * @func number
 *
 * cast to primitive number if possible or returns undefined
 * because Number(null) returns 0 and Number(undefined|NaN) returns NaN
 * beware to call Number.isFinite only on number values
 * NOTE: only finite values
 *
 * @param  {Any} thing a value to cast to primitive number
 * @return {Number|undefined}
 */
const number = function number(thing) {
  let castNum;

  if (exists(thing)) {
    const value = thing.valueOf();

    if (is(Number, value)) {
      if (Number.isFinite(value)) {
        castNum = value;
      }
    } else if (is(String, value) || is(Boolean, value)) {
      const cast = Number(value);

      if (Number.isFinite(cast)) {
        castNum = cast;
      }
    }
  }

  return castNum;
};

/**
 * @func num
 *
 * cast to primitive number, with 'less or equal than'
 * or 'greater or equal than' options, or returns undefined
 * NOTE: based on "number" function
 *
 * @param  {Any} thing a value to cast to primitive number
 * @return {Number|undefined}
 */
const num = function num(thing, { ge, le } = {}) {
  let castNum = number(thing);

  if (castNum !== undefined) {
    const lessThan = number(le);
    const greaterThan = number(ge);

    if (lessThan !== undefined && greaterThan !== undefined) {
      if (castNum < greaterThan || castNum > lessThan) {
        castNum = undefined;
      }
    } else if (lessThan !== undefined && castNum > lessThan) {
      castNum = undefined;
    } else if (greaterThan !== undefined && castNum < greaterThan) {
      castNum = undefined;
    }
  }

  return castNum;
};

// exports
module.exports = Object.freeze({
  number,
  num,
});
