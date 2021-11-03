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

	constructor(data) {
		this.data = data;
	}

	/**
	 * The function process to pre compile data
	 * @returns {Promise<Array<object>>} dataFormatted Data Formatted
	 */
	async process() {
		return this.format(this.data);
	}

	/**
	 * Format data
	 * @param {object} data Original Data
	 * @returns {object} dataFormatted Data Formatted
	 */
	async format(data) {

		const dataFormatted = {};

		const { keysWithCodeFormat, keysWithoutCodeFormat } = Object.keys(data).reduce(((dataKeys, key) => {

			if(this.hasCodeFormat(key))
				dataKeys.keysWithCodeFormat.push(key);
			else
				dataKeys.keysWithoutCodeFormat.push(key);

			return dataKeys;

		}), {
			keysWithCodeFormat: [],
			keysWithoutCodeFormat: []
		});

		await this.formatKeysWithoutCodeFormats(keysWithoutCodeFormat, data, dataFormatted);
		await this.formatKeysWithCodeFormats(keysWithCodeFormat, data, dataFormatted);

		return dataFormatted;
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
	 * @param {Object} data Original Data
	 * @param {Object} dataFormatted  Data Formatted
	 * @returns
	 */
	formatKeysWithoutCodeFormats(keysWithoutCodeFormat, data, dataFormatted) {
		return Promise.all(keysWithoutCodeFormat.map(async key => {

			// If field data is a primitive data
			if(!key || typeof data[key] !== 'object' || !data[key]) {
				dataFormatted[key] = data[key];
				return;
			}

			// If field data is an Array
			if(Array.isArray(data[key])) {
				// Will try to search Code Formats in the Array if elements are objects (including other arrays)
				dataFormatted[key] = await Promise.all(data[key].map(fieldData => {
					return fieldData && typeof fieldData === 'object' ? this.format(fieldData) : fieldData;
				}));

				return;
			}
			// If field data is an Object will format
			dataFormatted[key] = await this.format(data[key]);
		}));
	}

	/**
	 * Format data value from original data to Code Formats
	 * @param {Array<string>} keysWithCodeFormat Keys that have a Code format
	 * @param {Object} data Original data
	 * @param {Object} dataFormatted Data Formatted
	 */
	formatKeysWithCodeFormats(keysWithCodeFormat, data, dataFormatted) {
		return Promise.all(keysWithCodeFormat.map(async key => {

			const [, formatFunctionName] = Object.entries(codeFormats).find(([code]) => key.startsWith(code));

			dataFormatted[key] = data[key] && await this[formatFunctionName](data[key]);
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
