const { parse } = require('svg-parser');
const { expect } = require('../Common');
const sparkline = require('../../lib/index.js');
const LibError = require('../../lib/LibError');
const { defaults } = require('../../lib/settings');

const values = [
  10,
  50,
  50,
  200,
  0,
];

describe('#lib index', function() {
  it('should export a function called sparkline', function() {
    expect(sparkline).to.be.a('function');
    expect(sparkline.name).to.equal('sparkline');
  });

  it('should throw an error when creating a sparkline with no values', function() {
    expect(() => sparkline()).to.throw(LibError).with.property('code', 'MISSING_VALUES');
    expect(() => sparkline({ width: 100 })).to.throw(LibError).with.property('name', 'InputError');
    expect(() => sparkline({ height: 100 })).to.throw(LibError).with.property('message', 'missing values to draw the sparkline');
  });

  it('should throw an error when creating a sparkline wrong values', function() {
    expect(() => sparkline({ values: true })).to.throw(LibError).with.property('code', 'INVALID_VALUES');
    expect(() => sparkline({ values: 15 })).to.throw(LibError).with.property('name', 'InputError');
    expect(() => sparkline({ values: '100,200,55,5,25' })).to.throw(LibError).with.property('message', 'values must be an array');
  });

  it('should return a SVG string with default settings if only values were specified', function() {
    const svg = sparkline({ values });
    const parsed = parse(svg);
    expect(svg).to.be.a('string');
    expect(parsed.children).to.be.an('array').and.to.have.lengthOf(1);

    // svg root
    const [root] = parsed.children;
    expect(root.tagName).to.equal('svg');
    expect(root.properties.xmlns).to.equal('http://www.w3.org/2000/svg');
    expect(root.properties.width).to.equal(defaults.width);
    expect(root.properties.height).to.equal(defaults.height);
    expect(root.properties.viewBox).to.equal(`0 0 ${defaults.width} ${defaults.height}`);
    expect(root.properties['shape-rendering']).to.equal('auto');
    expect(root.children).to.be.an('array').and.to.have.lengthOf(1);

    // polyline
    const [polyline] = root.children;
    expect(polyline.tagName).to.equal('polyline');
    expect(polyline.properties.stroke).to.equal(defaults.stroke);
    expect(polyline.properties['stroke-width']).to.equal(defaults.strokeWidth);
    expect(polyline.properties['stroke-opacity']).to.equal(defaults.strokeOpacity);
    expect(polyline.properties.fill).to.equal('none');
    expect(polyline.properties['fill-opacity']).to.equal(0);
  });

  it('should return a SVG string with specified settings provided', function() {
    const options = {
      values,
      width: 250,
      height: 100,
      stroke: 'blue',
      strokeWidth: 2,
      strokeOpacity: 0.5,
    };

    const svg = sparkline(options);
    const parsed = parse(svg);
    expect(svg).to.be.a('string');
    expect(parsed.children).to.be.an('array').and.to.have.lengthOf(1);

    // svg root
    const [root] = parsed.children;
    expect(root.tagName).to.equal('svg');
    expect(root.properties.xmlns).to.equal('http://www.w3.org/2000/svg');
    expect(root.properties.width).to.equal(options.width);
    expect(root.properties.height).to.equal(options.height);
    expect(root.properties.viewBox).to.equal(`0 0 ${options.width} ${options.height}`);
    expect(root.properties['shape-rendering']).to.equal('auto');
    expect(root.children).to.be.an('array').and.to.have.lengthOf(1);

    // polyline
    const [polyline] = root.children;
    expect(polyline.tagName).to.equal('polyline');
    expect(polyline.properties.stroke).to.equal(options.stroke);
    expect(polyline.properties['stroke-width']).to.equal(options.strokeWidth);
    expect(polyline.properties['stroke-opacity']).to.equal(options.strokeOpacity);
    expect(polyline.properties.fill).to.equal('none');
    expect(polyline.properties['fill-opacity']).to.equal(0);
  });
});
