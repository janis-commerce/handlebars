'use strict';

const assert = require('assert');
const zones = require('date-fns/locale');
const { format: fnsFormat, utcToZonedTime } = require('date-fns-tz');
const {
	Handlebars
} = require('../lib');

describe('Handlebars Helpers', () => {

	context('When must render using regexReplace helper', () => {

		const template = '<html><body><h1>{{regexReplace text search flags replace}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the value replaced with regex in html', () => {

			const value = {
				text: 'Regular expressions are patterns used to match character combinations in strings.',
				search: 'are',
				flags: 'g',
				replace: 'were'
			};

			assert.strictEqual(
				templateCompiled(value),
				'<html><body><h1>Regular expressions were patterns used to match character combinations in strings.</h1></body></html>');
		});

		it('Should return an empty string if the search param is not passed', () => {

			const value = {
				text: 'Regular expressions are patterns used to match character combinations in strings.',
				search: '',
				flags: 'g',
				replace: 'were'
			};

			assert.strictEqual(
				templateCompiled(value),
				'<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using formatDate helper without zone/timeZone', () => {

		const template = '<html><body><h1>{{formatDate date format}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the date formatted in html when passed a format', () => {

			const value = {
				date: '2021/3/8',
				format: 'PPPPpppp'
			};

			const newDate = new Date(value.date);

			const format = () => fnsFormat(newDate, value.format, {});

			assert.strictEqual(templateCompiled(value), `<html><body><h1>${format()}</h1></body></html>`);
		});
	});

	context('When must render using formatDate helper with zone', () => {

		const template = '<html><body><h1>{{formatDate date format zone}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the date formatted in html when passed format and zone', () => {

			const value = {
				date: '3/8/2001',
				format: 'PPPPpppp',
				zone: 'enAU'
			};

			const newDate = new Date(value.date);

			const format = () => fnsFormat(newDate, value.format, {
				locale: zones[value.zone]
			});

			assert.strictEqual(templateCompiled(value), `<html><body><h1>${format()}</h1></body></html>`);
		});
	});

	context('When must render using formatDate helper with timeZone', () => {

		const template = '<html><body><h1>{{formatDate date format timeZone}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the date formatted in html when passed format and timeZone', () => {

			const value = {
				date: '3/8/2001',
				format: 'PPPppp',
				timeZone: 'America/New_York'
			};

			let newDate = new Date(value.date);
			newDate = utcToZonedTime(newDate, value.timeZone);

			const format = () => fnsFormat(newDate, value.format, {
				timeZone: value.timeZone
			});

			assert.strictEqual(templateCompiled(value), `<html><body><h1>${format()}</h1></body></html>`);
		});
	});

	context('When must render using formatDate helper without a valid date', () => {

		const template = '<html><body><h1>{{formatDate date format timeZone}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the date formatted in html when passed format and zone', () => {

			const value = {
				date: undefined,
				format: 'PPPPpppp',
				zone: 'enAU'
			};

			const newDate = new Date(value.date);

			const format = () => {
				try {
					return fnsFormat(newDate, value.format, {
						locale: zones[value.zone]
					});
				} catch(e) {
					return e.message;
				}
			};

			assert.strictEqual(templateCompiled(value), `<html><body><h1>${format()}</h1></body></html>`);
		});
	});

	context('When must render using formatDate helper with zone and timeZone', () => {

		const template = '<html><body><h1>{{formatDate date format zone timeZone}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the date formatted in html when passed format, zone and timeZone', () => {

			const value = {
				date: '3/8/2001',
				format: 'PPPPpppp',
				zone: 'enAU',
				timeZone: 'America/New_York'
			};

			let newDate = new Date(value.date);
			newDate = utcToZonedTime(newDate, value.timeZone);

			const format = () => fnsFormat(newDate, value.format, {
				locale: zones[value.zone],
				timeZone: value.timeZone
			});

			assert.strictEqual(templateCompiled(value), `<html><body><h1>${format()}</h1></body></html>`);
		});
	});

	context('When must render using base1Index helper', () => {

		const template = '<html><body><h1>{{base1Index value}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the value incremented in html', () => {

			const value = {
				value: 1
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>2</h1></body></html>');
		});
	});

	context('When must render using isNegative as block helper', () => {

		const template = '<html><body><h1>{{#isNegative value}}Hello!{{/isNegative}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return true in html if the conditional its true', () => {

			const value = {
				value: -12
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Hello!</h1></body></html>');
		});

		it('Should return an empty string if condition is false', () => {

			const value = {
				value: 12
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using isNegative helper', () => {

		const template = '<html><body><h1>{{isNegative value}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return true in html if the conditional its true', () => {

			const value = {
				value: -12
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>true</h1></body></html>');
		});

		it('Should return false in html if the conditional its not true', () => {

			const value = {
				value: 12
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>false</h1></body></html>');
		});

		it('Should return an empty string if the value is invalid', () => {

			const value = {
				value: 0 / 0
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using sumArray helper', () => {

		const template = '<html><body><h1>{{sumArray array key}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the sum of all numbers in the array in html', () => {

			const value = {
				array: [1, 12, 2, 4],
				key: false
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>19</h1></body></html>');
		});

		it('Should return the sum of all numbers in the array in html with key', () => {

			const value = {
				array: [
					{ number: 1 },
					{ number: 2 },
					{ number: 3 }
				],
				key: 'number'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>6</h1></body></html>');
		});

		it('Should return the sum of all numbers without invalids values in the array in html with key', () => {

			const value = {
				array: [
					{ number: 1 },
					{ number: 0 / 0 },
					{ number: 3 }
				],
				key: 'number'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>4</h1></body></html>');
		});
	});

	context('When must render using customFormatPrice helper', () => {

		const template = '<html><body><h1>{{customFormatPrice number thousands decimals length currency}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the price formatted in html', () => {

			const value = {
				number: 12345.12345,
				thousands: '.',
				decimals: ',',
				length: 3,
				currency: '$'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>$12.345,123</h1></body></html>');
		});

		it('Should return the price formatted without decimals in html', () => {

			const value = {
				number: 12345.12345,
				thousands: '.',
				decimals: ',',
				length: 0,
				currency: '$'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>$12.345</h1></body></html>');
		});

		it('Should return the price formatted with default decimals length in html', () => {

			const value = {
				number: 12345.12345,
				thousands: '.',
				decimals: ',',
				length: 'invalidValue',
				currency: '$'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>$12.345,12</h1></body></html>');
		});

		it('Should return the price formatted without thousands separator in html', () => {

			const value = {
				number: 12345.12345,
				thousands: '',
				decimals: ',',
				length: 0,
				currency: '$'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>$12345</h1></body></html>');
		});


		it('Should return the price formatted with default thousands separator in html', () => {

			const value = {
				number: 12345.12345,
				thousands: false,
				decimals: ',',
				length: 2,
				currency: '$'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>$12.345,12</h1></body></html>');
		});

		it('Should return the price formatted with default decimals separator and currency in html', () => {

			const value = {
				number: 12345.12345,
				thousands: '.',
				decimals: false,
				length: 2,
				currency: false
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>12.345,12</h1></body></html>');
		});
	});

	context('When must render using currency helper', () => {

		it('Should return the price formatted with default values', () => {

			const template = '<html><body><h1>{{currency number}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 12345.12345
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>$12,345.12</h1></body></html>');
		});

		it('Should return the price formatted with the given currencyCode', () => {

			const template = '<html><body><h1>{{currency number currencyCode=currency}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 12345.12345,
				currency: 'ARS'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>ARS\xa012,345.12</h1></body></html>');
		});

		it('Should return the price formatted with the given currencyDisplay', () => {

			const template = '<html><body><h1>{{currency number currencyDisplay=currencyDisplay}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 12345.12345,
				currencyDisplay: 'name'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>12,345.12 US dollars</h1></body></html>');
		});

		it('Should return the price formatted with the given locale', () => {

			const template = '<html><body><h1>{{currency number locale=locale}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 12345.12345,
				locale: 'es-AR'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>US$\xa012.345,12</h1></body></html>');
		});

		it('Should return the price formatted with all the given options', () => {

			const template = '<html><body><h1>{{currency number locale=locale currencyCode=currency currencyDisplay=currencyDisplay}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 12345.12345,
				currency: 'ARS',
				currencyDisplay: 'name',
				locale: 'es-AR'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>12.345,12 pesos argentinos</h1></body></html>');
		});
	});

	context('When must render using hasSubStr as block helper', () => {

		const template = '<html><body><h1>{{#hasSubStr text subStr}}True{{/hasSubStr}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the content inside of the block in html if the condition its true', () => {

			const value = {
				text: 'Hello!, its a text',
				subStr: 'text'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>True</h1></body></html>');
		});

		it('Should return empty string if the conditions its not true', () => {

			const value = {
				text: 'Hello!, its a text',
				subStr: 'other'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using hasSubStr helper', () => {

		const template = '<html><body><h1>{{hasSubStr text subStr}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return true in html if the condition its true', () => {

			const value = {
				text: 'Hello!, its a text',
				subStr: 'text'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>true</h1></body></html>');
		});

		it('Should return false if the conditions its not true', () => {

			const value = {
				text: 'Hello!, its a text',
				subStr: 'other'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>false</h1></body></html>');
		});
	});

	context('When must render using count helper', () => {

		const template = '<html><body><h1>{{count value}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the length of the array in html', () => {

			const value = {
				value: [1, 2, 3]
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>3</h1></body></html>');
		});

		it('Should return the count of the properties of an object in html', () => {

			const value = {
				value: {
					value1: 'test',
					value2: 'test',
					value3: 'test'
				}
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>3</h1></body></html>');
		});

		it('Should return the length of a string in html', () => {

			const value = {
				value: 'Test'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>4</h1></body></html>');
		});

		it('Should return 0 if the value passed is invalid ', () => {

			const value = {
				value: 123
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>0</h1></body></html>');
		});
	});

	context('When must render using isTrue helper', () => {

		const template = '<html><body><h1>{{isTrue value1 value2}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return true if the condition is true', () => {

			const value = {
				value1: 'Test',
				value2: true
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>true</h1></body></html>');
		});
		it('Should return false if the condition is not true', () => {

			const value = {
				value1: 0,
				value2: true
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>false</h1></body></html>');
		});
	});

	context('When must render using isFalse helper', () => {

		const template = '<html><body><h1>{{isFalse value1 value2}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return true if the condition is true', () => {

			const value = {
				value1: '',
				value2: false
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>true</h1></body></html>');
		});
		it('Should return false if the condition is not true', () => {

			const value = {
				value1: true,
				value2: false
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>false</h1></body></html>');
		});
	});

	context('When must render using in helper', () => {

		const template = '<html><body><h1>{{#in id "245,1,300"}}Im {{id}}{{/in}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the value inside of block in html if the condition is true', () => {

			const value = {
				id: 245
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Im 245</h1></body></html>');
		});

		it('Should return an empty string if the condition is not true', () => {

			const value = {
				id: 100
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using notIn helper', () => {

		const template = '<html><body><h1>{{#notIn id "245,272,300"}}Im not 245, 272, 300. Im {{id}}{{/notIn}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the value inside of block in html if the condition is true', () => {

			const value = {
				id: 60
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Im not 245, 272, 300. Im 60</h1></body></html>');
		});

		it('Should return an empty string if the condition is not true', () => {

			const value = {
				id: 245
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using lte helper', () => {

		const template = '<html><body><h1>{{#lte value1 value2}}True{{/lte}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the value inside of block in html if the a value is lower than second one', () => {

			const value = {
				value1: 2,
				value2: 4
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>True</h1></body></html>');
		});

		it('Should return the value inside of block in html if the a value is equal than second one', () => {

			const value = {
				value1: 5,
				value2: 5
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>True</h1></body></html>');
		});

		it('Should return an empty string if the condition is not true', () => {

			const value = {
				value1: 6,
				value2: 2
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using lt helper', () => {

		const template = '<html><body><h1>{{#lt value1 value2}}True{{/lt}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the value inside of block in html if the condition is true', () => {

			const value = {
				value1: 2,
				value2: 5
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>True</h1></body></html>');
		});

		it('Should return an empty string if the condition is not true', () => {

			const value = {
				value1: 6,
				value2: 2
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using gte helper', () => {

		const template = '<html><body><h1>{{#gte value1 value2}}True{{/gte}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the value inside of block in html if the a value is greater than second one', () => {

			const value = {
				value1: 5,
				value2: 2
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>True</h1></body></html>');
		});

		it('Should return the value inside of block in html if the a value is equal than second one', () => {

			const value = {
				value1: 5,
				value2: 5
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>True</h1></body></html>');
		});

		it('Should return an empty string if the condition is not true', () => {

			const value = {
				value1: 2,
				value2: 6
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using gt helper', () => {

		const template = '<html><body><h1>{{#gt value1 value2}}True{{/gt}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the value inside of block in html if the condition is true', () => {

			const value = {
				value1: 5,
				value2: 2
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>True</h1></body></html>');
		});

		it('Should return an empty string if the condition is not true', () => {

			const value = {
				value1: 2,
				value2: 6
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using formatWeight helper', () => {

		const template = '<html><body><h1>{{formatWeight number decimal length}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the weight formatted', () => {

			const value = {
				number: 123.123123,
				decimal: ',',
				length: 2
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123,12</h1></body></html>');
		});

		it('Should return the weight formatted with default decimal separator ', () => {

			const value = {
				number: 123.123123,
				decimal: false,
				length: 2
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123,12</h1></body></html>');
		});

		it('Should return the weight formatted without decimals ', () => {

			const value = {
				number: 123.123123,
				decimal: ',',
				length: 0
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123</h1></body></html>');
		});

		it('Should return the weight formatted with default decimals length ', () => {

			const value = {
				number: 123.123123,
				decimal: ',',
				length: 0 / 0
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123,12</h1></body></html>');
		});
	});

	context('When must render using formatNumber helper', () => {

		it('Should return the number formatted as decimal with 3 decimal digits by default', () => {

			const template = '<html><body><h1>{{formatNumber number}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 123.123123
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123.123</h1></body></html>');
		});

		it('Should return the number formatted as kilograms if style=unit is set', () => {

			const template = '<html><body><h1>{{formatNumber number style=\'unit\'}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 123.123123
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123.123 kg</h1></body></html>');
		});

		it('Should return the number formatted as liters if style=unit and unit=liter are set', () => {

			const template = '<html><body><h1>{{formatNumber number style=\'unit\' unit=\'liter\'}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 123.123123
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123.123 L</h1></body></html>');
		});

		it('Should return the number formatted with the full MU name if unitDisplay=long is set', () => {

			const template = '<html><body><h1>{{formatNumber number style=\'unit\' unitDisplay=\'long\'}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 123.123123
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123.123 kilograms</h1></body></html>');
		});

		it('Should return the number with maximum 2 decimal digits if maximumFractionDigits=2 is set', () => {

			const template = '<html><body><h1>{{formatNumber number maximumFractionDigits=2}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 123.123123
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123.12</h1></body></html>');
		});

		it('Should return the number with minimum 8 decimal digits if minimumFractionDigits=8 is set', () => {

			const template = '<html><body><h1>{{formatNumber number minimumFractionDigits=8}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 123.123123
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123.12312300</h1></body></html>');
		});

		it('Should return the number in the locale if it is set', () => {

			const template = '<html><body><h1>{{formatNumber number locale=\'es-AR\'}}</h1></body></html>';
			const templateCompiled = Handlebars.compile(template, 'strict');

			const value = {
				number: 123.123123
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>123,123</h1></body></html>');
		});
	});

	context('When must render using sumArgs helper', () => {

		const template = '<html><body><h1>{{sumArgs arg1 arg2 arg3}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the sum of all arguments', () => {

			const value = {
				arg1: 3,
				arg2: 9,
				arg3: 10
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>22</h1></body></html>');
		});

		it('Should return the sum of all arguments but without to sum the invalid values', () => {

			const value = {
				arg1: 3,
				arg2: 9,
				arg3: 0 / 0
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>12</h1></body></html>');
		});
	});

	context('When must render using multiply helper', () => {

		const template = '<html><body><h1>{{multiply value1 value2}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the multiply of two values', () => {

			const value = {
				value1: 3,
				value2: 5
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>15</h1></body></html>');
		});

		it('Should return the multiply of two decimal values', () => {

			const value = {
				value1: 1.5,
				value2: 2.5
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>3.75</h1></body></html>');
		});

		it('Should return the multiply with three decimal places and rounded down', () => {

			const value = {
				value1: 0.12345,
				value2: 0.67890
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>0.083</h1></body></html>');
		});

		it('Should return 0  if the values are not passed', () => {

			const value = {};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>0</h1></body></html>');
		});


	});

	context('When must render using for helper', () => {

		const template = '<html><body><h1>{{#for from to}}<li>Index: {{this}}</li>{{/for}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should loop the content incrementing the value with 1 until to value', () => {

			const value = {
				from: 0,
				to: 3
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1><li>Index: 0</li><li>Index: 1</li><li>Index: 2</li></h1></body></html>');
		});
	});

	context('When must render using even helper', () => {

		const template = '<html><body><h1>{{even index even odd}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the value even in html if the index are even', () => {

			const value = {
				index: 7,
				even: 'The number is even',
				odd: 'The number is odd'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>The number is odd</h1></body></html>');
		});

		it('Should return the value even in html if the index are odd', () => {

			const value = {
				index: 6,
				even: 'The number is even',
				odd: 'The number is odd'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>The number is even</h1></body></html>');
		});
	});

	context('When must render using debug helper', () => {

		const template = '<html><body><h1>{{debug object1}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return a string of an object pre formatted in html', () => {

			const value = {
				object1: {
					key: 'Hello!'
				}
			};

			assert.strictEqual(
				templateCompiled(value),
				'<html><body><h1><style>body { position: static!important;}</style><pre>[object] { key: \'Hello!\' }</pre></h1></body></html>');
		});

		it('Should return a primitive value pre formatted in html', () => {

			const value = {
				object1: 123
			};

			assert.strictEqual(
				templateCompiled(value),
				'<html><body><h1><style>body { position: static!important;}</style><pre>[number] 123</pre></h1></body></html>');
		});
	});

	context('When must render using debugString helper', () => {

		const template = '<html><body><h1>{{debugString object}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return a string of an object pre formatted in html', () => {

			const value = {
				object: {
					key: 'Hello!'
				}
			};

			assert.strictEqual(templateCompiled(value), `<html><body><h1><pre>${JSON.stringify(value.object, ' ', 4)}</pre></h1></body></html>`);
		});
	});

	context('When must render using getToggle helper', () => {

		const template = '<html><body><h1>{{getToggle object key placeholder}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the content inside of the block in html', () => {

			const value = {
				object: {
					key: 'Hello!'
				},
				key: 'key',
				placeholder: 'Placeholder'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Hello!</h1></body></html>');
		});

		it('Should return an empty string if not found the key ', () => {

			const value = {
				object: {
					key: 'Hello!'
				},
				key: 'otherKey',
				placeholder: 'Placeholder'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Placeholder</h1></body></html>');
		});
	});

	context('When must render using attributes helper', () => {

		const template = '<html><body><h1 {{attributes example}}>Hello!</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the attributes in html', () => {

			const value = {
				example: {
					class: 'color-red',
					other: 'otherValue'
				}
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1 class="color-red" other="otherValue">Hello!</h1></body></html>');
		});
	});

	context('When must render using json helper', () => {

		const template = '<html><body>{{#json example}}<h1>{{name}}</h1><h2>{{lastName}}</h2>{{/json}}</body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return a string of an object replacing the values in the context', () => {

			const value = {
				example: JSON.stringify({
					name: 'Rocky',
					lastName: 'Balboa'
				})
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Rocky</h1><h2>Balboa</h2></body></html>');
		});


		it('Should return an empty string if when parsing throw an error', () => {

			const value = {
				example: {
					name: 'Rocky',
					lastName: 'Balboa'
				}
			};

			assert.strictEqual(templateCompiled(value), '<html><body></body></html>');
		});
	});

	context('When must render using get helper', () => {

		const template = '<html><body><h1>{{get object path}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should get the value of the property specified', () => {

			const value = {
				object: {
					foo: {
						bar: true
					},
					other: 'Other'
				},
				path: 'foo.bar'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>true</h1></body></html>');
			assert.deepStrictEqual(value.object, value.object);
		});

		it('Should not change any objects property  ', () => {

			const value = {
				object: {
					foo: {
						bar: true
					},
					other: 'Other'
				},
				path: 'foo.otherProperty'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
			assert.deepStrictEqual(value.object, value.object);
		});

		it('Should return an empty string if its not object', () => {

			const value = {
				object: '',
				path: 'foo.otherProperty'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
			assert.deepStrictEqual(value.object, value.object);
		});
	});

	context('When must render using set helper', () => {

		const template = '<html><body><h1>{{set object path value}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should set the value to the property specified', () => {

			const value = {
				object: {
					foo: {
						bar: true
					},
					other: 'Other'
				},
				path: 'foo.bar',
				value: 'valueChanged'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
			assert.deepStrictEqual(value.object, {
				foo: {
					bar: 'valueChanged'
				},
				other: 'Other'
			});
		});

		it('Should not change any objects property', () => {

			const value = {
				object: {
					foo: {
						bar: true
					},
					other: 'Other'
				},
				path: 'foo.otherProperty',
				value: 'valueChanged'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
			assert.deepStrictEqual(value.object, value.object);
		});

		it('Should return an empty string if its not object', () => {

			const value = {
				object: '',
				path: 'foo.bar',
				value: 'Hello!'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
			assert.deepStrictEqual(value.object, value.object);
		});

		it('Should set the value to the property specified and delete root_modules property', () => {

			const value = {
				object: {
					foo: {
						bar: true
					},
					other: 'Other'
				},
				path: 'foo.bar',
				value: {
					name: 'Example',
					root_modules: '...'
				}
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
			assert.deepStrictEqual(value.object, {
				foo: {
					bar: {
						name: 'Example'
					}
				},
				other: 'Other'
			});
		});
	});

	context('When must render using modulus helper', () => {

		const template = '<html><body><h1>{{#modulus index mod result}}The result is 0{{/modulus}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return with value in html inside of the block if the operation is correct', () => {

			const value = {
				index: 20,
				mod: 2,
				result: 0
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>The result is 0</h1></body></html>');
		});

		it('Should return empty string if the operation is incorrect', () => {

			const value = {
				index: 20,
				mod: 2,
				result: 4
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using sanitize helper', () => {

		const template = '<html><body><h1>{{sanitize example}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return with value sanitized', () => {

			const value = {
				example: 'ThE-example-to-saNITIZE'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>theexampletosanitize</h1></body></html>');
		});
	});

	context('When must render using camelize helper', () => {

		const template = '<html><body><h1>{{camelize example}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return with value camelized', () => {

			const value = {
				example: 'ThE example to cAMELIZE'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>theExampleToCamelize</h1></body></html>');
		});
	});

	context('When must render using stripHost helper', () => {

		const template = '<html><body><h1>{{stripHost url}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the url striped in html', () => {

			const value = {
				url: 'http://google.com.ar/search'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>/search</h1></body></html>');
		});
	});

	context('When must render using concat helper', () => {

		const template = '<html><body><h1>{{concat value1 value2 value3}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return the value concatenated', () => {

			const value = {
				value1: 'hello',
				value2: [true, 123, 'Hello'],
				value3: false
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>hellotrue,123,Hellofalse</h1></body></html>');
		});
	});

	context('When must render using indexof helper', () => {

		const template = '<html><body><h1>{{#indexof value container}}Hello!{{/indexof}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return with value inside of block if the value is founded in the container', () => {

			const value = {
				value: true,
				container: [true, 123, 'Hello']
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Hello!</h1></body></html>');
		});

		it('Should return with value inside of block if the value is founded in the object', () => {

			const value = {
				value: true,
				container: {
					true: 123,
					name: 'Fizzmod'
				}
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Hello!</h1></body></html>');
		});

		it('Should return an empty string if the value is not equal to number', () => {

			const value = {
				value: 123,
				container: 'Hello'
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});

		it('Should return empty string if the value is not founded in the container', () => {

			const value = {
				value: 1,
				container: [true, 123, 'Hello']
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});

		it('Should return empty string if the value is not founded in the object', () => {

			const value = {
				value: 'name',
				container: {
					lastname: 'Example'
				}
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});

		it('Should return empty string if the container is not passed', () => {

			const value = {
				value: 1
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using and helper', () => {

		const template = '<html><body><h1>{{#and param1 param2 param3}}Hello!{{/and}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return with value inside of block if all the params are truthy', () => {

			const value = {
				param1: true,
				param2: 'Hello',
				param3: 321
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Hello!</h1></body></html>');
		});

		it('Should return empty string if any of the params are falsy', () => {

			const value = {
				param1: false,
				param2: 'Hello',
				param3: 321
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using or helper', () => {

		const template = '<html><body><h1>{{#or param1 param2 param3}}Hello!{{/or}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return with value inside of block if any of the arguments are truthy', () => {

			const value = {
				param1: true,
				param2: 'Hello',
				param3: 321
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Hello!</h1></body></html>');
		});

		it('Should return empty string if all the params are falsy', () => {

			const value = {
				param1: false,
				param2: '',
				param3: undefined
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using stringify helper', () => {

		const template = '<html><body><h1>{{stringify example format}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return string of an object without format in html', () => {

			const value = {
				example: {
					name: 'Rocky',
					lastName: 'Balboa'
				},
				format: false
			};

			assert.strictEqual(templateCompiled(value), '<html><body><h1>{"name":"Rocky","lastName":"Balboa"}</h1></body></html>');
		});

		it('Should return string of an object with format in html', () => {

			const value = {
				example: {
					name: 'Rocky',
					lastName: 'Balboa'
				},
				format: true
			};


			assert.strictEqual(templateCompiled(value),
				`<html><body><h1>${JSON.stringify(value.example, ' ', 4)}</h1></body></html>`);
		});
	});

	context('When must render using replace helper', () => {

		const template = '<html><body><h1>{{replace example search replace }}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return template with value replaced in html', () => {

			const value = { example: 'The example for if helper', search: 'if', replace: 'replace' };

			assert.strictEqual(templateCompiled(value), '<html><body><h1>The example for replace helper</h1></body></html>');
		});

		it('Should return template with default value replaced ("") in html if the param replace not pass', () => {

			const value = { example: 'The example for if helper', search: 'if' };

			assert.strictEqual(templateCompiled(value), '<html><body><h1>The example for  helper</h1></body></html>');
		});
	});

	context('When must render using eq helper', () => {

		const template = '<html><body><h1>{{#eq id 245}}Im 245!{{/eq}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return template with value inside of block if the conditional is true', () => {

			const value = { id: 245 };

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Im 245!</h1></body></html>');
		});

		it('Should return empty string if the conditional is false', () => {

			const value = { id: 123 };

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using ne helper', () => {

		const template = '<html><body><h1>{{#ne id 245}}Im 245!{{/ne}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return template with value inside of block if the conditional is true', () => {

			const value = { id: 123 };

			assert.strictEqual(templateCompiled(value), '<html><body><h1>Im 245!</h1></body></html>');
		});

		it('Should return empty string if the conditional is false', () => {

			const value = { id: 245 };

			assert.strictEqual(templateCompiled(value), '<html><body><h1></h1></body></html>');
		});
	});

	context('When must render using lowercase helper', () => {

		const template = '<html><body><h1>{{lowercase title}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return template with value in lowercase', () => {

			const values = {
				title: 'TEST'
			};

			assert.strictEqual(templateCompiled(values), '<html><body><h1>test</h1></body></html>');
		});

		it('Should return template with value in string if value is number', () => {

			const values = {
				title: 100
			};

			assert.strictEqual(templateCompiled(values), '<html><body><h1>100</h1></body></html>');
		});
	});

	context('When must render using uppercase helper', () => {

		const template = '<html><body><h1>{{uppercase title}}</h1></body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return template with value in uppercase', () => {

			const values = {
				title: 'test'
			};

			assert.strictEqual(templateCompiled(values), '<html><body><h1>TEST</h1></body></html>');
		});

		it('Should return template with value in string if value is number', () => {

			const values = {
				title: 100
			};

			assert.strictEqual(templateCompiled(values), '<html><body><h1>100</h1></body></html>');
		});
	});
});
