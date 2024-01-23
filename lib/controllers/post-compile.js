'use strict';

const { Invoker } = require('@janiscommerce/lambda');

const { escapeRegExp } = require('../utils');

const pattern = /#SHORTLINK\[[^\]]+\]/g;

module.exports = class HTMLPostCompileController {

	constructor(settings = {}) {
		this.shortLink = settings?.shortLink ?? true;
	}

	async process(template) {

		if(typeof template !== 'string')
			throw new Error('Template must be a string');

		const coincidences = template.match(pattern);

		if(!coincidences)
			return template;

		const uniqueConcidences = new Set(coincidences);

		this.shortLinksByLink = {};

		await Promise.all(Array.from(uniqueConcidences).map(link => this.getShortlink(link)));

		return Object.entries(this.shortLinksByLink).reduce((result, [longLink, shortLink]) => {
			const exp = new RegExp(`#SHORTLINK\\[${escapeRegExp(longLink)}\\]`, 'g');
			return result.replace(exp, shortLink);
		}, template);
	}

	async getShortlink(wrappedlink) {

		const originalLink = wrappedlink.slice(11, -1); // Extract link from '#SHORTLINK[link]'

		const response = this.shortLink && await Invoker.serviceSafeCall('link', 'CreateLink', { target: originalLink });

		this.shortLinksByLink[originalLink] = response?.payload?.shortUrl || originalLink;
	}
};
