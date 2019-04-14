const { readFile } = require('fs');


module.exports = readPackageJson;

function readPackageJson (pathToPackageJson) {
  return new Promise((resolve, reject) => {
    try {
      readFile(pathToPackageJson, 'utf8', (err, content) => {
        if (err) {
	  return reject(err);
	}
	const packageJson = JSON.parse(content);
	return resolve(packageJson);
      });
    } catch (reason) {
      return reject(reason);
    }
  });
}
