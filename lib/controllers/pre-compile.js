'use strict';

// Format Code libs
const QRCode = require('qrcode');
const bwipjs = require('bwip-js');

// In order to expanse the formats, add new keys and functions
// [format to search in keys] : format function
const codeFormats = {
	qr_: 'generateQRImage',
	barcode128_: 'generateBarcode128'
};

module.exports = class HTMLPreCompileController {

	/**
	 * Main process function. Validates and format the values
	 * @param {object} templateValues Original Template Values
	 * @returns {Promise<<object>} templateValuesFormatted Templates values formatted
	 */
	process(templateValues) {

		if(typeof templateValues !== 'object' || Array.isArray(templateValues) || !templateValues)
			throw new Error('Template Values must be an object');

		if(!Object.keys(templateValues).length)
			throw new Error('Template values must\n be empty object');

		return this.format(templateValues);
	}

	/**
	 * Format template values
	 * @param {object} templateValues Original Template Values
	 * @returns {Promise<<object>} templateValuesFormatted Templates values formatted
	 */
	async format(templateValues) {

		const templateValuesFormatted = {};

		const { keysWithCodeFormat, keysWithoutCodeFormat } = Object.keys(templateValues).reduce(((dataKeys, key) => {

			if(this.hasCodeFormat(key))
				dataKeys.keysWithCodeFormat.push(key);
			else
				dataKeys.keysWithoutCodeFormat.push(key);

			return dataKeys;

		}), {
			keysWithCodeFormat: [],
			keysWithoutCodeFormat: []
		});

		await Promise.all([
			await this.formatKeysWithoutCodeFormats(keysWithoutCodeFormat, templateValues, templateValuesFormatted),
			await this.formatKeysWithCodeFormats(keysWithCodeFormat, templateValues, templateValuesFormatted)
		]);

		return templateValuesFormatted;
	}

	/**
	 * Checks if the key has code format
	 * @param {string} key Key of the object
	 * @returns {boolean}
	 */
	hasCodeFormat(key) {
		return Object.keys(codeFormats).some(format => key.startsWith(format));
	}

	/**
	 * Format keys without any Code Format, But Search in nested data.
	 * @param {*} keysWithoutCodeFormat Keys that have not any Code format
	 * @param {Object} templateValues Original Template Values
	 * @param {Object} templateValuesFormatted  Templates values formatted
	 */
	formatKeysWithoutCodeFormats(keysWithoutCodeFormat, templateValues, templateValuesFormatted) {
		return Promise.all(keysWithoutCodeFormat.map(async key => {

			// If field data is a primitive data
			if(!key || typeof templateValues[key] !== 'object' || !templateValues[key]) {
				templateValuesFormatted[key] = templateValues[key];
				return;
			}

			// If field data is an Array
			if(Array.isArray(templateValues[key])) {
				// Will try to search Code Formats in the Array if elements are objects (including other arrays)
				templateValuesFormatted[key] = await Promise.all(templateValues[key].map(fieldData => {
					return fieldData && typeof fieldData === 'object' ? this.format(fieldData) : fieldData;
				}));

				return;
			}
			// If field data is an Object will format
			templateValuesFormatted[key] = await this.format(templateValues[key]);
		}));
	}

	/**
	 * Format data value from original template values to Code Formats
	 * @param {Array<string>} keysWithCodeFormat Keys that have a Code format
	 * @param {Object} templateValues Original Template Values
	 * @param {Object} templateValuesFormatted  Templates values formatted
	 */
	formatKeysWithCodeFormats(keysWithCodeFormat, templateValues, templateValuesFormatted) {
		return Promise.all(keysWithCodeFormat.map(async key => {

			const [, formatFunctionName] = Object.entries(codeFormats).find(([code]) => key.startsWith(code));

			templateValuesFormatted[key] = templateValues[key] && await this[formatFunctionName](templateValues[key]);
		}));
	}

	/**
	 * Generate QR Code Images
	 * @param {string|number|boolean|object|Array} qrData Data to convert to QR Code Image
	 * @returns {Buffer} QR Code Image in Buffer to add to <img /> Tag
	 */
	generateQRImage(qrData) {
		return QRCode.toDataURL(typeof qrData === 'object' ? JSON.stringify(qrData) : qrData);
	}

	/**
	 * Generate BarCode128 Images
	 * @param {string|number|boolean|object|Array} qrData Data to convert to BarCode128 Image
	 * @returns {Promise<string>} BarCode128 Image in Buffer to add to <img /> Tag
	 */
	async generateBarcode128(barcode128Data) {

		const barcodeBuffer = await bwipjs.toBuffer({
			bcid: 'code128',
			text: barcode128Data,
			scale: 3,
			height: 10,
			includetext: true,
			textxaling: 'center'
		});

		const barcodeString64 = barcodeBuffer.toString('base64');

		return `data:image/png;base64,${barcodeString64}`;
	}
};
