const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const sparkline = require('../../../lib');
const values = require('./values');

const writeFile = promisify(fs.writeFile);

(async () => {
  try {
    const svg = sparkline({
      values,
      width: 500,
      height: 200,
      stroke: '#22a079',
      strokeWidth: 0.5,
      strokeOpacity: 1,
    });

    await writeFile(path.join(__dirname, 'sparkline.svg'), svg);
  } catch (e) {
    console.error(e.toString());
  }
})();
