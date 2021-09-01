'use strict';

const {
	concat,
	markdown,
	ansi,
	lowercase,
	uppercase,
	stripHost,
	replace,
	stringify,
	attributes
} = require('./lib/helpers');

// const { Handlebars } = require('./lib/index');

console.log('CONCAT: ', concat('1-', '2-', '3')); // Works

console.log('MARKDOWN: ', markdown('## Probando')); // Works

console.log('ANSI: ', ansi('\x1b[30mblack\x1b[37mwhite')); // Works

console.log('LOWERCASE: ', lowercase('Probando')); // Works

console.log('UPPERCASE: ', uppercase('Probando')); // Works

console.log('STRIPHOST: ', stripHost('http://google.com.ar/search')); // Works

console.log('REPLACE: ', replace('El dinosaurio verde', 'verde', 'enano')); // Works

console.log('STRINGIFY: ', stringify({
	name: 'Mariano',
	lastName: 'Fernandez'
}, true)); // Works

console.log('ATTRIBUTES: ', attributes({
	name: 'Mariano',
	lastName: 'Fernandez'
})); // Works


// console.log('ATTRIBUTES: ', Handlebars.attributes({
// 	name: 'Mariano',
// 	lastName: 'Fernandez'
// })); // Works
