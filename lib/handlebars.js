'use strict';

const Handlebars = require('handlebars');

const HTMLPreCompileController = require('./controllers/pre-compile');

const {
	concat,
	markdown,
	ansi,
	lowercase,
	uppercase,
	stripHost,
	replace,
	stringify,
	attributes,
	set,
	getToggle,
	json,
	eq,
	ne,
	and,
	or,
	indexof,
	regexReplace,
	camelize,
	sanitize,
	modulus,
	get,
	debugString,
	debug,
	even,
	forHelper,
	sumArgs,
	gt,
	gte,
	lt,
	lte,
	notIn,
	inHelper,
	isTrue,
	isFalse,
	count,
	hasSubStr,
	customFormatPrice,
	currency,
	sumArray,
	isNegative,
	formatNumber,
	formatWeight,
	base1Index,
	formatDate
} = require('./helpers');

Handlebars.registerHelper('concat', concat);

Handlebars.registerHelper('markdown', markdown);

Handlebars.registerHelper('ansi', ansi);

Handlebars.registerHelper('lowercase', lowercase);

Handlebars.registerHelper('uppercase', uppercase);

Handlebars.registerHelper('stripHost', stripHost);

Handlebars.registerHelper('replace', replace);

Handlebars.registerHelper('stringify', stringify);

Handlebars.registerHelper('attributes', attributes);

Handlebars.registerHelper('set', set);

Handlebars.registerHelper('getToggle', getToggle);

Handlebars.registerHelper('json', json);

Handlebars.registerHelper('eq', eq);

Handlebars.registerHelper('ne', ne);

Handlebars.registerHelper('or', or);

Handlebars.registerHelper('and', and);

Handlebars.registerHelper('indexof', indexof);

Handlebars.registerHelper('regexReplace', regexReplace);

Handlebars.registerHelper('camelize', camelize);

Handlebars.registerHelper('sanitize', sanitize);

Handlebars.registerHelper('modulus', modulus);

Handlebars.registerHelper('get', get);

Handlebars.registerHelper('debugString', debugString);

Handlebars.registerHelper('even', even);

Handlebars.registerHelper('debug', debug);

Handlebars.registerHelper('for', forHelper);

Handlebars.registerHelper('sumArgs', sumArgs);

Handlebars.registerHelper('formatNumber', formatNumber);

Handlebars.registerHelper('formatWeight', formatWeight);

Handlebars.registerHelper('gt', gt);

Handlebars.registerHelper('gte', gte);

Handlebars.registerHelper('lt', lt);

Handlebars.registerHelper('lte', lte);

Handlebars.registerHelper('notIn', notIn);

Handlebars.registerHelper('in', inHelper);

Handlebars.registerHelper('isTrue', isTrue);

Handlebars.registerHelper('isFalse', isFalse);

Handlebars.registerHelper('count', count);

Handlebars.registerHelper('hasSubStr', hasSubStr);

Handlebars.registerHelper('customFormatPrice', customFormatPrice);

Handlebars.registerHelper('currency', currency);

Handlebars.registerHelper('sumArray', sumArray);

Handlebars.registerHelper('isNegative', isNegative);

Handlebars.registerHelper('base1Index', base1Index);

Handlebars.registerHelper('formatDate', formatDate);

Handlebars.preCompile = templateValues => {

	const preCompileController = new HTMLPreCompileController();

	return preCompileController.process(templateValues);
};

module.exports = Handlebars;
