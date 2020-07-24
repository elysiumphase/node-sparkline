const { writeFileSync } = require('fs');
const path = require('path');
const sparkline = require('../../../lib');
const values = require('./values');

try {
  const svg = sparkline({
    values,
    width: 250,
    height: 100,
    stroke: 'yellow',
    strokeWidth: 2.25,
  });

  writeFileSync(path.join(__dirname, 'sparkline.svg'), svg);
} catch (e) {
  console.error(e.toString());
}
