'use strict';

// const HandlebarsError = require('./handlebars-error');
const Handlebars = require('handlebars');

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
	getPropertyOrPlaceholder,
	json,
	eq,
	ne,
	and,
	or,
	indexof,
	regexReplace
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

Handlebars.registerHelper('getPropertyOrPlaceholder', getPropertyOrPlaceholder);

Handlebars.registerHelper('json', json);

Handlebars.registerHelper('eq', eq);

Handlebars.registerHelper('ne', ne);

Handlebars.registerHelper('or', or);

Handlebars.registerHelper('and', and);

Handlebars.registerHelper('indexof', indexof);

Handlebars.registerHelper('regexReplace', regexReplace);

module.exports = Handlebars;
