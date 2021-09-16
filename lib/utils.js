'use strict';

module.exports.sanitizeString = (str, replace) => {

	replace = typeof replace === 'string' ? replace : '-';

	str = str.toLowerCase().trim();
	str = str.replace(/[[\]()\-{}^]/g, '');
	str = str.replace(/[àáâãäåª]/g, 'a');
	str = str.replace(/[éèëê]/g, 'e');
	str = str.replace(/[íìïî]/g, 'i');
	str = str.replace(/[óòöô]/g, 'o');
	str = str.replace(/[úùüû]/g, 'u');
	str = str.replace(/[ñ]/g, 'n');
	str = str.replace(/[ç]/g, 'c');
	str = str.replace(/ /g, replace);
	return str;
};

module.exports.parseDecimalLength = length => (typeof length === 'number' ? length : null) || (length === '0' || length === 0 ? 0 : 2);

module.exports.parseDecimal = (number, decimal, length) => {

	const newNumber = Number(number).toFixed(Math.max(0, ~~length));

	return newNumber.replace('.', (decimal || ','));
};
