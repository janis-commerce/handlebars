# Handlebars

![Build Status](https://github.com/janis-commerce/handlebars/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/handlebars/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/handlebars?branch=master)
[![npm version](https://badge.fury.io/js/handlebars.svg)](https://www.npmjs.com/package/handlebars)

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
  * [lowercase](#lowercase)
  * [uppercase](#uppercase)
  * [sumArgs](#sumArgs)
  * [markdown](#markdown)
  * [stringify](#stringify)
  * [eq](#eq)
  * [ne](#ne)
  * [replace](#replace)
  * [or](#or)
  * [and](#and)
  * [indexof](#indexof)
  * [concat](#concat)
  * [stripHost](#stripHost)
  * [camelize](#camelize)
  * [sanitize](#sanitize)
  * [modulus](#modulus)
  * [set](#set)
  * [get](#get)
  * [json](#json)
  * [attributes](#attributes)
  * [getToggle](#getToggle)
  * [debugString](#debugString)
  * [debug](#debug)
  * [even](#even)
  * [for](#for)
  * [sumArgs](#sumArgs)
  * [formatWeight](#formatWeight)
  * [gte](#gte)
  * [gt](#gt)
  * [lte](#lte)
  * [lt](#lt)
  * [notIn](#notIn)
  * [in](#in)
  * [false](#false)
  * [true](#true)
  * [count](#count)
  * [hasSubStr](#hasSubStr)
  * [customFormatPrice](#customFormatPrice)
  * [sumArray](#sumArray)
  * [isNegative](#isNegative)
  * [base1Index](#base1Index)
  * [formatDate](#formatDate)
  * [regexReplace](#regexReplace)


### <a id="lowercase" name="lowercase"></a> ➡️ lowercase
Return template with value in `lowercase` 😲

**Template 👀**
```html
<html><body><p>Phrase: "{{lowercase example}}"</body></html>
```
Parameters
* `text`:
	* type: `String`
	* The text to format

**Values ✍🏻**
```json
{
  "example": "uSe This EXAMLPE!!!"
}
```
**Result example 🤩**
```html
<html><body><p>Phrase: "use this example!!!"</p></body></html>
```
***********************************************************
### <a name="uppercase"></a> ➡️ uppercase
Return template with value in `uppercase` 😲

**Template 👀**
```html
<html><body><p>Phrase: "{{uppercase example}}"</body></html>
```

Parameters
* `text`:
	* type: `String`
	* The text to format

**Values ✍🏻**
```js
{
  example: "uSe This EXAMLPE!!!"
}
```
**Result example 🤩**
```html
<html><body><p>Phrase: "USE THIS EXAMPLE!!!"</p></body></html>
```
***********************************************************
### <a name="ansi"></a> ➡️ ansi
Return template in html from `ansi` format 😲

**Template 👀**
```html
<html><body>{{ansi example}}</body></html>
```

Parameters
* `text`:
	* type: `String`
	* The text in ansi format to convert to html

**Values ✍🏻**
```js
{
  example: "\x1b[30mblack\x1b[37mwhite"
}
```
**Result example 🤩**
```html
<html>
    <body>
        <span style="color:#2e3436">black<span style="color:#c5c5c5">white</span></span>
    </body>
</html>
```
***********************************************************
### <a name="markdown"></a> ➡️ markdown
Return template in html from `markdown` format 😲

**Template 👀**
```html
<html><body>{{markdown example}}</body></html>
```

Parameters
* `text`:
	* type: `String`
	* The text in markdown format to convert to html

**Values ✍🏻**
```js
{
    example: "## Test"
}
```
**Result example 🤩**
```html
<html>
    <body>
        <h2 id="test">Test</h2>
    </body>
</html>
```
***********************************************************
### <a name="stringify"></a> ➡️ stringify
Return template with a string from an object 😲

**Template 👀**
```html
<html><body>{{stringify example format}}</body></html>
```
Parameters
* `text`:
	* type: `Object`
	* The object to be string
* `format`:
    * type: `Boolean`
    * Option to format the object

**Values ✍🏻**
```js
{
    example: {
		name: "Rocky",
		lastName: "Balboa"
	},
	format: false
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>{"name":"Rocky","lastName":"Balboa"}</p>
    </body>
</html>
```
👉 Also, if we can pass the `format` value to `true`... 

**Values ✍🏻**
```js
{
    example: {
		name: "Rocky",
		lastName: "Balboa"
	},
	format: true
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>
            {
                "name": "Rocky",
                "lastName": "Balboa"
            }
        </p>
    </body>
</html>
```
***********************************************************
### <a name="eq"></a> ➡️ eq
Checks if the first argument is `equal` to the second one

Return template inside of the block if the condition is `true`

**Template 👀**
```html
<html>
    <body>
        <p>
            {{#eq first second}}Are Equal{{else}}Are not equal{{/eq}}
        </p>
    </body>
</html>
```

Parameters
* `first`:
    * type:
      * `String`
      * `Number`
      * `Boolean`
	* The first value to compare
* `second`:
    * type:
      * `String`
      * `Number`
      * `Boolean`
	* The first value to compare

**Values ✍🏻**
```js
{
    first: 100,
    second: 100
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>Are Equal</p>
    </body>
</html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    first: "example",
    second: 100
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>Are Not Equal</p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************
### <a name="ne"></a> ➡️ ne
Checks if the first argument is `not equal` to the second one

Return template inside of the block if the condition is `true`

**Template 👀**
```html
<html>
    <body>
        <p>
            {{#ne first second}}Are Not Equal{{else}}Are equal{{/ne}}
        </p>
    </body>
</html>
```

Parameters
* `first`:
    * type:
      * `String`
      * `Number`
      * `Boolean`
	* The first value to compare
* `second`:
    * type:
      * `String`
      * `Number`
      * `Boolean`
	* The first value to compare

**Values ✍🏻**
```js
{
    first: "example",
    second: 100
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>Are Not Equal</p>
    </body>
</html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    first: 100,
    second: 100
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>Are Equal</p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### <a name="replace"></a> ➡️ replace
Return template with a text with values `replaced` that be equal to an `pattern` 😲

**Template 👀**
```html
<html><body><p>{{replace text search replace}}</p></body></html>
```

Parameters
* `text`:
	* type: `String`
	* The text to be analyzed and replaced
* `search`
    * type: `String`
    * The text to search
* `replace`
    * type: `String`
    * The text to replace in text

**Values ✍🏻**
```js
{
    text: "This is an example",
    search: "an example",
    replace: "a test"
}
```
**Result example 🤩**
```html
<html><body><p>This is a test</p></body></html>
```

*****************************************************
### <a name="or"></a> ➡️ or
Checks if any of arguments are `truthy` 

Return template inside of the block if the condition is `true`

**Template 👀**
```html
<html>
    <body>
        <p>
            {{#or arg1 arg2 arg3}}Any of arguments are truthy{{else}}All of arguments are falsy{{/or}}
        </p>
    </body>
</html>
```

Parameters
* `...args`:
    * type:
      * `String`
      * `Number`
      * `Object`
      * `Array`
      * `Boolean`
	* The values to analyze

**Values ✍🏻**
```js
{
    arg1: true,
    arg2: false,
    arg3: 0
}
```
**Result example 🤩**
```html
<html><body><p>Any of arguments are truthy</p></body></html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    arg1: "",
    arg2: false,
    arg3: 0
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>All of arguments are falsy</p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************
### <a name="and"></a> ➡️ and
Checks if all of arguments are `truthy` 

Return template inside of the block if the condition is `true`

**Template 👀**
```html
<html>
    <body>
        <p>
            {{#and arg1 arg2 arg3}}All of arguments are truthy{{else}}Any of arguments are falsy{{/and}}
        </p>
    </body>
</html>
```

Parameters
* `...args`:
    * type:
      * `String`
      * `Number`
      * `Object`
      * `Array`
      * `Boolean`
	* The values to analyze

**Values ✍🏻**
```js
{
    arg1: true,
    arg2: "test",
    arg3: 10
}
```
**Result example 🤩**
```html
<html><body><p>All of arguments are truthy</p></body></html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    arg1: true,
    arg2: false,
    arg3: 10
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>Any of arguments are falsy</p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************
### <a name="indexof"></a> ➡️ indexof
Checks if the value exist in a array or the property exists in a object.

Return template inside of the block if the condition is `true`


**Template 👀**
```html
<html>
    <body>
        <p>
            {{#indexof needle container}}
                The value is inside of container
                {{else}}The value is not inside of container
            {{/indexof}}
        </p>
    </body>
</html>
```

Parameters
* `needle`:
    * type:
      * `String`
      * `Number`
      * `Boolean`
	* The values to search
* `container`:
    * type:
      * `String`
      * `Number`
      * `Object`
      * `Array`
      * `Boolean`
    * The array or object

**Values ✍🏻**
```js
{
    needle: true,
    container: [1,2,true]
}
```
**Result example 🤩**
```html
<html><body><p>The value is inside of container</p></body></html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    needle: "lastname",
    container: {
        name: "Rocky",
        birthdate: "03/08/2001"
    }
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>The value is not inside of container</p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### <a name="concat"></a> ➡️ concat
Return template with the values `concatenated` 😲

**Template 👀**
```html
<html><body><p>{{concat value1 value2 value3}}</p></body></html>
```

Parameters
* `...args`:
    * type:
      * `String`
      * `Number`
      * `Boolean`
	* The values to concat

**Values ✍🏻**
```js
{
    value1: "Hello",
    value2: true,
    value3: 123
}
```
**Result example 🤩**
```html
<html><body><p>Hellotrue123</p></body></html>
```

***********************************************************

### <a name="stripHost"></a> ➡️ stripHost
`Strips` a host from a URL 

**Template 👀**
```html
<html><body><p>{{stripHost url}}</p></body></html>
```

Parameters
* `url`:
	* type: `String`
	* The url to 

**Values ✍🏻**
```js
{
    value1: "http://google.com.ar/search"
}
```
**Result example 🤩**
```html
<html><body><p>/search</p></body></html>
```

***********************************************************

### <a name="camelize"></a> ➡️ camelize
Return template with value `camelized` 😲

**Template 👀**
```html
<html><body><p>{{camelize text}}</p></body></html>
```

Parameters
* `text`:
	* type: `String`
	* The text to camelize

**Values ✍🏻**
```js
{
    text: "ThE example to cAMELIZE"
}
```
**Result example 🤩**
```html
<html><body><p>theExampleToCamelize</p></body></html>
```

***********************************************************

### <a name="sanitize"></a> ➡️ sanitize
Return template with value `sanitized` 😲

**Template 👀**
```html
<html><body><p>{{sanitize text}}</p></body></html>
```

Parameters
* `text`:
	* type: `String`
	* The text to sanitize

**Values ✍🏻**
```js
{
    text: "ThE-example-to-saNITIZE"
}
```
**Result example 🤩**
```html
<html><body><p>theexampletosanitize</p></body></html>
```
***********************************************************
### <a name="modulus"></a> ➡️ modulus
Make the `module` operation.

Return template inside of the block if the result is `correct`


**Template 👀**
```html
<html>
    <body>
        <p>
            {{#modulus index mod result}}
                The result is 0
                {{else}}The result is incorrect
            {{/modulus}}
        </p>
    </body>
</html>
```

Parameters
* `index`:
	* type: `Number`
	* The value to make the operation
* `mod`:
    * type: `Number`
    * The modulus value
* `result`:
    * type: `Number`
    * The result

**Values ✍🏻**
```js
{
    index: 20,
	mod: 2,
	result: 0
}
```
**Result example 🤩**
```html
<html><body><p>The result is 0</p></body></html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
	index: 20,
	mod: 2,
	result: 12
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>The result is incorrect</p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### <a name="set"></a> ➡️ set
`Set` the value of an object's property 😲

Return an empty string 

**Template 👀**
```html
<html><body><p>{{set object path value}}</p></body></html>
```

Parameters
* `object`:
	* type: `Object`
	* The object
* `path`
    * type: `String`
    * The property's path
* `value`
    * type: `String`
    * The value to set

**Values ✍🏻**
```js
{
	object: {
		foo: {
			bar: true
		},
		other: "Other"
	},
	path: "foo.bar",
	value: "valueChanged"
}
```
**Result example 🤩**
```html
<html><body><p></p></body></html>
```

***********************************************************

### <a name="get"></a> ➡️ get
`Get` the value of an object's property 😲

If the property not exists return an empty string 

**Template 👀**
```html
<html><body><p>{{get object path}}</p></body></html>
```

Parameters
* `object`:
	* type: `Object`
	* The object
* `path`
    * type: `String`
    * The property's path

**Values ✍🏻**
```js
{
	object: {
		foo: {
			bar: "Hello!"
		},
		other: "Other"
	},
	path: "foo.bar"
}
```
**Result example 🤩**
```html
<html><body><p>Hello!</p></body></html>
```

***********************************************************

### <a name="json"></a> ➡️ json
Parse `json` to object 😲

**Template 👀**
```html
<html>
    <body>
        {{#json example}}
            <h1>{{name}}</h1>
            <h2>{{lastName}}</h2>
        {{/json}}
    </body>
</html>
```

Parameters
* `objectJson`:
	* type: `String`
	* The object in json  

**Values ✍🏻**
```js
{
	example: "{'name':'Rocky','lastname':'Balboa'}" 
}
```
**Result example 🤩**
```html
<html>
    <body>
            <h1>Rocky</h1>
            <h2>Balboa</h2>
    </body>
</html>
```

***********************************************************

### <a name="attributes"></a> ➡️ attributes

Generate `attributes` with an object as param 😲

**Template 👀**
```html
<html>
    <body>
        <h1 {{attributes example}}>Hello!</h1>
    </body>
</html>
```

Parameters
* `object`:
	* type: `Object`
	* The object to generate attributes  

**Values ✍🏻**
```js
{
	example: {
        class: "red",
        other: "otherValue"
    }
}
```
**Result example 🤩**
```html
<html>
    <body>
        <h1 class="red"other="otherValue">Hello!</h1>
    </body>
</html>
```
***********************************************************
### <a name="getToggle"></a> ➡️ getToggle 
Return an object's property or placeholder 😲

**Template 👀**
```html
<html><body><p>{{getToggle object key placeholder}}</p></body></html>
```

Parameters
* `object`:
	* type: `Object`
	* The object
* `key`:
    * type: `Number`
    * The object's property to get
* `placeholder`:
    * type: `String`
    * The string to show if the key don't exists

**Values ✍🏻**
```js
{
	object: {
		greet: 'Hello!'
	},
	key: 'greet',
	placeholder: 'Placeholder'
}
```
**Result example 🤩**
```html
<html><body><p>Hello!</p></body></html>
```

⚠️ If the key don't exists in the object 

**Values ✍🏻**
```js
{
	object: {
		greet: 'Hello!'
	},
	key: 'other',
	placeholder: 'Placeholder'
}
```
**Result example 🤩**
```html
<html><body><p>Placeholder</p></body></html>
```

***********************************************************

### <a name="debugString"></a> ➡️ debugString

Convert object to html as `text preformatted` 😲

**Template 👀**
```html
<html><body>{{debugString object}}</body></html>
```

Parameters
* `object`:
	* type: `Object`
	* The object to format

**Values ✍🏻**
```js
{
	object: {
        name: "Fizzmod"
    }
}
```
**Result example 🤩**
```html
<html>
    <body>
        <pre>
            {
                "name":"Fizzmod"
            }
        </pre>
    </body>
</html>

```

***********************************************************

### <a name="debug"></a> ➡️ debug

Convert object or value to html as `text preformatted` 😲

**Template 👀**
```html
<html><body>{{debug value}}</body></html>
```

Parameters
* `value`:
    * type:
      * `String`
      * `Number`
      * `Object`
      * `Array`
      * `Boolean`
	* The object or value to parse

**Values ✍🏻**
```js
{
	object: {
        name: "Fizzmod"
    }
}
```
**Result example 🤩**
```html
<html>
    <body>
        <style>body { position: static!important;}</style>
        <pre>[object] { name: \'Fizzmod\' }</pre>
    </body>
</html>

```
***********************************************************

### <a name="even"></a> ➡️ even

Checks if a number is `even` or `odd` 😲

Return the value `even` if the condition is `true`, otherwise return `odd`

**Template 👀**
```html
<html><body><p>{{even index even odd}}</p></body></html>
```

Parameters
* `index`:
	* type: `Number`
	* The number to analyze
* `even`:
    * type:
      * `String`
      * `Number`
      * `Boolean`
    * The value to return when index is even
* `odd`:
    * type:
      * `String`
      * `Number`
      * `Boolean`
    * The value to return when index is odd
  
**Values ✍🏻**
```js
{
	index: 7,
	even: 'The number is even',
	odd: 'The number is odd'
}
```
**Result example 🤩**
```html
<html><body><p>The number is even</p></body></html>
```

👉 Also, if we can pass a odd `index`, returns the value `odd`

**Values ✍🏻**
```js
{
	index: 6,
	even: 'The number is even',
	odd: 'The number is odd'
}
```
**Result example 🤩**
```html
<html><body><p>The number is odd</p></body></html>
```
***********************************************************
### <a name="for"></a> ➡️ for
Make a `loop` and returns the template inside of the block and a `value incremented` for each iteration

**Template 👀**
```html
<html>
    <body>
        <p>
            {{#for from to}}
                <li>Index: {{this}} </li>
            {{/from}}
        </p>
    </body>
</html>
```

Parameters
* `from`:
	* type: `Number`
	* The value to start the iteration
* `to`:
    * type: `Number`
	* The value to finish the iteration
  
**Values ✍🏻**
```js
{
    from: 0,
	to: 2,
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>
            <li>Index: 0 </li>
            <li>Index: 1 </li>
        </p>
    </body>
</html>
```
***********************************************************

### <a name="sumArgs"></a> ➡️ sumArgs

`Sum` all of arguments and return the result 😲

**Template 👀**
```html
<html><body><p>{{sumArgs arg1 arg2 arg3}}</p></body></html>
```

Parameters
* `...args`:
	* type: `Number`
	* The numbers to sum
  
**Values ✍🏻**
```js
{
	arg1: 7,
	arg2: 2,
	arg3: 3
}
```
**Result example 🤩**
```html
<html><body><p>12</p></body></html>
```
***********************************************************

### <a name="formatWeight"></a> ➡️ formatWeight

`Format` a weight value 😲

**Template 👀**
```html
<html><body><p>{{formatWeight number decimal length}}</p></body></html>
```

Parameters
* `weight`:
	* type: `Number`
	* The weight to format
* `decimal`
    * type: `String`
    * The decimal separator  ==> "." or "," ...
* `length`
    * type: `Number`
    * The length of the decimals
  
**Values ✍🏻**
```js
{
	weight: 120.456,
	decimal: ",",
	length: 2
}
```
**Result example 🤩**
```html
<html><body><p>120,45</p></body></html>
```

***********************************************************

### <a name="gte"></a> ➡️ gte
Checks if the first param is` greater than or equal` the second one 😲

Return template inside of the block if the condition is `true`


**Template 👀**
```html
<html>
    <body>
        <p>
            {{#gte first second}}
                The first is greater than or equal the second one 
                {{else}}The first is not greater than or equal the second one
            {{/gte}}
        </p>
    </body>
</html>
```

Parameters
* `first`:
	* type: `Number`
	* The first number to check
* `second`:
    * type: `Number`
    * The second number to check

**Values ✍🏻**
```js
{
    first: 2,
	second: 2
}
```
**Result example 🤩**
```html
<html><body><p> The first is greater than or equal the second one  </p></body></html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    first: 2,
	second: 20
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>The first is not greater than or equal the second one </p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### <a name="gt"></a> ➡️ gt
Checks if the first param is `greater than` the second one 😲

Return template inside of the block if the condition is `true`


**Template 👀**
```html
<html>
    <body>
        <p>
            {{#gt first second}}
                The first is greater than the second one 
                {{else}}The first is not greater than the second one 
            {{/gt}}
        </p>
    </body>
</html>
```

Parameters
* `first`:
	* type: `Number`
	* The first number to check
* `second`:
    * type: `Number`
    * The second number to check

**Values ✍🏻**
```js
{
    first: 20,
	second: 2
}
```
**Result example 🤩**
```html
<html><body><p> The first is greater than the second one </p></body></html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    first: 2,
	second: 20
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>The first is not greater than the second one </p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### <a name="lt"></a> ➡️ lt
Checks if the first param is `lower than` the second one 😲

Return template inside of the block if the condition is `true`


**Template 👀**
```html
<html>
    <body>
        <p>
            {{#lt first second}}
                The first is lower than the second one 
                {{else}}The first is not lower than the second one 
            {{/lt}}
        </p>
    </body>
</html>
```

Parameters
* `first`:
	* type: `Number`
	* The first number to check
* `second`:
    * type: `Number`
    * The second number to check

**Values ✍🏻**
```js
{
    first: 2,
	second: 20
}
```
**Result example 🤩**
```html
<html><body><p> The first is lower than the second one </p></body></html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    first: 10,
	second: 2
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>The first is not lower than the second one </p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### <a name="lte"></a> ➡️ lte
Checks if the first param is `lower than or equal` the second one 😲

Return template inside of the block if the condition is `true`


**Template 👀**
```html
<html>
    <body>
        <p>
            {{#lte first second}}
                The first is lower than or equal the second one 
                {{else}}The first is not lower than or equal the second one
            {{/lte}}
        </p>
    </body>
</html>
```

Parameters
* `first`:
	* type: `Number`
	* The first number to check
* `second`:
    * type: `Number`
    * The second number to check

**Values ✍🏻**
```js
{
    first: 2,
	second: 2
}
```
**Result example 🤩**
```html
<html><body><p> The first is lower than or equal the second one  </p></body></html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    first: 20,
	second: 2
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>The first is not lower than or equal the second one </p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### <a name="notIn"></a> ➡️ notIn
Check if the value doesn't exists in the string passed ("value1,value2",...) 😲

Return template inside of the block if the condition is `true`


**Template 👀**
```html
<html>
    <body>
        <p>
            {{#notIn age illegalAges}}
                Im can drink beer
                {{else}}I mustn't drink beer 
            {{/notIn}}
        </p>
    </body>
</html>
```

Parameters
* `value`:
    * type:
      * `String`
      * `Number`
	* The value to search
* `values`:
    * type: `String`
    * The string to search the value

**Values ✍🏻**
```js
{
    age: 19,
	illegalAges: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17"
}
```
**Result example 🤩**
```html
<html><body><p> Im can drink beer</p></body></html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    age: 14,
	second: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17"
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>I mustn't drink beer</p>
    </body>
</html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### <a name="in"></a> ➡️ in
Check if the value exists in the string passed ("value1,value2",...) 😲

Return template inside of the block if the condition is `true`


**Template 👀**
```html
<html>
    <body>
        <p>
            {{#in age illegalAges}}
                I mustn't drink beer
                {{else}}Im can drink beer
            {{/in}}
        </p>
    </body>
</html>
```

Parameters
* `value`:
    * type:
      * `String`
      * `Number`
	* The value to search
* `values`:
    * type: `String`
    * The string to search the value

**Values ✍🏻**
```js
{
    age: 14,
	illegalAges: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17"
}
```
**Result example 🤩**
```html
<html><body><p>I mustn't drink beer</p></body></html>

```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    age: 20,
	second: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17"
}
```
**Result example 🤩**
```html
<html><body><p> Im can drink beer</p></body></html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### <a name="false"></a> ➡️ false

Check if `all` of arguments are `false` 😲

If the condition is true returns `true`, otherwise `false`

**Template 👀**
```html
<html><body><p>{{false arg1 arg2}}</p></body></html>
```

Parameters
* `...args`:
    * type:
      * `String`
      * `Number`
      * `Object`
      * `Array`
      * `Boolean`
	* The values to check

**Values ✍🏻**
```js
{
    arg1: 0,
	arg2: false
}
```
**Result example 🤩**
```html
<html><body><p>true</p></body></html>
```

***********************************************************

### <a name="true"></a> ➡️ true

Check if `all` of arguments are `true` 😲

If the condition is true returns `true`, otherwise `false`

**Template 👀**
```html
<html><body><p>{{true arg1 arg2}}</p></body></html>
```

Parameters
* `...args`:
    * type:
      * `String`
      * `Number`
      * `Object`
      * `Array`
      * `Boolean`
	* The values to check

**Values ✍🏻**
```js
{
    arg1: "Hello!",
	arg2: true
}
```
**Result example 🤩**
```html
<html><body><p>true</p></body></html>
```

***********************************************************

### <a name="count"></a> ➡️ count

Return the `length` of a value [array, object, string] 😲

**Template 👀**
```html
<html>
    <body>
        <p>{{count string}}</p>
        <p>{{count object}}</p>
        <p>{{count array}}</p>
    </body>
</html>
```

Parameters
* `value`:
    * type:
      * `String`
      * `Object`
      * `Array`
	* The values to check

**Values ✍🏻**
```js
{
    string: "Hello",
    object: {
        name: "Rocky",
        lastname: "Balboa"
    },
    array:[1,2,3]
}
```
**Result example 🤩**
```html
<html>
    <body>
        <p>5</p>
        <p>2</p>
        <p>3</p>
    </body>
</html>
```

***********************************************************

### <a name="hasSubStr"></a> ➡️ hasSubStr

Checks if the text contains the `subString` 😲

If the condition is true returns `true`, otherwise `false`

```html
<html><body><p>{{hasSubStr text subStr}}</p></body></html>
```

Parameters
* `text`:
    * type:
      * `String`
	* The text to search the substring
* `substring`
    * type:
      * `String`
    * The substring

**Values ✍🏻**
```js
{
    text: "We are Fizzmod!!!",
    substring: "We are"
}
```
**Result example 🤩**
```html
<html><body><p>true</p></body></html>
```

👉 Also, We can write a `block`

```html
<html>
    <body>
        <p>
            {{#hasSubStr text subStr}}
                The text contains the substring
                {{else}} The text don't contains the substring
            {{/hasSubStr}}
        </p>
    </body>
</html>
```
**Result example 🤩**
```html
<html><body><p>The text contains the substring</p></body></html>
```

⚠️ If the condition is `false` return the `else` block

**Values ✍🏻**
```js
{
    text: "We are Fizzmod!!!",
    substring: "Other"
}
```
**Result example 🤩**
```html
<html><body><p>The text don't contains the substring</p></body></html>
```

> 🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`


***********************************************************

### <a name="customFormatPrice"></a> ➡️ customFormatPrice

Format `price` 😲

**Template 👀**
```html
<html>
    <body>
        <h1>{{customFormatPrice number thousands decimals length currency}}</h1>
    </body>
</html>
```

Parameters
* `number`:
    * type: `Number`
	* The number to format to price
* `thousands`
    * type: `String`
    * The thousands separator => "." or "," ...
* `decimals`
    * type:
      * `String`
    * The decimal separator => "." or "," ...
* `length`
    * type:
      * `Number`
    * The number of decimals displayed
* `currency`
    * type:
      * `String`
    * The price's currency 

**Values ✍🏻**
```js
{
	number: 12345.12345,
	thousands: '.',
	decimals: ',',
	length: 3,
	currency: '$'
}
```
**Result example 🤩**
```html
<html><body><h1>$12.345,123</h1></body></html>
```

***********************************************************

### <a name="sumArray"></a> ➡️ sumArray

`Sum` all items values of an `array` 😲

**Template 👀**
```html
<html><body><h1>{{sumArray array key}}</h1></body></html>
```

Parameters
* `array`:
    * type: `Array`
	* The array to loop
* `thousands`
    * type:
      * `Boolean`
      * `String`
    * The key from which to extract numbers to sum, if none, it assumes an array of numbers

**Values ✍🏻**
```js
{
	array: [1,2,3],
    key: false
}
```
**Result example 🤩**
```html
<html><body><h1>6</h1></body></html>
```

👉 Also, we can have an array of objects. We have to set the `key param` with the object's key

**Values ✍🏻**
```js
{
    array: [
    	{ number: 1 },
    	{ number: 2 },
    	{ number: 3 }
    ],
    key: 'number'
}
```
**Result example 🤩**
```html
<html><body><h1>6</h1></body></html>
```

***********************************************************

### <a name="isNegative"></a> ➡️ isNegative

Checks if the number is `negative` 😲

If the condition is true returns `true`, otherwise `false`

**Template 👀**
```html
<html><body><h1>{{isNegative number}}</h1></body></html>
```

Parameters
* `number`:
    * type:`Number`
	* The number to check

**Values ✍🏻**
```js
{
	number: -1
}
```
**Result example 🤩**
```html
<html><body><h1>true</h1></body></html>
```

***********************************************************

### <a name="base1Index"></a> ➡️ base1Index

`Increment` 1 to a number 😲

If the condition is true returns `true`, otherwise `false`

**Template 👀**
```html
<html><body><h1>{{base1Index number}}</h1></body></html>
```

Parameters
* `number`:
    * type: `Number`
	* The number to increment

**Values ✍🏻**
```js
{
	number: 1
}
```
**Result example 🤩**
```html
<html><body><h1>2</h1></body></html>
```

***********************************************************

### <a name="formatDate"></a> ➡️ formatDate

Format `date` 😲

**Template 👀**
```html
<html><body><h1>{{formatDate date format}}</h1></body></html>
```

Parameters
* `date`:
    * type:
      * `String`
      * `Date`
	* The date to format
* `format`
    * type: `String`
    * The format =>
        * Preset: `"DATE_MED"`
        * Tokens: `"yyyy LLL dd"`,

**Values ✍🏻**
```js
{
	date: '2014-08-06T13:07:04.054',
    format: "DATETIME_FULL_WITH_SECONDS"
}
```
**Result example 🤩**
```html
<html><body><h1>2014 M08 6 13:07:04 GMT-3</h1></body></html>
```

Tables of `presets` and `tokens` ⬇️

**Table of presets** 📋
| **Name**   |      **Description**      |  **Example**  |
|----------|:-------------:|------:|
| `DATE_SHORT` | short date | `10/14/1983` |
| `DATE_MED`| abbreviated date| `Oct 14, 1983` |
| `DATE_FULL` | full date|`October 14, 1983` |
| `DATE_HUGE` | full date with weekday	 |`Tuesday, October 14, 1983` |
| `TIME_SIMPLE	` | time|`1:30 PM` |
| `TIME_WITH_SECONDS` | time with seconds and abbreviated named offset|`1:30:23 PM EDT` |
| `TIME_WITH_LONG_OFFSET` | time with seconds and full named offset |`1:30:23 PM Eastern Daylight Time` |
| `TIME_24_SIMPLE` | 24-hour time|`13:30` |
| `TIME_24_WITH_SECONDS` |24-hour time with seconds|`13:30:23` |
| `TIME_24_WITH_SHORT_OFFSET` | 24-hour time with seconds and abbreviated named offset|`13:30:23 EDT` |
| `TIME_24_WITH_LONG_OFFSET` | 24-hour time with seconds and full named offset|`13:30:23 Eastern Daylight Time` |
| `DATETIME_SHORT` | short date & time|`10/14/1983, 1:30 PM` |
| `DATETIME_MED` | abbreviated date & time|`Oct 14, 1983, 1:30 PM` |
| `DATETIME_FULL` |full date and time with abbreviated named offset|`October 14, 1983, 1:30 PM EDT` |
| `DATETIME_HUGE` |full date and time with weekday and full named offset|`Friday, October 14, 1983, 1:30 PM Eastern Daylight Time` |
| `DATETIME_SHORT_WITH_SECONDS` | short date & time with seconds|`10/14/1983, 1:30:23 PM` |
| `DATETIME_MED_WITH_SECONDS` | abbreviated date & time with seconds|`Oct 14, 1983, 1:30:23 PM` |
| `DATETIME_FULL_WITH_SECONDS` | full date and time with abbreviated named offset with seconds|`October 14, 1983, 1:30:23 PM EDT` |
| `DATETIME_HUGE_WITH_SECONDS` |full date and time with weekday and full named offset with seconds|`Friday, October 14, 1983, 1:30:23 PM Eastern Daylight Time` |

**Table of tokens** 📋

Example: `2014-08-06T13:07:04.054`
| **Name**   |      **Description**      |  **Example**  |
|----------|:-------------:|------:|
| `S` | millisecond, no padding	 | `54` |
| `SSS`| millisecond, padded to 3	| `054` |
| `u`| 	fractional seconds, functionally identical to SSS| `054` |
| `s`|second, no padding| `4` |
| `ss`| second, padded to 2 padding| `04` |
| `m`| minute, no padding| `7` |
| `mm`|	minute, padded to 2| `07` |
| `h`| hour in 12-hour time, no padding| `1` |
| `hh`|hour in 12-hour time, padded to 2| `01` |
| `H`|hour in 24-hour time, no padding| `9` |
| `HH`|hour in 24-hour time, padded to 2| `13` |
| `Z`|narrow offset| `+5` |
| `ZZ`|short offset| `+05:00` |
| `ZZZ`|techie offset| `+0500` |
| `ZZZZ`|abbreviated named offset| `EST` |
| `ZZZZZ`|unabbreviated named offset| `Eastern Standard Time` |
| `z`| IANA zone| `America/New_York` |
| `a`| meridiem| `AM` |
| `d`| day of the month, no padding| `6` |
| `dd`| day of the month, padded to 2| `06` |
| `c`| day of the week, as number from 1-7 (Monday is 1, Sunday is 7)| `3` |
| `ccc`| day of the week, as an abbreviate localized string	| `Wed` |
| `cccc`|day of the week, as an unabbreviated localized string| `Wednesday` |
| `ccccc`|day of the week, as a single localized letter| `W` |
| `L`|month as an unpadded number| `8` |
| `LL`|month as an padded number| `08` |
| `LLL`|month as an abbreviated localized string| `Aug` |
| `LLLL`|month as an unabbreviated localized string| `August` |
| `LLLLL`|month as a single localized letter| `A` |
| `y`|year, unpadded| `14` |
| `yy`|two-digit year| `2014` |
| `yyyy`|four- to six- digit year, pads to 4| `2014` |
| `G`|abbreviated localized era	| `AD` |
| `GG`|unabbreviated localized era| `Anno Domini` |
| `GGGGG`|one-letter localized era| `A` |
| `kk`|ISO week year, unpadded	| `14` |
| `kkkk`|ISO week year, padded to 4| `2014` |
| `W`|ISO week number, unpadded| `32` |
| `WW`|ISO week number, padded to 2| `32` |
| `o`|ordinal (day of year), unpadded| `218` |
| `ooo`|ordinal (day of year), padded to 3| `218` |
| `q`|quarter, no padding| `3` |
| `qq`|quarter, padded to 2	| `03` |
| `D`|localized numeric date| `9/4/2017` |
| `DD`|localized date with abbreviated month| `Aug 6, 2014` |
| `DDD`|localized date with full month| `August 6, 2014` |
| `DDDD`|localized date with full month and weekday| `Wednesday, August 6, 2014` |
| `t`|localized time| `9:07 AM` |
| `tt`|localized time with seconds	| `1:07:04 PM` |
| `ttt`|localized time with seconds and abbreviated offset| `1:07:04 PM EDT` |
| `tttt`|localized time with seconds and full offset| `1:07:04 PM Eastern Daylight Time` |
| `T`|localized 24-hour time| `13:07` |
| `TT`|localized 24-hour time with seconds	| `13:07:04` |
| `TTT`|localized 24-hour time with seconds and abbreviated offset	| `13:07:04 EDT` |
| `TTTT`|localized 24-hour time with seconds and full offset	| `13:07:04 Eastern Daylight Time` |
| `f`|short localized date and time	| `8/6/2014, 1:07 PM` |
| `ff`|less short localized date and time	| `Aug 6, 2014, 1:07 PM` |
| `fff`|verbose localized date and time| `August 6, 2014, 1:07 PM EDT` |
| `ffff`|extra verbose localized date and time| `Wednesday, August 6, 2014, 1:07 PM Eastern Daylight Time` |
| `F`|short localized date and time with seconds| `8/6/2014, 1:07:04 PM` |
| `FF`|less short localized date and time with seconds	| `Aug 6, 2014, 1:07:04 PM` |
| `FFF`|verbose localized date and time with seconds	| `August 6, 2014, 1:07:04 PM EDT` |
| `FFFF`|extra verbose localized date and time with seconds| `Wednesday, August 6, 2014, 1:07:04 PM Eastern Daylight Time` |
| `X`|unix timestamp in seconds		| `1407287224` |
| `x`|unix timestamp in milliseconds	| `	1407287224054` |








***********************************************************

### <a name="regexReplace"></a> ➡️ regexReplace

`Replace` the coincidence passed in the text with a value using `regex` 😲

**Template 👀**
```html
<html><body><h1>{{regexReplace text search flags replace}}}</h1></body></html>
```

Parameters
* `text`:
    * type: `String`
	* The text to analyze
* `search`
    * type: `String`
    * The string to search in the text
* `flags`
    * type: `String`
    * The flag for the regex
* `replace`
    * type: `String`
    * The string to replace in the text

**Values ✍🏻**
```js
{
	text: 'Our application is AWS',
	search: 'AWS',
	flags: 'g',
	replace: 'JANIS'
}
```
**Result example 🤩**
```html
<html><body><h1>Our application is JANIS</h1></body></html>
```

