import test from 'ava';
import { findEleventyVersion } from '../src/find-eleventy-version.js'

const eleventyVersion = '0.8.2';

test('Finds the version of @11ty/eleventy as dependency', async (t) => {
  const version = await findEleventyVersion({
    'dependencies': {
      '@11ty/eleventy': eleventyVersion
    }
  });
  t.is(version, eleventyVersion);
});

test('Finds the version of @11ty/eleventy as devDependency', async (t) => {
  const version = await findEleventyVersion({
    'devDependencies': {
      '@11ty/eleventy': eleventyVersion
    }
  });
  t.is(version, eleventyVersion);
});

test('Bails if no version of @11ty/eleventy was found', async (t) => {
  const reason = await t.throwsAsync(findEleventyVersion({}));
  t.is(reason.message, 'No dependency to eleventy found!');
});
