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
    fill,
    fillOpacity,
  } = {}) {
    this.points = [];
    this.values = values;
    this.valuesLen = this.values.length;
    this.fill = fill;
    this.fillOpacity = fillOpacity;
    this.stroke = stroke;
    this.strokeOpacity = strokeOpacity;
    this.strokeWidth = strokeWidth;
    this.height = height;
    this.width = width;
    this.calculate();
  }

  calculate() {
    const offsetX = this.width / (this.valuesLen + 1);
    const { min, max } = minmax(this.values);
    const diff = max - min;
    let x = offsetX;

    this.points.push('0');
    this.values.forEach((value, index) => {
      const y = ((max - value) / diff) * this.height;

      if (index === this.valuesLen - 1) {
        this.points.push(`${y}`);
      } else {
        this.points.push(`${y} ${x}`);
      }

      x += offsetX;
    });
  }

  generate() {
    const points = `points="${this.points.join(', ')}"`;
    const fill = `fill="${this.fill}" fill-opacity="${this.fillOpacity}"`;
    const stroke = `stroke="${this.stroke}" stroke-opacity="${this.strokeOpacity}" stroke-width="${this.strokeWidth}"`;
    const polyline = `<polyline ${points} ${fill} ${stroke}></polyline>`;
    const box = `width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}"`;
    const render = 'shape-rendering="auto"';

    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" ${box} ${render}>${polyline}</svg>`;
  }
}

module.exports = Sparkline;
