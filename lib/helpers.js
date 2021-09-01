'use strict';

const showdown = require('showdown');
const Ansi = require('ansi-to-html');

const escapeHTML = html => {
	return (html || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
};

// module.exports.get = function() {
// 	const block = Array.prototype.pop.apply(arguments);

// 	if(arguments.length === 1)
// 		return arguments[0].toString().replace(/(module|vw)_/, '');

// 	let object = null;
// 	for(const arg of arguments) {
// 		if(!object)
// 			object = arg;
// 		if(object && typeof object[arg] !== 'undefined') {
// 			if(typeof object[arg] === 'object')
// 				object = object[arg];
// 			else return object[arg];
// 		}

// 	}
// 	return object;
// };

// --HandleBars
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
			object = object[property[index]];
	});

	return '';
};

// --HandleBars
module.exports.getPropertyOrPlaceholder = (object, key, placeholder) => {
	return object && key in object ? object[key] : placeholder;
};

// --HandleBars
module.exports.json = (json, block) => {
	try {
		return block.fn(JSON.parse(json));
	} catch(e) {
		return '';
	}
};

// --HandleBars
module.exports.attributes = attributes => {

	const reducer = (accumulator, currentAttribute) => {
		accumulator += `${currentAttribute}='${attributes[currentAttribute]}'`;
		return accumulator;
	};

	return Object.keys(attributes).reduce(reducer, '');
};

// --HandleBars
module.exports.replace = (haystack, search, replace) => {
	return haystack.toString().replace(search, replace || '');
};

// --HandleBars
module.exports.stringify = (object, format) => {
	if(typeof format === 'boolean' && format === false)
		return escapeHTML(JSON.stringify(object));

	return escapeHTML(JSON.stringify(object, ' ', 4));
};

// --HandleBars
module.exports.markdown = text => {
	const converter = new showdown.Converter();
	return converter.makeHtml(text);
};

// --HandleBars
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
	return convert.toHtml(text);
};

// --HandleBars
module.exports.eq = (first, second, block) => {
	return first === second ? block.fn(this) : block.inverse(this);
};

// --HandleBars
module.exports.ne = (first, second, block) => {
	return first !== second ? block.fn(this) : block.inverse(this);
};

// --HandleBars
module.exports.and = (...args) => {
	const block = args.pop();

	for(const arg of args) {
		if(!arg)
			return block.inverse(this);
	}
	return block.fn(this);
};

// --HandleBars
module.exports.or = (...args) => {
	const block = args.pop();

	for(const arg of args) {
		if(arg)
			return block.fn(this);
	}
	return block.inverse(this);
};

// --HandleBars
module.exports.indexof = (needle, haystack, block) => {

	if(!haystack)
		return block.inverse(this);

	needle = needle.toString();

	if(haystack instanceof Array)
		return haystack.map(item => '' + item).find(element => element === needle) ? block.fn(this) : block.inverse(this);

	if(typeof haystack === 'object' && needle in haystack)
		return block.fn(this);

	if(typeof haystack === 'string' || typeof haystack === 'number')
		return needle === haystack ? block.fn(this) : block.inverse(this);

	return block.inverse(this);
};

// --HandleBars
module.exports.concat = (...args) => {

	const params = args.slice();

	return params.join('');
};

// --HandleBars
module.exports.lowercase = value => {
	return value.toString().toLowerCase();
};

// --HandleBars
module.exports.uppercase = value => {
	return value.toString().toUpperCase();
};

// --HandleBars
module.exports.regexReplace = (haystack, search, flags, replace) => {

	if(!search)
		return null;

	const regex = new RegExp(search.toString(), flags.toString());

	return haystack.replace(regex, replace);
};

// --HandleBars
module.exports.stripHost = URL => {
	return URL.toString().replace(/https?:\/\/.*?\//i, '/');
};


// module.exports.camelize = value => {
//     return utils.sanitizeString(value.toString(), ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
//         return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
//     }).replace(/\s+/g, '');
// }

// module.exports.sanitize = (value, replace) => {
//     return utils.sanitizeString(value, replace);
// }

// module.exports.modulus = (index, mod, result, block) => {
//     if(parseInt(index) % mod === parseInt(result))
//         return block.fn(this);
//     return block.inverse(this);
// }
