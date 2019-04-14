const { readFile } = require('fs');
const { join } = require('path');

module.exports = async function () {
  try {
    const packageJsonPath = await getPackageJsonPath();
    const packageJson = await readPackageJson(packageJsonPath);
    const eleventyVersion = await findEleventyVersion(packageJson);
    return Promise.resolve(`<meta name="generator" content="Eleventy ${eleventyVersion}" />`);

  } catch(reason) {
    console.warn('eleventy-plugin-meta-generator:', reason);
    return Promise.resolve(`<meta name="generator" content="Eleventy" />`);
  });
};

function getPackageJsonPath () {
  return Promise.resolve(join(process.cwd(), 'package.json'));
}

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

function findEleventyVersion (packageJson) {
  if (packageJson.dependencies && packageJson.dependencies['@11ty/eleventy']) {
    return Promise.resolve(packageJson.dependencies['@11ty/eleventy']);
  }

  if (packageJson.devDependencies && packageJson.devDependencies['@11ty/eleventy']) {
    return Promise.resolve(packageJson.devDependencies['@11ty/eleventy']);
  }

  return Promise.reject(null);
}
