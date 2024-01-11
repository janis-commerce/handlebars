'use strict';

const { Invoker } = require('@janiscommerce/lambda');

const pattern = /#SHORTLINK\[[^\]]+\]/g; // Guardar el patrón segín el tipo de wrapper

module.exports = class HTMLPostCompileController {

	constructor(settings = {}) {
		this.shortLink = settings.hasOwnProperty('shortLink') ? settings.shortLink : true;
	}

	async process(template) {

		const coincidences = template.match(pattern);

		if(!coincidences)
			return template;

		const uniqueConcidences = new Set(coincidences);

		this.shortLinksByLink = {};

		await Promise.all(Array.from(uniqueConcidences).map(link => this.getShortlink(link)));

		return Object.entries(this.shortLinksByLink).reduce((result, [longLink, shortLink]) => {
			const exp = new RegExp('#SHORTLINK\\[' + longLink + '\\]', 'g');
			return result.replace(exp, shortLink);
		}, template);
	}

	async getShortlink(wrappedlink) {

		const originalLink = wrappedlink.slice(11, -1); // Extract link from '#SHORTLINK[link]'

		if(!this.shortLink) {

			this.shortLinksByLink[originalLink] = originalLink;
			return;
		}

		const { payload: { shortUrl } } = await Invoker.serviceSafeCall('link', 'CreateLink', { target: originalLink });

		this.shortLinksByLink[originalLink] = shortUrl || originalLink;
	}
};
