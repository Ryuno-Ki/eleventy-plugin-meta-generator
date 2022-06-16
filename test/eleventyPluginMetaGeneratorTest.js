import test from 'ava';
import { eleventyPluginMetaGenerator } from '../src/eleventy-plugin-meta-generator.js';

test("Renders a meta tag without version", async (t) => {
  t.is(await eleventyPluginMetaGenerator(), '<meta name="generator" content="Eleventy" />');
});
