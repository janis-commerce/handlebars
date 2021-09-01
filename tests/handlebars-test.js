'use strict';

const assert = require('assert');

const {
	Handlebars,
	HandlebarsError
} = require('../lib');

describe('Handlebars', () => {

	context('When must render using markdown helper', () => {

		const template = '<html><body>{{markdown ## Probando}}</body></html>';
		const templateCompiled = Handlebars.compile(template, 'strict');

		it('Should return template with value in html', () => {

			const values = {
				title: 'test'
			};

			assert.strictEqual(templateCompiled(values), '<html><body><h2 id="probando">Probando</h2></body></html>');
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
