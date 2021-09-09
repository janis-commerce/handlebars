# Handlebars

[![Build Status](https://github.com/janis-commerce/handlebars/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/handlebars/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/handlebars?branch=master)
[![npm version](https://badge.fury.io/js/handlebars.svg)](https://www.npmjs.com/package/handlebars)

For manage Handlebars with custom helpers

## Installation
```sh
npm install @janiscommerce/handlebars
```

## API

## Usage
```js
const Handlebars = require('@janiscommerce/handlebars');
```

## Examples
```js
const template = '<html><body><h1>Example</h1></body></html>';

const templateCompiled = Handlebars.compile(template, 'strict');

const values = {
    ...
}

templateCompiled(values)
```
**
## Helpers

Take me to [gt](#gt)

### ➡️ lowercase
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
### ➡️ uppercase
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
### ➡️ ansi
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
### ➡️ markdown
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
### ➡️ stringify
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
### ➡️ eq
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************
### ➡️ ne
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### ➡️ replace
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
### ➡️ or
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************
### ➡️ and
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************
### ➡️ indexof
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### ➡️ concat
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

### ➡️ stripHost
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

### ➡️ camelize
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

### ➡️ sanitize
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
### ➡️ modulus
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### ➡️ set
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

### ➡️ get
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

### ➡️ json
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

### ➡️ attributes

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
### ➡️ getToggle 
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

### ➡️ debugString

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

### ➡️ debug

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

### ➡️ even

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
### ➡️ for
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

### ➡️ sumArgs

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

### ➡️ formatWeight

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

### ➡️ gte
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### ➡️ lt
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### ➡️ lte
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### ➡️ notIn
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`

***********************************************************

### ➡️ in
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

🔍 Also, if we don't write `else` and the condition is `false`, returns an `empty string`