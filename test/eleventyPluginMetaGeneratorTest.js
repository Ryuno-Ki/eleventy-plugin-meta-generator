import test from 'ava';
import { eleventyPluginMetaGenerator } from '../src/eleventy-plugin-meta-generator.js';

const eleventyVersion = '1.0.1';

test("Renders a meta tag without version", async (t) => {
  t.is(await eleventyPluginMetaGenerator(), `<meta name="generator" content="Eleventy" />`);
});

// Unskip if you have @11ty/eleventy as devDependency or dependency
test.skip("Renders a meta tag with a version", async (t) => {
  t.is(await eleventyPluginMetaGenerator(), `<meta name="generator" content="Eleventy v${eleventyVersion}" />`);
});
