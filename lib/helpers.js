'use strict';

const showdown = require('showdown');
const Ansi = require('ansi-to-html');
const Handlebars = require('handlebars');
const util = require('util');
const utils = require('./utils');

/**
    *	Get the value of an object's property
    *	@param {object} The object
    *	@param {string} The property's path
    *	@example {{get object path}}
    *   @returns The value of object's property or ""
    */
module.exports.get = (object, path) => {

	const isNOTObject = typeof object !== 'object';
	const objectsParts = path.split('.');
	let valueToReturn = '';

	if(isNOTObject)
		return '';

	objectsParts.forEach((property, index) => {
		const isPropertyToReturn = index + 1 === objectsParts.length;

		if(isPropertyToReturn)
			valueToReturn = object[property];
		else
			object = object[property];
	});

	return valueToReturn;
};

/**
    *	Set the value of an object's property, return an empty string
    *	@param {object} The object
    *	@param {string} The property's path
    *	@param {any} The value to set
    *	@example {{set object path value}}
    */
module.exports.set = (object, path, value) => {

	const isNOTObject = typeof object !== 'object';
	const objectsParts = path.split('.');

	if(isNOTObject)
		return '';

	if(isNOTObject && 'root_modules' in value)
		delete value.root_modules;

	objectsParts.forEach((property, index) => {
		const isPropertyToUpdate = index + 1 === objectsParts.length;

		if(isPropertyToUpdate)
			object[property] = value;
		else
			object = object[property];
	});

	return '';
};

/**
    *	Return an object's property or placeholder
    *	@param {object} The object
    *	@param {string} The object's key
    *	@param {string} The placeholder
    *	@example {{getToggle object key placeholder}}
    *   @returns {string} The object's property or placeholder
    */
module.exports.getToggle = (object, key, placeholder) => (object && key in object ? object[key] : placeholder);

/**
    *	Parse json to object
    *	@param {string} The json to parse
    *	@example {{#json data}} ... {{/json}}
    *   @returns The html replacing the variables inside of block
    */
module.exports.json = function(json, block) {
	try {
		return block.fn(JSON.parse(json));
	} catch(e) {
		return '';
	}
};

/**
    *	Generate attributes with an object as param
    *	@param {object} The attributes
    *	@example {{attributes object}}
    *   @returns The attributes in html
    */
module.exports.attributes = attributes => {

	const reducer = (accumulator, currentAttribute) => {
		accumulator += `${currentAttribute}="${attributes[currentAttribute]}"`;
		return accumulator;
	};

	return new Handlebars.SafeString(Object.keys(attributes).reduce(reducer, ''));
};

/**
    *	Replace the coincidence passed in the text with a value
    *	@param {string} The text to analyze
    *	@param {string} The string to search in the text
    *	@param {string} The string to replace in the text
    *	@example {{replace text search replace}}
    *   @returns The string with the coincidence replaced
    */
module.exports.replace = (text, search, replace) => text.toString().replace(search, replace || '');

/**
    *	Generate string from object
    *	@param {object} The object to parse
    *	@param {boolean} The boolean to format
    *	@example {{stringify object format}}
    *   @returns The object parsed in html
    */
module.exports.stringify = (object, format) => {

	if(typeof format === 'boolean' && format === false)
		return new Handlebars.SafeString(JSON.stringify(object));

	return new Handlebars.SafeString(JSON.stringify(object, ' ', 4));
};

/**
    *	Generate html from a text in markdown
    *	@param {string} The text in markdown
    *	@example {{markdown text}}
    *   @returns The html generate
    */
module.exports.markdown = text => {

	const converter = new showdown.Converter();

	return new Handlebars.SafeString(converter.makeHtml(text.toString()));
};

/**
    *	Generate html from a text in ansi
    *	@param {string} The text in ansi
    *	@example {{ansi text}}
    *   @returns The html generate
    */
module.exports.ansi = text => {

	const convert = new Ansi({
		colors: {
			0: '#2e3436',
			1: '#c10000',
			2: '#439805',
			3: '#c4a000',
			4: '#719fcf',
			5: '#6f506b',
			6: '#2fdfe2',
			7: '#c5c5c5',
			8: '#555',
			9: '#F55',
			10: '#5F5',
			11: '#FF5',
			12: '#55F',
			13: '#F5F',
			14: '#5FF',
			15: '#FFF'
		}
	});

	return new Handlebars.SafeString(convert.toHtml(text));
};

/**
    *   Equal block
    *   Checks if the first argument is equal to the second one
    *   @param {mixed} first - The first value to check
    *   @param {mixed} second - The second value to check
    *   @example {{#eq id 245}}I'm 245!{{/eq}}
    *   @returns If the condition is true return the content inside of block, otherwise return the content inside of block else
    */
module.exports.eq = function(first, second, block) {
	return first === second ? block.fn(this) : block.inverse(this);
};

/**
    *   Not Equal
    *   Checks if the first argument isn't equal to the second one
    *   @param {mixed} first - The first value to check
    *   @param {mixed} second - The second value to check
    *   @example {{#ne id 245}}I'm 245!{{/eq}}
    *   @returns If the condition is true return the content inside of block, otherwise return the content inside of block else
    */
module.exports.ne = function(first, second, block) {
	return first !== second ? block.fn(this) : block.inverse(this);
};
/**
    *   AND block
    *   Checks if all the arguments are truthy
    *   @param {...mixed} args
    *   @example {{#and arg1 arg2 arg2}}All of the arguments are truthy!!!{{/eq}}
    *   @returns If the condition is true return the content inside of block, otherwise return the content inside of block else
    */
module.exports.and = function(...args) {

	const block = args.pop();

	for(const arg of args) {
		if(!arg)
			return block.inverse(this);
	}
	return block.fn(this);
};

/**
    *   OR block
    *   Checks if any of the arguments are truthy
    *   @param {...mixed} args
    *   @example {{#or arg1 arg2 arg2}}Any of the arguments are truthy!!!{{/eq}}
    *   @returns If the condition is true return the content inside of block, otherwise return the content inside of block else
    */
module.exports.or = function(...args) {

	const block = args.pop();

	for(const arg of args) {
		if(arg)
			return block.fn(this);
	}
	return block.inverse(this);
};

/**
    *   IndexOf block
    *   Checks if the value or property is inside of an object or array, or is equal
    *   @param {...mixed} args
    *   @example {{#indexof propertyOrValue container}}Hello!{{/indexof}}
    *   @returns If the condition is true return the content inside of block, otherwise return the content inside of block else
    */
module.exports.indexof = function(propertyOrValue, container, block) {

	if(!container)
		return block.inverse(this);

	propertyOrValue = propertyOrValue.toString();

	if(container instanceof Array)
		return container.map(item => '' + item).find(element => element === propertyOrValue) ? block.fn(this) : block.inverse(this);

	if(typeof container === 'object' && propertyOrValue in container)
		return block.fn(this);

	if(typeof container === 'string' || typeof container === 'number')
		return propertyOrValue === container ? block.fn(this) : block.inverse(this);

	return block.inverse(this);
};

/**
    *   Concat the args passed
    *   @param {...mixed} args
    *   @example {{concat value1 value2 value3}}
    *   @returns string with values concatenated
    */
module.exports.concat = (...args) => {

	const params = args.slice();

	params.pop();

	return params.join('');
};

/**
    *   Convert the string to lowerCase
    *   @param {string} text
    *   @example {{lowercase text}}
    *   @returns The string converted
    */
module.exports.lowercase = value => value.toString().toLowerCase();

/**
    *   Convert the string to uppercase
    *   @param {string} text
    *   @example {{uppercase text}}
    *   @returns The string converted
    */
module.exports.uppercase = value => value.toString().toUpperCase();

module.exports.regexReplace = (text, search, flags, replace) => {

	if(!search)
		return null;

	const regex = new RegExp(search.toString(), flags.toString());

	return text.replace(regex, replace);
};

/**
    *  Strips a host from a URL
    *  @param   {string} url - The URL which host will be removed.
    *  @returns The string striped
    *  @example {{stripHost url}} => /search
    */
module.exports.stripHost = URL => URL.toString().replace(/https?:\/\/.*?\//i, '/');

/**
    *  Camelize a string
    *  @param   {string} text - The string to camelize
    *  @returns The string formatted
    *  @example {{camelize text}}
    */
module.exports.camelize = value => utils.sanitizeString(value.toString(), ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
	return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
})
	.replace(/\s+/g, '');

/**
    *  Sanitize a string
    *  @param   {string} text - The string to sanitize
    *  @returns The string formatted
    *  @example
    */
module.exports.sanitize = (value, replace) => utils.sanitizeString(value, replace);

/**
    *  Modulus block
    *  Checks if the module of a value is equal to result
    *  @param {int} index The value to make the operation
    *  @param {int} mod The modulus value
    *  @param {int} result The modulus result
    *  @returns If the condition is true return the content inside of block, otherwise return the content inside of block else
    *  @example {{#modulus 2 2 0}}True{{/modulus}}
    */
module.exports.modulus = function(index, mod, result, block) {
	if(Number(index) % mod === Number(result))
		return block.fn(this);
	return block.inverse(this);
};

/**
    *  Convert to html as text preformatted from an object
    *  @param {object} args- The object to convert
    *  @returns The html
    *  @example {{debugString object}}
    */
module.exports.debugString = object => new Handlebars.SafeString(`<pre>${JSON.stringify(object, ' ', 4)}</pre>`);

/**
    *  Convert to html as text preformatted from objects or values
    *  @param {...mixed} args- The objects or values to convert
    *  @returns The html
    *  @example {{debug object1 value1}}
    */
module.exports.debug = (...args) => {

	const params = args.slice();

	params.pop();

	let output = '<style>body { position: static!important;}</style>';

	for(const param of params)
		output += `<pre>[${typeof param}] ${typeof param === 'object' ? util.inspect(param, false, null) : param}</pre>`;

	return new Handlebars.SafeString(output);
};

/**
    *  Checks if a number is even or odd
    *  @param   {int} index - The value to be analyzed
    *  @param   {mixed} even - The value return if the index is even
    *  @param   {mixed} odd - The value return if the index is odd
    *  @returns If the condition is true return value even, or the value odd
    *  @example {{even 4 even odd}}
    */
module.exports.even = (index, even, odd) => (Number(index) % 2 ? even : odd);


/**
    *  Greater than block
    *  Checks first argument against the second one.
    *  @param {int} value
    *  @param {int} value2
    *  @returns If the condition is true return the content inside of block, otherwise return the content inside of block else
    *  @example {{#gt 5 2}}True{{/gt}}
    */
module.exports.gt = function(value, value2, block) {
	if(!Number.isNaN(value) && !Number.isNaN(value2) && Number(value) > Number(value2))
		return block.fn(this);
	return block.inverse(this);
};

/**
    *  Greater equal block
    *  Checks first argument against the second one.
    *  @param {int} value
    *  @param {int} value2
    *  @returns If the condition is true return the content inside of block
    *  @example {{#gte 5 2}}True{{/gte}}
    */
module.exports.gte = function(value, value2, block) {
	if(Number(value) >= Number(value2))
		return block.fn(this);
	return block.inverse(this);
};

/**
    *  Lower than block
    *  Checks first argument against the second one.
    *  @param {int} value
    *  @param {int} value2
    *  @returns If the condition is true return the content inside of block
    *  @example {{#lt 1 2}}True{{/lte}}
    */
module.exports.lt = function(value, value2, block) {
	if(Number(value) < Number(value2))
		return block.fn(this);
	return block.inverse(this);
};

/**
    *  Lower equal block
    *  Checks first argument against the second one.
    *  @param {int} value
    *  @param {int} value2
    *  @returns If the condition is true return the content inside of block
    *  @example {{#lte 1 1}}True{{/lt}}
    */
module.exports.lte = function(value, value2, block) {
	if(Number(value) <= Number(value2))
		return block.fn(this);
	return block.inverse(this);
};

/**
    *  For block
    *  For loop
    *  @param {int} from
    *  @param {int} to
    *  @example {{#forLoop 0 10}}{{this}}{{/for}} 0 ... 9
    */
module.exports.forLoop = function(from, to, block) {

	let accumulator = '';

	for(let i = from; i < to; i++)
		accumulator += block.fn(i);

	return accumulator;
};

/**
    *  notIn block
    *  Check if the value doesn't exists in haystack
    *  @param {int} needle - The needle
    *  @param {string} haystack - Comma separated values}
    *  @returns If the condition is true return the content inside of block
    *  @example {{#notIn id "245,272,300"}}I'm not 245, 272, 300{{/notIn}}
    */
module.exports.notIn = function(needle, haystack, block) {

	haystack = haystack.toString().split(',');

	if(typeof needle === 'undefined' || !(~haystack.indexOf(needle.toString())))
		return block.fn(this);

	return block.inverse(this);
};

/**
    *  in block
    *  Check if the needle exists in haystack
    *  @param {int} needle - The needle
    *  @param {string} haystack - Comma separated values
    *  @returns If the condition is true return the content inside of block
    *  @example {{#in id "245,1,300"}} Im {{id}} {{/in}}
    */
module.exports.inHelper = function(needle, haystack, block) {

	haystack = haystack.toString().split(',');

	if(typeof needle === 'undefined' || haystack.find(element => element === needle.toString()))
		return block.fn(this);

	return block.inverse(this);
};

/**
    *
    *  Checks if all the values are false
    *  @param {mixed} args - The values to check
    *  @return {boolean} Return the result of the condition
    *  @example {{false value1 value2}} ==> "true" or "false"
    */
module.exports.falseHelper = (...args) => {
	args.pop();

	const trueValues = args.filter(element => Boolean(element) === true);

	return !trueValues.length;
};

/**
    *
    *  Checks if all the values are true
    *  @param {mixed} args - The values to check
    *  @return {boolean} Return the result of the condition
    *  @example {{true value1 value2}} ==> "true" or "false"
    */
module.exports.trueHelper = (...args) => {
	args.pop();

	const falseValues = args.filter(element => Boolean(element) === false);

	return !falseValues.length;
};

/**
    *	Return the length of the item [array, object, string]
    *   @param value - The parameter to evaluate
    *   @return {boolean} Return the result of the condition
    *   @example {{count array}} ==>  "4"
    */
module.exports.count = value => {
	try {

		if(typeof value === 'object' && !(value instanceof Array))
			value = Object.keys(value);

		return value.length;
	} catch(e) {
		return 0;
	}
};

/**
    *   Checks if the text contains the subString
    *   @param {mixed} first - The first value to check
    *   @param {mixed} second - The second value to check
    *   @returns If the condition is true return the content inside of block
    *   @example {{#hasSubStr text subString}}True{{/hasSubStr}}
    */
module.exports.hasSubStr = function(text, subString, block) {

	console.log(text, subString, block);

	const subStringFound = text.toString().includes(subString);

	if(block.fn)
		return text && subStringFound ? block.fn(this) : block.inverse(this);

	return text && subStringFound;
};

/**
    *   Sum the arguments
    *   @param {...int} args
    *   @returns {int} The sum of the args
    *   @example {{sumArgs arg1 arg2 arg3}}
    */
module.exports.sumArgs = (...args) => {

	args.pop();

	const reducer = (accumulator, currentNumber) => {
		if(!Number.isNaN(currentNumber) && Number.isFinite(currentNumber))
			accumulator += currentNumber;
		return accumulator;
	};

	return args.reduce(reducer, 0);
};


/**
    * Format string with price
    * @param {mixed} number the number or string to be formatted
    * @param {string} thousands the thousands separator => "." or "," ...
    * @param {string} decimals the decimal separator => "." or "," ...
    * @param {mixed} length number of decimals displayed
    * @param {string} currency currency => "$" ...
    * @returns {string} Returns formatted string with price
    * @example {{customFormatPrice number thousands decimals length currency}} ==> "$12.345,123"
    */
module.exports.customFormatPrice = (number, thousands, decimals, length, currency) => {

	const lengthIsZero = length === 0 || length === '0';

	const parsedLength = (length && typeof length === 'number' ? length : null) || (lengthIsZero ? 0 : 2);
	const parsedThousands = thousands || (thousands === '' ? thousands : '.');

	const regExp = '\\d(?=(\\d{' + (3) + '})+' + (parsedLength > 0 ? '\\D' : '$') + ')';
	const newNumber = (number * 1).toFixed(Math.max(0, ~~parsedLength));

	return (currency || '') + newNumber.replace('.', (decimals || ',')).replace(new RegExp(regExp, 'g'), '$&' + parsedThousands);
};


/**
    *   Sum all items of an array
    *   @param {array} array the array to loop
    *   @param {string} key optional argument, key from which to extract numbers to sum, if none, it assumes an array of numbers
    *   @returns {int} The sum of the args
    *   @example {{sumArray arg1 arg2 arg3}}
    */
module.exports.sumArray = (array, key) => {

	const currentArray = key ? array.map(object => object[key]) : array;

	const sumItemsReducer = (accumulator, currentNumber) => {
		if(!Number.isNaN(currentNumber) && Number.isFinite(currentNumber))
			accumulator += currentNumber;
		return accumulator;
	};

	return currentArray.reduce(sumItemsReducer, 0);
};

/**
    *   Validate if number is negative
    *   @param {int} value - the number tu validate
    *   @returns If the condition is true return the content inside of block
    *   @example {{#isNegative -12}}True{{/isNegative}}
    */
module.exports.isNegative = function(number, block) {

	if(!number || Number.isNaN(number))
		return;

	if(!block.fn)
		return Number(number) < 0;

	if(Number(number) < 0)
		return block.fn(this);

	return block.inverse(this);
};

/**
    *   Format a weight value
    *   @param {int} number - the number to format
    *   @param {string} decimal - the decimals separator  ==> "." or "," ...
    *   @param {int} lenght - the length of the decimals
    *   @returns {string} The weight formatted
    *   @example {{formatWeight  number decimal length}} ==> "123,23"
    */
module.exports.formatWeight = (number, decimal, length) => {

	const parseDecimal = !decimal ? '.' : decimal;

	const parsedLength = (length && typeof length === 'number' ? length : null) || (length === 0 || length === '0' ? 0 : 2);

	const newNumber = (number * 1).toFixed(Math.max(0, ~~parsedLength));

	return newNumber.replace('.', parseDecimal);
};

/**
    *   Increment 1 to value
    *   @param {int} index The value to increment
    *   @returns {int} The value incremented
    *   @example {{base1Index  1}} ==> 2
    */
module.exports.base1Index = index => index + 1;

/**
    *   Format date
    *   @param {mixed} date The date to format
    *   @param {int} index The zone => 'en-GB', 'en-US', ...
    *   @param {int} index The dateStyle => full, long, medium, short
    *   @param {int} index The timeStyle => full, long, medium, short
    *   @returns {string} The date formatted
    *   @example {{formatDate date zone dateStyle timeStyle}} ==> "Sep 8, 2021, 12:48:06 AM"
    */
module.exports.formatDate = (date, zone, dateStyle, timeStyle) => {

	const dateParsed = new Date(date);

	return new Intl.DateTimeFormat(zone, { dateStyle, timeStyle }).format(dateParsed);
};
