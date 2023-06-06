const { parse } = require('svg-parser');
const { expect } = require('../Common');
const Sparkline = require('../../src/Sparkline/index.js');

const values = [
  10,
  50,
  50,
  200,
  0,
];

describe('#Sparkline index', function() {
  it('should create a new Sparkline object with the specified options and calculate expected points', function() {
    const sparkline = new Sparkline({
      values,
      width: 200,
      height: 50,
      stroke: 'blue',
      strokeWidth: 1.25,
      strokeOpacity: 1,
    });
    expect(sparkline.constructor).to.equal(Sparkline);
    expect(sparkline.values).to.be.an('array').and.to.eql(values);
    expect(sparkline.width).to.be.a('number').and.to.equal(200);
    expect(sparkline.height).to.be.a('number').and.to.equal(50);
    expect(sparkline.stroke).to.be.a('string').and.to.equal('blue');
    expect(sparkline.strokeWidth).to.be.a('number').and.to.equal(1.25);
    expect(sparkline.strokeOpacity).to.be.a('number').and.to.equal(1);

    expect(sparkline.points).to.be.an('array').and.to.have.lengthOf(values.length + 1);
    expect(sparkline.points).to.eql(['0', '47.5 40', '37.5 80', '37.5 120', '0 160', '50 200']);
  });

  it('should generate a valid SVG string', function() {
    const sparkline = new Sparkline({
      values,
      width: 200,
      height: 50,
      stroke: 'blue',
      strokeWidth: 1.25,
      strokeOpacity: 1,
    });
    const svg = sparkline.generate();
    const parsed = parse(svg);
    expect(svg).to.be.a('string');
    expect(parsed.children).to.be.an('array').and.to.have.lengthOf(1);

    // svg root
    const [root] = parsed.children;
    expect(root.tagName).to.equal('svg');
    expect(root.properties.xmlns).to.equal('http://www.w3.org/2000/svg');
    expect(root.properties.width).to.equal(sparkline.width);
    expect(root.properties.height).to.equal(sparkline.height);
    expect(root.properties.viewBox).to.equal(`0 0 ${sparkline.width} ${sparkline.height}`);
    expect(root.properties['shape-rendering']).to.equal('auto');
    expect(root.children).to.be.an('array').and.to.have.lengthOf(1);

    // polyline
    const [polyline] = root.children;
    expect(polyline.tagName).to.equal('polyline');
    expect(polyline.properties.points).to.equal(sparkline.points.join(', '));
    expect(polyline.properties.stroke).to.equal(sparkline.stroke);
    expect(polyline.properties['stroke-width']).to.equal(sparkline.strokeWidth);
    expect(polyline.properties['stroke-opacity']).to.equal(sparkline.strokeOpacity);
    expect(polyline.properties.fill).to.equal('none');
    expect(polyline.properties['fill-opacity']).to.equal(0);
  });
});
