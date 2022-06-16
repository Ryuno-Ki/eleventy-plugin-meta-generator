import { findEleventyVersion } from './find-eleventy-version.js';
import { getPackageJsonPath } from './get-package-json-path.js';
import { readPackageJson } from './read-package-json.js';

export async function eleventyPluginMetaGenerator () {
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
