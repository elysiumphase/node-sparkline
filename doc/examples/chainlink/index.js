const { writeFileSync } = require('fs');
const path = require('path');
const sparkline = require('../../../lib');
const values = require('./values');

try {
  const svg = sparkline({
    values,
    width: 135,
    height: 50,
    stroke: '#ed5565',
    strokeWidth: 1.25,
    strokeOpacity: 1,
  });

  writeFileSync(path.join(__dirname, 'sparkline.svg'), svg);
} catch (e) {
  console.error(e.toString());
}
