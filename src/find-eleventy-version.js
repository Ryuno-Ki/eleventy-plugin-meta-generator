module.exports = findEleventyVersion;

function findEleventyVersion (packageJson) {
  if (packageJson.dependencies && packageJson.dependencies['@11ty/eleventy']) {
    return Promise.resolve(packageJson.dependencies['@11ty/eleventy']);
  }

  if (packageJson.devDependencies && packageJson.devDependencies['@11ty/eleventy']) {
    return Promise.resolve(packageJson.devDependencies['@11ty/eleventy']);
  }

  return Promise.reject(new Error('No dependency to eleventy found!'));
}
