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
