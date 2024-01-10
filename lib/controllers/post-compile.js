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

		const shortLinksByLink = await this.getShortlinks(coincidences);

		return Object.entries(shortLinksByLink).reduce((result, [longLink, shortLink]) => {
			const exp = new RegExp('#SHORTLINK\\[' + longLink + '\\]', 'g'); // Está sujeto solo al #SHORTLINK
			return result.replace(exp, shortLink);
		}, template);
	}

	async getShortlinks(links) {

		const shortenedLinks = links.reduce(async (results, wrappedlink) => {

			const actualResults = await results;

			const originalLink = wrappedlink.slice(11, -1); // Solo funciona con formato #SHORTLINK[link]

			if(actualResults[originalLink])
				return actualResults;


			if(!this.shortLink) {
				actualResults[originalLink] = originalLink;
				return actualResults;
			}

			const { payload: { shortUrl } } = await Invoker.serviceSafeCall('link', 'CreateLink', { target: originalLink });

			actualResults[originalLink] = shortUrl || originalLink;

			return actualResults;

		}, {});

		return shortenedLinks;
	}
};
