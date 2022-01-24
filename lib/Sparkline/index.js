/**
 * Sparkline
 *
 * points
 * values
 * valuesLen
 * width
 * height
 * stroke
 * strokeWidth
 * strokeOpacity
 *
 * calculate()
 * generate()
 */

const { math: { minmax } } = require('../helpers');

// note that input values are being checked at lib index
class Sparkline {
  constructor({
    values,
    width,
    height,
    stroke,
    strokeWidth,
    strokeOpacity,
  } = {}) {
    this.points = [];
    this.values = values;
    this.valuesLen = this.values.length;
    this.width = width;
    this.height = height;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.strokeOpacity = strokeOpacity;
    this.calculate();
  }

  calculate() {
    const offsetX = this.width / this.valuesLen;
    let { min, max } = minmax(this.values);
    let diff = max - min;
    let x = offsetX;

    if (max === 0 && min === 0) {
      max = 1;
      diff = 2;
    }

    if (diff === 0) {
      if (max > 0) {
        min = 0;
        max *= 2;
      } else {
        min = min + max;
        max = 0;
      }
      diff = max - min;
    }

    this.points.push('0');
    this.values.forEach((value) => {
      const y = ((max - value) / diff) * this.height;

      this.points.push(`${y} ${x}`);
      x += offsetX;
    });
  }

  generate() {
    const points = `points="${this.points.join(', ')}"`;
    const fill = 'fill="none" fill-opacity="0"';
    const stroke = `stroke="${this.stroke}" stroke-width="${this.strokeWidth}" stroke-opacity="${this.strokeOpacity}"`;
    const polyline = `<polyline ${points} ${stroke} ${fill}></polyline>`;
    const box = `width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}"`;
    const render = 'shape-rendering="auto"';

    return `<svg xmlns="http://www.w3.org/2000/svg" ${box} ${render}>${polyline}</svg>`;
  }
}

module.exports = Sparkline;
