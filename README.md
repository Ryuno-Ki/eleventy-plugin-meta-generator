# eleventy-plugin-meta-generator

![CircleCI status](https://img.shields.io/circleci/project/github/Ryuno-Ki/eleventy-plugin-meta-generator.svg?style=popout-square)
[![Known Vulnerabilities](https://snyk.io/test/github/Ryuno-Ki/eleventy-plugin-meta-generator/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Ryuno-Ki/eleventy-plugin-meta-generator?targetFile=package.json)
[![codecov](https://codecov.io/gh/Ryuno-Ki/eleventy-plugin-meta-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/Ryuno-Ki/eleventy-plugin-meta-generator) [![Greenkeeper badge](https://badges.greenkeeper.io/Ryuno-Ki/eleventy-plugin-meta-generator.svg)](https://greenkeeper.io/)

Adds a meta-generator tag to the head of the generated html files

## Installation

That's simple!

```sh
npm install eleventy-plugin-meta-generator
```

## Usage

Update your `.eleventy.js` like so:

```js
// For liquid
const generator = require('eleventy-plugin-meta-generator');

module.exports = function (eleventyConfig) {
  eleventyConfig.addLiquidTag("generator", () => {
    return {
      render: function() {
        return generator()
      }
    };
  });

  return {
    templateFormats: [
      'liquid'
    ]
  };
};
```

```js
const generator = require('eleventy-plugin-meta-generator');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksTag("generator", (nunjucksEngine) => {
    return new function() {
      this.tags = ["generator"];

      this.parse = function(parser, nodes, lexer) {
        var tok = parser.nextToken();

        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        return new nodes.CallExtensionAsync(this, "run", args);
      };

      this.run = function(_, myStringArg, callback) {
	generator()
	  .then((metaTag) => {
	    let ret = new nunjucksEngine.runtime.SafeString(metaTag);
	    callback(null, ret);
	  });
      };
    };
  });

  return {
    templateFormats: [
      'njk'
    ]
  };
```

Then you can use the new tag in your layout files:

```liquid
<!-- liquid syntax -->
{% generator %}
```

```njk
<!-- nunjucks syntax -->
{% generator '' %}
```

## License

MIT. See [LICENSE](./LICENSE)
