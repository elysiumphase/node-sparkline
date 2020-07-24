const { writeFileSync } = require('fs');
const path = require('path');
const sparkline = require('../../../lib');
const values = require('./values');

try {
  const svg = sparkline({
    values,
    width: 250,
    height: 100,
    stroke: 'aliceblue',
    strokeWidth: 1.25,
    strokeOpacity: 1,
    fill: 'grey',
    fillOpacity: 1,
  });

  writeFileSync(path.join(__dirname, 'sparkline.svg'), svg);
} catch (e) {
  console.error(e.toString());
}
