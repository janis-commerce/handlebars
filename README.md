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

## 📢 Helpers

* ### *List of helpers*
  * [lowercase](docs/helpers.md#lowercase)
  * [uppercase](docs/helpers.md#uppercase)
  * [sumArgs](docs/helpers.md#sumArgs)
  * [stringify](docs/helpers.md#stringify)
  * [eq](docs/helpers.md#eq)
  * [ne](docs/helpers.md#ne)
  * [replace](docs/helpers.md#replace)
  * [or](docs/helpers.md#or)
  * [and](docs/helpers.md#and)
  * [indexof](docs/helpers.md#indexof)
  * [concat](docs/helpers.md#concat)
  * [stripHost](docs/helpers.md#stripHost)
  * [camelize](docs/helpers.md#camelize)
  * [sanitize](docs/helpers.md#sanitize)
  * [modulus](docs/helpers.md#modulus)
  * [set](docs/helpers.md#set)
  * [get](docs/helpers.md#get)
  * [json](docs/helpers.md#json)
  * [attributes](docs/helpers.md#attributes)
  * [getToggle](docs/helpers.md#getToggle)
  * [debugString](docs/helpers.md#debugString)
  * [debug](docs/helpers.md#debug)
  * [even](docs/helpers.md#even)
  * [for](docs/helpers.md#for)
  * [sumArgs](docs/helpers.md#sumArgs)
  * [formatWeight](docs/helpers.md#formatWeight)
  * [gte](docs/helpers.md#gte)
  * [gt](docs/helpers.md#gt)
  * [lte](docs/helpers.md#lte)
  * [lt](docs/helpers.md#lt)
  * [notIn](docs/helpers.md#notIn)
  * [in](docs/helpers.md#in)
  * [isFalse](docs/helpers.md#isFalse)
  * [isTrue](docs/helpers.md#isTrue)
  * [count](docs/helpers.md#count)
  * [hasSubStr](docs/helpers.md#hasSubStr)
  * [customFormatPrice](docs/helpers.md#customFormatPrice)
  * [currency](docs/helpers.md#currency)
  * [sumArray](docs/helpers.md#sumArray)
  * [isNegative](docs/helpers.md#isNegative)
  * [base1Index](docs/helpers.md#base1Index)
  * [formatDate](docs/helpers.md#formatDate)
  * [regexReplace](docs/helpers.md#regexReplace)
