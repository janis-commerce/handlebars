# Handlebars

![Build Status](https://github.com/janis-commerce/handlebars/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/handlebars/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/handlebars?branch=master)
[![npm version](https://badge.fury.io/js/%40janiscommerce%2Fhandlebars.svg)](https://www.npmjs.com/package/@janiscommerce/handlebars)

For manage Handlebars with custom helpers

## Installation
```sh
npm install @janiscommerce/handlebars
```

## 📢 API

### Description
This package exports `Handlebars` with many helpers already registered, this will help us write faster and with more functionalities
### Usage
```js
const { Handlebars } = require('@janiscommerce/handlebars');
```

### Examples
```js
const template = '<html><body><h1>Example</h1></body></html>';

const templateCompiled = Handlebars.compile(template, 'strict');

const values = {
	...
}

templateCompiled(values)
```

## 📢 [Pre Compile](docs/preCompile.md) the template values

## 📢 [Post Compile](docs/postCompile.md) the compiled template

## 📢 Helpers

This package extends [built-in helpers](https://handlebarsjs.com/guide/builtin-helpers.html). See [custom helpers](docs/helpers.md) for more docs and usage.
