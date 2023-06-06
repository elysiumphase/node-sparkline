const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const sparkline = require('../../../src');
const values = require('./values');

const writeFile = promisify(fs.writeFile);

(async () => {
  try {
    const svg = sparkline({
      values,
      width: 250,
      height: 100,
      stroke: '#e6007a',
      strokeWidth: 2.25,
      strokeOpacity: 1,
    });

    await writeFile(path.join(__dirname, 'sparkline.svg'), svg);
  } catch (e) {
    console.error(e.toString());
  }
})();
