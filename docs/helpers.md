## 📢 Custom Helpers

<small>[[Go back](/README.md)]</small>

### List of content

* [and](#and)
* [attributes](#attributes)
* [base1Index](#base1Index)
* [camelize](#camelize)
* [count](#count)
* [currency](#currency)
* [debug](#debug)
* [debugString](#debugString)
* [eq](#eq)
* [even](#even)
* [for](#for)
* [formatDate](#formatDate)
* [formatNumber](#formatNumber)
* [get](#get)
* [getToggle](#getToggle)
* [gt](#gt)
* [gte](#gte)
* [hasSubStr](#hasSubStr)
* [in](#in)
* [isNegative](#isNegative)
* [json](#json)
* [lowercase](#lowercase)
* [lt](#lt)
* [lte](#lte)
* [modulus](#modulus)
* [ne](#ne)
* [notIn](#notIn)
* [or](#or)
* [regexReplace](#regexReplace)
* [replace](#replace)
* [sumArgs](#sumArgs)
* [sumArray](#sumArray)
* [uppercase](#uppercase)
* [multiply](#multiply)

### Deprecated helpers

* [concat](#concat)
* [customFormatPrice](#customFormatPrice)
* [formatWeight](#formatWeight)
* [indexof](#indexof)
* [isFalse](#isFalse)
* [isTrue](#isTrue)
* [sanitize](#sanitize)
* [set](#set)
* [stringify](#stringify)
* [stripHost](#stripHost)

---

### `and`

<details>
<summary><b>Block</b>: Checks if all of arguments are `truthy`</summary>

> Returns the template inside of the block if the condition is `truthy`. It accepts an `else` block that will be returned in case at least one argument is `falsy`.

**Parameters**
* `...conditions`:
	* type: `any` - The values to analyze

**:computer: Template**

```handlebars
{{#and condition1 condition2}}
	The quick, brown fox jumps over a lazy dog.
{{/and}}

{{#and condition2 condition3 condition4}}
	Everything is true
{{else}}
	Something is false
{{/and}}

{{#and condition2 condition3 condition4}}
	This will return nothing because condition4 is falsy and no else block has been declared
{{/and}}
```

**:inbox_tray: Values**
```js
{
	condition1: true,
	condition2: "test",
	condition3: 10
	condition4: false
}
```

**:sparkles: Result**
```html
The quick, brown fox jumps over a lazy dog.

Something is false
```

</details>

---

### `attributes`

<details>
<summary><b>Expression</b>: Generate html attributes based on an object</summary>

> Returns HTML-formatted attributes based on an object key-values.

**Parameters**
* `attributesObject`:
	* type: `object` - The object to generate attributes

**:computer: Template**
```handlebars
<h1 {{attributes status}}>I'm a title!</h1>
```

**:inbox_tray: Values**
```js
{
	status: {
		class: "red",
		other: "otherValue"
	}
}
```

**:sparkles: Result**
```html
<h1 class="red" other="otherValue">I'm a title!</h1>
```
</details>

---

### `base1Index`

<details>
<summary><b>Expression</b>: Transform a base-0 number to a base-1 number</summary>

> Returns the number plus one. This helper is useful when looping arrays and printing each element index, but starting from one instead of zero.

**Parameters**
* `number`:
	* type: `number` - The base-0 number

**:computer: Template**
```handlebars
<h1>My friends list</h1>
{{#each friends}}
	<p>{{ base1Index @index}} {{this}}</p>
{{/each}}
```

**:inbox_tray: Values**
```js
{
	friends: ['John', 'Jane']
}
```

**:sparkles: Result**
```html
<h1>My friends list</h1>
<p>1. John</p>
<p>2. Jane</p>
```
</details>

---

### `camelize`

<details>
<summary><b>Expression</b>: Transform a string to camel case</summary>

> Returns the string in camelCase

**Parameters**
* `text`:
	* type: `string` - The text to camelize

**:computer: Template**
```handlebars
<p>{{text}} in camel case is {{camelize text}}</p>
```

**:inbox_tray: Values**
```js
{
	text: 'Some text'
}
```

**:sparkles: Result**
```html
<p>Some text in camel case is someText</p>
```
</details>

---

### `count`

<details>
<summary><b>Expression</b>: Count the elements of an array or length of a text</summary>

> Returns the quantity of elements in an array or the quantity of characters in a string.

**Parameters**
* `target`:
	* type: `array|string` - The text or array to count

**:computer: Template**
```handlebars
<p>{{name}}'s name has {{count name}} characters</p>
<p>{{name}} has {{count friends}} friends</p>
```

**:inbox_tray: Values**
```js
{
	name: 'Goku',
	friends: ['Krillin', 'Kaio-sama']
}
```

**:sparkles: Result**
```html
<p>Goku's name has 4 characters</p>
<p>Goku has 2 friends</p>
```
</details>

---

### `currency`

<details>
<summary><b>Expression</b>: Formats a number as currency</summary>

> Returns the number formatted as a currency with the given parameters.
> This works internally with `Intl.numberFormat`, [see docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat).

**Parameters**
* `number`:
	* type: `number` - The number to format to price

**Options**
* `locale`
	* type: `string` - The locale to use for formatting. This must be a valid locale, including a [Language ISO639 2-digit code](https://es.wikipedia.org/wiki/ISO_639-1) and a [Country ISO3166 2-digit code](https://es.wikipedia.org/wiki/ISO_3166-1) separated by a hypen (`-`). Default is `en-US`
* `currencyCode`
	* type: `string` - The currency ISO 3-digit code. Default is `USD`.
* `currencyDisplay`
	* type: `string` - Whether to show the currency `code` or `symbol`. Default is `symbol`.
	* **Warning**: Depending on the `locale` and `currencyCode`, symbol can be the same as the ISO 3-digit code.

**:computer: Template**
```handlebars
<p>Order total amount is {{currency order.total locale=order.locale currencyCode=order.currency currencyDisplay="symbol"}}</p>
```

**:inbox_tray: Values**
```js
{
	order: {
		currency: 'ARS',
		total: 12345.12345,
		locale: 'es-AR'
	}
}
```

**:sparkles: Result**
```html
<p>Order total amount is $ 12.345,12</p>
```
</details>

---

### `debug`

<details>
<summary><b>Expression</b>: Inspect a value for debugging purposes</summary>

> Returns the value as HTML preformatted text.

**Parameters**
* `value`:
	* type: `any` - The value to debug

**:computer: Template**
```handlebars
{{debug someValue}}
```

**:inbox_tray: Values**
```js
{
	someValue: {
		name: "JanisCommerce"
	}
}
```

**:sparkles: Result**
```html
<style>body { position: static!important;}</style>
<pre>[object] { name: 'JanisCommerce' }</pre>
```
</details>

---

### `debugString`

<details>
<summary><b>Expression</b>: Inspect a value for debugging purposes (JSON)</summary>

> Returns the value as HTML preformatted text as a pretty-printed JSON string.

**Parameters**
* `value`:
	* type: `any` - The value to debug

**:computer: Template**
```handlebars
{{debugString someValue}}
```

**:inbox_tray: Values**
```js
{
	someValue: {
		name: "JanisCommerce"
	}
}
```

**:sparkles: Result**
```html
<pre>{
	"name": "JanisCommerce"
}</pre>
```
</details>

---

### `eq`

<details>
<summary><b>Block</b>: Check if two values are equal</summary>

> Returns the template inside of the block if the condition is both values are equal. It accepts an `else` block that will be returned in case that values are not equal.

**Parameters**
* `firstValue`:
	* type: `any` - The first value to check for equality
* `secondValue`:
	* type: `any` - The first value to check for equality

**:computer: Template**

```handlebars
{{#and name "John"}}
	Yes, the name is John!
{{/and}}

{{#and name "Jane"}}
	Nope, it's not Jane
{{else}}
	It's something else
{{/and}}

{{#and name age}}
	Name and age are definitely not equal
{{/and}}
```

**:inbox_tray: Values**
```js
{
	name: 'John',
	age: 30
}
```

**:sparkles: Result**
```html
Yes, the name is John!

It's something else
```

</details>

---

### `even`

<details>
<summary><b>Expression</b>: Check if a number is even</summary>

> Returns the `evenValue` if `number` is even, or the `oddValue` value otherwise.

**Parameters**
* `number`:
	* type: `number` - The value to check for even/odd
* `evenValue`:
	* type: `any` - The return value in case `number` is even
* `oddValue`:
	* type: `any` - The return value in case `number` is odd

**:computer: Template**

```handlebars
<p>{{firstNumber}} is your {{even number "lucky" "bad-luck"}} number</p>
<p>{{secondNumber}} is your {{even number "lucky" "bad-luck"}} number</p>
```

**:inbox_tray: Values**
```js
{
	firstNumber: 10,
	secondNumber: 11
}
```

**:sparkles: Result**
```html
<p>10 is your lucky number</p>
<p>11 is your bad-luck number</p>

```

</details>

---

### `for`

<details>
<summary><b>Block</b>: Loop through a range of values</summary>

> Loops through a given range and returns the block content for each iteration. The value of `this` is set for each number in the range on each iteration.

**Parameters**
* `from`:
	* type: `number` - The value to start looping from (inclusive)
* `to`:
	* type: `number` - The value to looping until (exclusive)

**:computer: Template**

```handlebars
{{for 1 5}}
	<p>Clap {{this}} times!</p>
{{/for}}
```

**:inbox_tray: Values**
```js
{}
```

**:sparkles: Result**
```html
<p>Clap 1 times!</p>
<p>Clap 2 times!</p>
<p>Clap 3 times!</p>
<p>Clap 4 times!</p>
```

</details>

---

### `formatDate`

<details>
<summary><b>Expression</b>: Format a date in a custom format</summary>

> Returns the `date` formatted in the given `format` (with an optional locale `zone` and `timezone`)

**Parameters**
* `date`:
	* type: `ISODate` - The date to format in ISO8601 format
* `format`:
	* type: `string` - The expected output format. This follows [date-fns format](https://date-fns.org/v2.28.0/docs/format).
* `zone`:
	* type: `string` (optional) The locale to use for formatting
* `timezone`:
	* type: `string` (optional) The timezone to use for formatting

`zone` and `timezone` positions are autodetected and can be set in any order (after `date` and `format`).

**:computer: Template**

```handlebars
{{formatDate date format timezone}}
```

**:inbox_tray: Values**
```js
{
	date: '2023-03-21T13:07:04.054Z',
	format: "PPPPpppp",
	timezone: 'America/Argentina/Buenos_Aires'
}
```

**:sparkles: Result**
```html
<p>Tuesday, March 21st, 2023 at 10:07:04 AM GMT-03:00</p>
```

</details>

---

### `formatNumber`

<details>
<summary><b>Expression</b>: Format a number to be human readable</summary>

> Returns the `number` formatted by the given options.
> This works internally with `Intl.numberFormat`, [see docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat).
>
> If you want to format a number as currecy, use the [`currency`](#currency) helper instead.

**Parameters**
* `number`:
	* type: `number` - The number to format

**Options**
* `locale`
	* type: `string` - The locale to use for formatting. This must be a valid locale, including a [Language ISO639 2-digit code](https://es.wikipedia.org/wiki/ISO_639-1) and a [Country ISO3166 2-digit code](https://es.wikipedia.org/wiki/ISO_3166-1) separated by a hypen (`-`). Default is `en-US`
* `style`
	* type: `string` - The kind of number you want to format. Options are `decimal`, `percent` and `unit`. Default is `decimal`.
* `minimumFractionDigits`
	* type: `number` - The minimum of decimal places to show.
* `maximumFractionDigits`
	* type: `number` - The maximum of decimal places to show.
* `unit`
	* type: `string` - The unit to use to format. This only applies if `style` is set to `unit`. See [valid units](https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier) for available options. Default is `kilogram`.
	* **Important**: This does not perform any unit convertion. It just shows the unit along with the formatted number.
* `unitDisplay`
	* type: `string` - The unit display format. This only applies if `style` is set to `unit`. Options are `long`, `short` and `narrow`. Default is `short`.

**:computer: Template**

```handlebars
<h3>Packages:</h3>
<ul>
	{{#foreach packages}}
		<li>Package {{barcode}}: {{formatNumber weight locale="es-AR" style="unit" unit="kilograms" unitDisplay="narrow" maximumFractionDigits=3}}</li>
	{{/foreach}}
</ul>
```

**:inbox_tray: Values**
```js
{
	packages: [{
		barcode: '123456',
		weight: 1234.12
	}, {
		barcode: '789101',
		weight: 23.1244
	}]
}
```

**:sparkles: Result**
```html
<h3>Packages:</h3>
<ul>
	<li>Package 123456: 1.234,12kg</li>
	<li>Package 789101: 23,124kg</li>
</ul>
```

</details>

---

### `get`

<details>
<summary><b>Expression</b>: Get an object property by a dynamic key</summary>

> Returns the value of the object's key if present, or an empty string otherwise.

**Parameters**
* `object`:
	* type: `object` - An object containing the data
* `path`:
	* type: `string` - The path to the value contained in the `object`. It allows using paths to find the value, for example: `someProp.anInnerProp`.

**:computer: Template**

```handlebars
<p>The address is in {{get countryNames address.countryCode}}</p>
```

**:inbox_tray: Values**
```js
{
	countryNames: {
		AR: 'Argentina',
		BR: 'Brazil'
	},
	address: {
		countryCode: 'AR'
	}
}
```

**:sparkles: Result**
```html
<p>The address is in Argentina</p>
```

</details>

---

### `getToggle`

<details>
<summary><b>Expression</b>: Get an object property by a dynamic key with a default value</summary>

> Returns the value of the object's key if present, or the default value otherwise.

**Parameters**
* `object`:
	* type: `object` - An object containing the data
* `property`:
	* type: `string` - The path to the value contained in the `object`. It does not allow using paths to find the value.
* `defaultValue`:
	* type: `string` - The value that should be returned if `property` does not exist in `object`.

**:computer: Template**

```handlebars
<p>The address is in {{get countryNames address.countryCode}}</p>
<p>The billing address is in {{getToggle countryNames billingAddress.countryCode billingAddress.countryCode}}</p>
```

**:inbox_tray: Values**
```js
{
	countryNames: {
		AR: 'Argentina',
		BR: 'Brazil'
	},
	address: {
		countryCode: 'AR'
	},
	billingAddress: {
		countryCode: 'UY'
	}
}
```

**:sparkles: Result**
```html
<p>The address is in Argentina</p>
<p>The billing address is in UY</p>
```

</details>

---

### `gt`

<details>
<summary><b>Block</b>: Check if a number is greater than other</summary>

> Returns the template inside of the block if the first number is greater than the second one. It accepts an `else` block that will be returned otherwise.

**Parameters**
* `first`:
	* type: `number` - The first number to compare
* `second`:
	* type: `number` - The second number to compare

**:computer: Template**

```handlebars
{{#gt customer.age ageLimit}}
	<p>Welcome to Beer Incorporated.</p>
{{else}}
	<p>You must be over {{ageLimit}} years-old to access this site.</p>
{{/gt}}
```

**:inbox_tray: Values**
```js
{
	customer: {
		age: 20
	},
	ageLimit: 18
}
```

**:sparkles: Result**
```html
<p>Welcome to Beer Incorporated.</p>
```

</details>

---

### `gte`

<details>
<summary><b>Block</b>: Check if a number is greater than or equal to other</summary>

> Returns the template inside of the block if the first number is greater than or equal to the second one. It accepts an `else` block that will be returned otherwise.

**Parameters**
* `first`:
	* type: `number` - The first number to compare
* `second`:
	* type: `number` - The second number to compare

**:computer: Template**

```handlebars
{{#gte customer.age ageLimit}}
	<p>Welcome to Beer Incorporated.</p>
{{else}}
	<p>You must be at least {{ageLimit}} years-old to access this site.</p>
{{/gt}}
```

**:inbox_tray: Values**
```js
{
	customer: {
		age: 20
	},
	ageLimit: 18
}
```

**:sparkles: Result**
```html
<p>Welcome to Beer Incorporated.</p>
```

</details>

---

### `hasSubStr`

<details>
<summary><b>Expression/Block</b>: Checks if a string is contained in another string</summary>

> When used as a block, it works as a if/else block. When used as an expression it returns `true` if the substring is contained in the text, or `false` otherwise.

**Parameters**
* `text`:
	* type: `string` - The string to search into.
* `subStr`:
	* type: `string` - The string to search for

**:computer: Template**

```handlebars
<!-- As expression -->
{{#if (hasSubStr name 'a')}}
	<p>Your name contains the letter a.</p>
{{/if}}

<!-- As block -->
{{#hasSubStr name 'a'}}
	<p>Your name contains the letter a.</p>
{{/hasSubStr}}
```

**:inbox_tray: Values**
```js
{
	name: 'Mathew'
}
```

**:sparkles: Result**
```html
<p>Your name contains the letter a.</p>
```

</details>

---

### `in`

<details>
<summary><b>Block</b>: Checks if a value is contained in an array or comma-separated string</summary>

> Returns the template inside of the block if the searchValue is contained in the array or comma-separated values. It accepts an `else` block that will be returned otherwise.

**Parameters**
* `searchValue`:
	* type: `string` - The value to search for. This will be parsed as a string before searching.
* `array`:
	* type: `string|string[]` - The array or comma-separated string to search into.

**:computer: Template**

```handlebars
{{#in username existingUsernames}}
	<p>Your username already exists.</p>
{{/in}}
```

**:inbox_tray: Values**
```js
{
	username: 'admin',
	existingUsernames: ['root', 'admin', 'guest']
}
```

or

```js
{
	username: 'admin',
	existingUsernames: 'root,admin,guest'
}
```

**:sparkles: Result**
```html
<p>Your username already exists.</p>
```

</details>

---

### `isNegative`

<details>
<summary><b>Expression/Block</b>: Checks if a number is negative</summary>

> When used as a block, it works as a if/else block. When used as an expression it returns `true` if the number is negative, or `false` otherwise.

**Parameters**
* `number`:
	* type: `number` - The value to check.

**:computer: Template**

```handlebars
<p{{#isNegative balance}} class="inDebt"{{/isNegative}}>Your balance is {{currency balance}}.</p>
```

**:inbox_tray: Values**
```js
{
	balance: -150
}
```

**:sparkles: Result**
```html
<p class="inDebt">Your balance is -$150.</p>
```

</details>

---

### `json`

<details>
<summary><b>Block</b>: Parse a JSON string</summary>

> Returns the content of the block using a parsed JSON string as the block context.

**Parameters**
* `json`:
	* type: `string` - A JSON string

**:computer: Template**

```handlebars
{{#json customerData}}
	<p>Customer: {{customer.name}}</p>
{{/json}}
```

**:inbox_tray: Values**
```js
{
	customerData: '{"customer":{"name":"Mark Thompson"}}'
}
```

**:sparkles: Result**
```html
<p>Customer: Mark Thompson</p>
```

</details>

---

### `lowercase`

<details>
<summary><b>Expression</b>: Format a string as lowercase</summary>

> Returns the `text` formatted in lowercase letters

**Parameters**
* `text`:
	* type: `string` - The text to format

**:computer: Template**

```handlebars
<p>{{name}} in lowercase is {{lowercase name}}</p>
```

**:inbox_tray: Values**
```js
{
	name: 'John Doe'
}
```

**:sparkles: Result**
```html
<p>John Doe in lowercase is john doe</p>
```

</details>

---

### `lt`

<details>
<summary><b>Block</b>: Check if a number is lesser than other</summary>

> Returns the template inside of the block if the first number is lesser than the second one. It accepts an `else` block that will be returned otherwise.

**Parameters**
* `first`:
	* type: `number` - The first number to compare
* `second`:
	* type: `number` - The second number to compare

**:computer: Template**

```handlebars
{{#lt customer.age ageLimit}}
	<p>You must be at least {{ageLimit}} years-old to access this site.</p>
{{else}}
	<p>Welcome to Beer Incorporated.</p>
{{/lt}}
```

**:inbox_tray: Values**
```js
{
	customer: {
		age: 20
	},
	ageLimit: 18
}
```

**:sparkles: Result**
```html
<p>Welcome to Beer Incorporated.</p>
```

</details>

---

### `lte`

<details>
<summary><b>Block</b>: Check if a number is lesser than or equal to other</summary>

> Returns the template inside of the block if the first number is lesser than or equal to the second one. It accepts an `else` block that will be returned otherwise.

**Parameters**
* `first`:
	* type: `number` - The first number to compare
* `second`:
	* type: `number` - The second number to compare

**:computer: Template**

```handlebars
{{#lte customer.age ageLimit}}
	<p>You must be over {{ageLimit}} years-old to access this site.</p>
{{else}}
	<p>Welcome to Beer Incorporated.</p>
{{/lte}}
```

**:inbox_tray: Values**
```js
{
	customer: {
		age: 20
	},
	ageLimit: 18
}
```

**:sparkles: Result**
```html
<p>Welcome to Beer Incorporated.</p>
```

</details>

---

### `modulus`

<details>
<summary><b>Block</b>: Check the modulus of a number</summary>

> Returns the template inside of the block if the number modulus is the expected one. It accepts an `else` block that will be returned otherwise.

**Parameters**
* `dividend`:
	* type: `number` - The dividend of the modulus operation
* `divisor`:
	* type: `number` - The divisor of the modulus operation
* `result`:
	* type: `number` - The expected result of the operation

**:computer: Template**

```handlebars
{{#foreach people}}
	<div class="row {{#modulus @index 2 0}}even{{else}}odd{{/modulus}}">
		{{name}}
	</div>
{{/foreach}}
```

**:inbox_tray: Values**
```js
{
	people: [
		'John Doe',
		'Jane Doe'
	]
}
```

**:sparkles: Result**
```html
<div class="row even">
	John Doe
</div>
<div class="row odd">
	Jane Doe
</div>
```

</details>

---

### `ne`

<details>
<summary><b>Block</b>: Check if two values are not equal</summary>

> Returns the template inside of the block if the values are different. It accepts an `else` block that will be returned otherwise.

**Parameters**
* `first`:
	* type: `any` - The first value to compare
* `second`:
	* type: `any` - The second value to compare

**:computer: Template**

```handlebars
{{#ne picture1 picture2}}
	<p>Pictures are different</p>
{{else}}
	<p>They are the same picture</p>
{{/ne}}
```

**:inbox_tray: Values**
```js
{
	picture1: 'A building',
	picture2: 'A building'
}
```

**:sparkles: Result**
```html
<p>They are the same picture</p>
```

</details>

---

### `not`

<details>
<summary><b>Block</b>: Checks if a value is not contained in an array or comma-separated string</summary>

> Returns the template inside of the block if the searchValue is not contained in the array or comma-separated values. It accepts an `else` block that will be returned otherwise.

**Parameters**
* `searchValue`:
	* type: `string` - The value to search for. This will be parsed as a string before searching.
* `array`:
	* type: `string|string[]` - The array or comma-separated string to search into.

**:computer: Template**

```handlebars
{{#notIn username existingUsernames}}
	<p>Your username is available.</p>
{{/notIn}}
```

**:inbox_tray: Values**
```js
{
	username: 'admin',
	existingUsernames: ['root', 'admin', 'guest']
}
```

or

```js
{
	username: 'admin',
	existingUsernames: 'root,admin,guest'
}
```

**:sparkles: Result**
```html
<p>Your username is available.</p>
```

</details>

---

### `or`

<details>
<summary><b>Block</b>: Checks if at least one value is truthy</summary>

> Returns the template inside of the block if at least one of the values passed is truthy. It accepts an `else` block that will be returned otherwise.

**Parameters**
* `...conditions`:
	* type: `any` - The values to analyze

**:computer: Template**

```handlebars
{{#or condition1 condition4}}
	The quick, brown fox jumps over a lazy dog.
{{/or}}

{{#or condition2 condition3 condition4}}
	Something is true
{{else}}
	Everything is false
{{/or}}

{{#or condition4 condition5}}
	This will return nothing because condition4 and condition5 are falsy and no else block has been declared
{{/or}}
```

**:inbox_tray: Values**
```js
{
	condition1: true,
	condition2: "test",
	condition3: 10
	condition4: false,
	condition4: null
}
```

**:sparkles: Result**
```html
The quick, brown fox jumps over a lazy dog.

Something is true
```

</details>

---

### `regexReplace`

<details>
<summary><b>Expression</b>: Replaces a string using a regexp</summary>

> Returns the new string after replacing a string with the regexp.

**Parameters**
* `text`:
	* type: `string` - The original string
* `search`:
	* type: `string` - The regexp to execute
* `flags`:
	* type: `string` - The regexp flags
* `replace`:
	* type: `string` - The text used to replace the regexp match

**:computer: Template**

```handlebars
<p>{{regexReplace title 'NAME' 'g' user.name}}</p>
```

**:inbox_tray: Values**
```js
{
	title: 'Hello, NAME!',
	user: {
		name: 'John'
	}
}
```

**:sparkles: Result**
```html
<p>Welcome, John!</p>
```

</details>

---

### `replace`

<details>
<summary><b>Expression</b>: Replaces a string with another</summary>

> Returns the new string after replacing a string with another string.

**Parameters**
* `text`:
	* type: `string` - The original string
* `search`:
	* type: `string` - The text to replace
* `replace`:
	* type: `string` - The text used to replace the search string

**:computer: Template**

```handlebars
<p>{{replace title 'NAME' user.name}}</p>
```

**:inbox_tray: Values**
```js
{
	title: 'Hello, NAME!',
	user: {
		name: 'John'
	}
}
```

**:sparkles: Result**
```html
<p>Welcome, John!</p>
```

</details>

---

### `sumArgs`

<details>
<summary><b>Expression</b>: Sum arguments</summary>

> Returns the sum of all the given arguments

**Parameters**
* `...args`:
	* type: `number` - The numbers to sum

**:computer: Template**

```handlebars
<p>{{sum shippingCost itemsCost taxes}}</p>
```

**:inbox_tray: Values**
```js
{
	shippingCost: 10,
	itemsCost: 230,
	taxes: 15
}
```

**:sparkles: Result**
```html
<p>255</p>
```

</details>

---

### `sumArray`

<details>
<summary><b>Expression</b>: Sum all the elements of an array</summary>

> Returns the sum of all the elements of an array

**Parameters**

- `array`:
  - type: `array` - The array that contains the elements to sum
- `key`:
  - type: `string` - The property that contains the number to sum in case the array contains object. It can passed as a property of the data or as string. If not set, an array of number will be assumed.

**First case**

**:computer: Template**

```handlebars
<p>{{sumArray items key}}</p>
```

**:inbox_tray: Values**

```js
{
  items: [
    {
      name: 'Carrot',
      price: 10,
    },
    {
      name: 'Lettuce',
      price: 15,
    },
  ],
	key: 'price'
}
```

**:sparkles: Result**

```html
<p>25</p>
```

**Second case**

**:computer: Template**

```handlebars
<p>{{sumArray items 'price'}}</p>
```

**:inbox_tray: Values**

```js
{
  items: [
    {
      name: 'Carrot',
      price: 20,
    },
    {
      name: 'Lettuce',
      price: 30,
    },
  ];
}
```

**:sparkles: Result**

```html
<p>50</p>
```

</details>

---

### `uppercase`

<details>
<summary><b>Expression</b>: Format a string as uppercase</summary>

> Returns the `text` formatted in uppercase letters

**Parameters**
* `text`:
	* type: `string` - The text to format

**:computer: Template**

```handlebars
<p>{{name}} in uppercase is {{uppercase name}}</p>
```

**:inbox_tray: Values**
```js
{
	name: 'John Doe'
}
```

**:sparkles: Result**
```html
<p>John Doe in uppercase is JOHN DOE</p>
```

</details>

---

### `multiply`

<details>
<summary><b>Expression</b>: Multiply two values</summary>

> Return the multiplication of two values

**Parameters**
* `value1`:
	* type: `number` - The first number to multiply
* `value2`:
	* type: `number` - The second number to multiply.
* `decimals`:
	* type: `number` - The number of decimals to round to (default is 2).

**:computer: Template**

```handlebars
<p>{{multiply purchasedQuantity sellingUnitMultiplier decimals}}</p>
```

**:inbox_tray: Values**
```js
{
	purchasedQuantity: 6,
	sellingUnitMultiplier: 1.5
}
```

**:sparkles: Result**
```html
<p>9</p>
```

**:inbox_tray: Values**
```js
{
	purchasedQuantity: 7,
	sellingUnitMultiplier: 3.45678,
	decimals: 4
}
```

**:sparkles: Result**
```html
<p>24.1974</p>
```

</details>

### `shortLink`

<details>
<summary><b>Expression</b>: Formatted a link for a provided URL</summary>

> Return the link with this format #SHORTLINK[link].
> If the link is not a valid URL, return an empty string

**Parameters**
* `value`:
	* type: `string` - The URL to be used for creating the formatted link

**:computer: Template**

```handlebars
<p>{{shortLink url}}</p>
```

**:inbox_tray: Values**
```js
{
	url: 'https://janis.im'
}
```

**:sparkles: Result**
```html
<p>#SHORTLINK[https://janis.im]</p>
```

**:inbox_tray: Values**
```js
{
	url: 'janis.im'
}
```

**:sparkles: Result**
```html
<p></p>
```

**:computer: Template**

```handlebars
<p>{{shortLink "https://janis.im"}}</p>
```

**:sparkles: Result**
```html
<p>#SHORTLINK[https://janis.im]</p>
```

</details>



## :x: Deprecated helpers

### `concat`

<details>
<summary><b>Expression</b>: Concatenate two or more strings</summary>

> Returns the given arguments concatenated

**Parameters**
* `...args`:
	* type: `any` - The texts to concatenate

**:computer: Template**
```handlebars
<p>{{camelize text}}</p>
```

**:inbox_tray: Values**
```js
{
	text: 'Some text'
}
```

**:sparkles: Result**
```html
<p>someText</p>
```

**:new: Migration**
```html
<h1>Stop doing this</h1>
<p>{{concat value1 value2 value3}}</p>

<h1>Do this instead</h1>
<p>{{value1}}{{value2}}{{value3}}
```
</details>

### `customFormatPrice`

<details>
<summary><b>Expression</b>: Format a number as a price</summary>

> Returns the number formatted as currency in a custom format

**Parameters**
* `number`:
	* type: `number` - The number to format to price
* `thousands`
	* type: `string` - The thousands separator => "." or "," ...
* `decimals`
	* type: `string` - The decimal separator => "." or "," ...
* `length`
	* type: `number` - The number of decimals displayed
* `currency`
	* type: `string` - The price's currency

**:computer: Template**
```handlebars
<p>{{customFormatPrice number thousands decimals length currency}}</p>
```

**:inbox_tray: Values**
```js
{
	number: 12345.12345,
	thousands: '.',
	decimals: ',',
	length: 3,
	currency: '$'
}
```

**:sparkles: Result**
```html
<p>$12.345,123</p>
```

**:new: Migration**
Use `currency` helper instead

</details>

### `formatWeight`

<details>
<summary><b>Expression</b>: `Format` a weight value</summary>

> Returns a number that represents a weight formatted in a custom format.

**Parameters**
* `weight`:
	* type: `number` - The weight to format
* `decimal`
	* type: `string` - The decimal separator => "." or "," ...
* `length`
	* type: `number` - The number of decimals displayed

**:computer: Template**
```handlebars
<p>{{formatWeight number decimal length}}</p>
```

**:inbox_tray: Values**
```js
{
	number: 120.456,
	decimal: ',',
	length: 2
}
```

**:sparkles: Result**
```html
<p>120,45</p>
```

**:new: Migration**
Use `formatNumber` helper instead.

</details>

### `indexOf`

<details>
<summary><b>Block</b>: Checks if a value is an element of an array or a property of an object</summary>

> Returns the template inside of the block if the value is an element of the array or a property of the object. It accepts an `else` block that will be returned otherwise.

**Parameters**
* `needle`:
	* type: `string|number|boolean` - The value to search
* `container`
	* type: `object|array` - The object or array to search into

**:computer: Template**
```handlebars
<p>{{#indexOf 'foo' object}}Content{{/indexOf}}</p>
<p>{{#indexOf 'foo' array}}Content{{/indexOf}}</p>
```

**:inbox_tray: Values**
```js
{
	object: {
		foo: 'bar'
	},
	array: ['foo', 'baz']
}
```

**:sparkles: Result**
```html
<p>Content</p>
<p>Content</p>
```

**:new: Migration**
To search in arrays, use the `in` helper instead. To check on object properties, use the `if` and `get` helpers together.

For example:

```html
<p>{{#if (get object 'foo')}}Content{{/if}}</p>
<p>{{#in 'foo' array}}Content{{/in}}</p>
```

</details>

### `isFalse`

<details>
<summary><b>Block</b>: Checks if one or more values are all falsy</summary>

> Returns `true` if they are all falsy, or `false` otherwise.

**Parameters**
* `...args`:
	* type: `any` - The values to check

**:computer: Template**
```handlebars
<p>{{isFalse nullValue falseValue zeroValue emptyStringValue undefinedValue}}</p>
```

**:inbox_tray: Values**
```js
{
	nullValue: null,
	falseValue: false,
	zeroValue: 0,
	emptyStringValue: ''
}
```

**:sparkles: Result**
```html
<p>true</p>
```

**:new: Migration**
Use the `and` helper with the `not` helper instead.

</details>

### `isTrue`

<details>
<summary><b>Block</b>: Checks if one or more values are all truthy</summary>

> Returns `true` if they are all truthy, or `false` otherwise.

**Parameters**
* `...args`:
	* type: `any` - The values to check

**:computer: Template**
```handlebars
<p>{{isTrue trueValue nonZeroValue nonEmptyStringValue}}</p>
```

**:inbox_tray: Values**
```js
{
	trueValue: true,
	nonEonZeroValue: 100,
	emptyStringValue: 'hi'
}
```

**:sparkles: Result**
```html
<p>true</p>
```

**:new: Migration**
Use the `and` helper instead.

</details>

### `sanitize`

<details>
<summary><b>Expression</b>: Sanitize a string</summary>

> Returns the sanitized string

**Parameters**
* `text`:
	* type: `string` - The text to sanitize

**:computer: Template**
```handlebars
<p>{{sanitize text}}</p>
```

**:inbox_tray: Values**
```js
{
	text: "ThE-example-to-saNITIZE !"
}
```

**:sparkles: Result**
```html
<p>theexampletosanitize</p>
```

**:new: Migration**
Not available any more.

</details>

### `set`

<details>
<summary><b>Expression</b>: Set a property of an object</summary>

> Returns an empty string

**Parameters**
* `object`:
	* type: `object` - The object which property wants to be set
* `path`:
	* type: `string` - The path of the property to be set
* `value`:
	* type: `any` - The value to be set

**:computer: Template**
```handlebars
<p>{{set object 'foo.bar' value}}</p>
```

**:inbox_tray: Values**
```js
{
	object: {
		id: 1
	},
	value: 'test'
}
```

**:sparkles: Result**
```html
<!-- object.foo.bar will be set to 'test' -->
```

**:new: Migration**
Not available any more.

</details>

### `stringify`

<details>
<summary><b>Expression</b>: Stringify a value</summary>

> Returns a string version of the value

**Parameters**
* `value`:
	* type: `any` - The value to stringify
* `format`:
	* type: `boolean` - Whether or not to format the JSON to be human readable. Default is `false`

**:computer: Template**
```handlebars
<p>{{stringify object}}</p>
```

**:inbox_tray: Values**
```js
{
	object: {
		id: 1
	}
}
```

**:sparkles: Result**
```html
{"id":1}
```

**:new: Migration**
Use the `json` helper instead.

</details>

### `stripHost`

<details>
<summary><b>Expression</b>: Removes the host of an URL</summary>

> Returns the URL without the host.

**Parameters**
* `url`:
	* type: `string` - The URL to remove the host from.

**:computer: Template**
```handlebars
<p>{{stripHost url}}</p>
```

**:inbox_tray: Values**
```js
{
	url: 'https://app.janis.in/oms/order/browse'
}
```

**:sparkles: Result**
```html
<p>oms/order/browse</p>
```

**:new: Migration**
Not available any more.

</details>
