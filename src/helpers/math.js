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

  const min = Math.min(...array)
  const max = Math.max(...array)

  return { min, max };
};

// exports
module.exports = Object.freeze({
  minmax,
});
