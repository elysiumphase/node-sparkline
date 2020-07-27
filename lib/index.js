/**
 * node-sparkline
 *
 * A lightweight and zero-dependencies pure Node.js sparkline generator.
 *
 * Author: Adrien Valcke <adrienvalcke@icloud.com>
 */
const debug = require('./debug')('node-sparkline');
const Sparkline = require('./Sparkline');
const LibError = require('./LibError');
const { defaults } = require('./settings');
const {
  cast: {
    num,
  },
  color: {
    isColor,
  },
  object: {
    exists,
    is,
  },
} = require('./helpers');

/**
 * @func sparkline
 *
 * Generate a SVG drawing a sparkline based on specific values.
 *
 * @param  {Array} values            an array of values to draw the sparkline
 * @param  {Number} width            the width in pixels to fix for the generated SVG
 * @param  {Number} height           the height in pixels to fix for the generated SVG
 * @param  {String} stroke           the stroke color
 * @param  {Number} strokeWidth      the stroke width in pixels
 * @param  {Number} strokeOpacity    the stroke opacity
 * @return {String} SVG content
 */
const sparkline = function sparkline({
  values,
  width,
  height,
  stroke,
  strokeWidth,
  strokeOpacity,
} = {}) {
  // check values are not missing or empty
  if (!exists(values)) {
    throw new LibError(LibError.Codes.MISSING_VALUES);
  } else if (!is(Array, values)) {
    throw new LibError(LibError.Codes.INVALID_VALUES);
  }

  const settings = {
    values,
  };

  /**
   * ensure user settings match default settings types and have correct values
   * or keep default values
   */

  // width
  settings.width = num(width, { ge: 10 }) || defaults.width;

  // height
  settings.height = num(height, { ge: 10 }) || defaults.height;

  // stroke
  settings.stroke = isColor(stroke) ? stroke : defaults.stroke;

  // strokeWidth
  settings.strokeWidth = num(strokeWidth, { ge: 0 }) || defaults.strokeWidth;

  // strokeOpacity
  settings.strokeOpacity = num(strokeOpacity, { ge: 0, le: 1 }) || defaults.strokeOpacity;

  debug('settings:');
  debug(settings);

  // create a new Sparkline and generate SVG
  const svg = new Sparkline(settings).generate();

  debug('generated:');
  debug(svg);

  return svg;
};

module.exports = sparkline;
