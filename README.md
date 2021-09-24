# Handlebars

![Build Status](https://github.com/janis-commerce/handlebars/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/handlebars/badge.svg?branch=JCN-325-Crear-Handlebars-package)](https://coveralls.io/github/janis-commerce/handlebars?branch=JCN-325-Crear-Handlebars-package)
[![npm version](https://badge.fury.io/js/handlebars.svg)](https://www.npmjs.com/package/@janiscommerce/handlebars)

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

## 📢 Helpers

* ### *List of helpers*
  * [lowercase](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md#lowercase)
  * [uppercase](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##uppercase)
  * [sumArgs](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##sumArgs)
  * [markdown](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##markdown)
  * [stringify](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##stringify)
  * [eq](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##eq)
  * [ne](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##ne)
  * [replace](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##replace)
  * [or](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##or)
  * [and](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##and)
  * [indexof](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##indexof)
  * [concat](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##concat)
  * [stripHost](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##stripHost)
  * [camelize](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##camelize)
  * [sanitize](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##sanitize)
  * [modulus](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##modulus)
  * [set](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##set)
  * [get](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##get)
  * [json](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##json)
  * [attributes](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##attributes)
  * [getToggle](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##getToggle)
  * [debugString](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##debugString)
  * [debug](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##debug)
  * [even](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##even)
  * [for](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##for)
  * [sumArgs](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##sumArgs)
  * [formatWeight](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##formatWeight)
  * [gte](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##gte)
  * [gt](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##gt)
  * [lte](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##lte)
  * [lt](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##lt)
  * [notIn](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##notIn)
  * [in](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##in)
  * [isFalse](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##isFalse)
  * [isTrue](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##isTrue)
  * [count](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##count)
  * [hasSubStr](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##hasSubStr)
  * [customFormatPrice](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##customFormatPrice)
  * [sumArray](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##sumArray)
  * [isNegative](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##isNegative)
  * [base1Index](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##base1Index)
  * [formatDate](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##formatDate)
  * [regexReplace](https://github.com/janis-commerce/handlebars/blob/JCN-325-Crear-Handlebars-package/docs/helpers.md##regexReplace)
