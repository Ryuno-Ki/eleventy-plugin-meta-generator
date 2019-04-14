const { join } = require('path');


module.exports = getPackageJsonPath;

function getPackageJsonPath () {
  return Promise.resolve(join(process.cwd(), 'package.json'));
}
