const findEleventyVersion = require('./find-eleventy-version.js');
const getPackageJsonPath = require('./get-package-json-path.js');
const readPackageJson = require('./read-package-json.js');

const eleventyPluginMetaGenerator = async function eleventyPluginMetaGenerator () {
  try {
    const packageJsonPath = await getPackageJsonPath();
    const packageJson = await readPackageJson(packageJsonPath);
    const eleventyVersion = await findEleventyVersion(packageJson);
    return Promise.resolve(`<meta name="generator" content="Eleventy ${eleventyVersion}" />`);

  } catch(reason) {
    console.warn('eleventy-plugin-meta-generator:', reason);
    return Promise.resolve(`<meta name="generator" content="Eleventy" />`);
  };
}

module.exports = eleventyPluginMetaGenerator;
