const { is } = require('./object');

/**
 * @func minmax
 *
 * Directly get min and max values in a specific array.
 * NOTE: for performance use.
 *
 * @param  {Array} array
 * @return {Object} { min, max }
 */
const minmax = function minmax(array) {
  if (!is(Array, array)) {
    return { min: undefined, max: undefined };
  }

  let min;
  let max;

  array.forEach((value) => {
    if (max === undefined) {
      max = value;
    } else if (value > max) {
      max = value;
    }

    if (min === undefined) {
      min = value;
    } else if (value < min) {
      min = value;
    }
  });

  return { min, max };
};

// exports
module.exports = Object.freeze({
  minmax,
});
