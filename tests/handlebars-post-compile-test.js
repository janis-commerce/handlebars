'use strict';

const sinon = require('sinon');

const assert = require('assert');

const { Invoker } = require('@janiscommerce/lambda');

const {
	Handlebars
} = require('../lib');

describe('Handlebars PostCompile', () => {

	// eslint-disable-next-line max-len
	const template = 'Hi! This is my professional website #SHORTLINK[https://www.professional.com/about?fq=H:197], and this my personal website #SHORTLINK[https://www.personal.com]';

	const shortLink1 = 'https://link.janisdev.in/api/l/G2WTXXZ';

	const shortLink2 = 'https://link.janisdev.in/api/l/WD8DUP3';

	const postCompiledTemplate = `Hi! This is my professional website ${shortLink1}, and this my personal website ${shortLink2}`;

	const responseCreateLink = link => ({
		payload: {
			shortUrl: link
		}
	});

	afterEach(() => {
		sinon.restore();
	});

	context('When replace links successfully', () => {

		it('Should compile generating a short link for each different link', async () => {

			sinon.stub(Invoker, 'serviceSafeCall')
				.onCall(0)
				.resolves(responseCreateLink(shortLink1))
				.onCall(1)
				.resolves(responseCreateLink(shortLink2));

			const postCompileResponse = await Handlebars.postCompile(template);
			assert.deepStrictEqual(postCompileResponse, postCompiledTemplate);

		});

		it('Should compile without generating a different short link for each identical link', async () => {

			// eslint-disable-next-line max-len
			const templateWithDuplicatedLink = 'Hi! This is my professional website #SHORTLINK[https://www.professional.com], and here it goes again #SHORTLINK[https://www.professional.com]';

			const compilatedTemplateWithDuplicatedLink = `Hi! This is my professional website ${shortLink1}, and here it goes again ${shortLink1}`;

			sinon.stub(Invoker, 'serviceSafeCall').resolves(responseCreateLink(shortLink1));

			const postCompileResponse = await Handlebars.postCompile(templateWithDuplicatedLink);

			assert.deepStrictEqual(postCompileResponse, compilatedTemplateWithDuplicatedLink);

			sinon.assert.calledOnceWithExactly(Invoker.serviceSafeCall, 'link', 'CreateLink', {
				target: 'https://www.professional.com'
			});

		});
	});

	context('When it does not replace links', () => {

		beforeEach(() => {
			sinon.spy(Invoker, 'serviceSafeCall');
		});


		it('Should return the same template if there are no links to shorten', async () => {

			const templateWithoutLinks = '<html><body><h1>This is a template without links</h1></body></html>';

			const postCompileResponse = await Handlebars.postCompile(templateWithoutLinks);

			assert.deepStrictEqual(postCompileResponse, templateWithoutLinks);

			sinon.assert.notCalled(Invoker.serviceSafeCall);

		});
	});

	context('When keep the original link', () => {

		// eslint-disable-next-line max-len
		const compiledTemplateWithOriginalLinks = 'Hi! This is my professional website https://www.professional.com/about?fq=H:197, and this my personal website https://www.personal.com';

		it('Should keep the original link if setting is off', async () => {

			sinon.spy(Invoker, 'serviceSafeCall');

			const postCompileResponse = await Handlebars.postCompile(template, { shortLink: false });

			assert.deepStrictEqual(postCompileResponse, compiledTemplateWithOriginalLinks);

			sinon.assert.notCalled(Invoker.serviceSafeCall);

		});

		it('Should keep the original link if the link creation fails', async () => {

			sinon.stub(Invoker, 'serviceSafeCall').resolves({
				statusCode: 500,
				payload: 'Error creating link'
			});

			const postCompileResponse = await Handlebars.postCompile(template);

			assert.deepStrictEqual(postCompileResponse, compiledTemplateWithOriginalLinks);

			sinon.assert.calledTwice(Invoker.serviceSafeCall);

		});

	});
});
