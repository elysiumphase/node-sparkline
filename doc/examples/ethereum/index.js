const { writeFileSync } = require('fs');
const path = require('path');
const sparkline = require('../../../lib');
const values = require('./values');

try {
  const svg = sparkline({
    values,
    width: 135,
    height: 50,
    stroke: '#57bd0f',
    strokeWidth: 1.25,
  });

  writeFileSync(path.join(__dirname, 'sparkline.svg'), svg);
} catch (e) {
  console.error(e.toString());
}
