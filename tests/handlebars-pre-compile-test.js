'use strict';

require('lllog')('none');

const assert = require('assert');
const sinon = require('sinon');
const QRCode = require('qrcode');
const bwipjs = require('bwip-js');

const {
	Handlebars
} = require('../lib');

describe('Handlebars PreCompile', () => {

	context('When the template values is not valid', () => {

		const templateValues = [
			{
				type: 'string',
				value: 'stringExample'
			},
			{
				type: 'array',
				value: [{}]
			},
			{
				type: 'number',
				value: 123
			},
			{
				type: 'null',
				value: null
			}
		];

		sinon.spy(QRCode, 'toDataURL');

		sinon.spy(bwipjs, 'toBuffer');

		templateValues.forEach(({ type, value }) => {

			it(`Should return an error when pass a ${type}`, () => {

				assert.throws(() => Handlebars.preCompile(value), { name: 'Error', message: 'Template Values must be an object' });

				sinon.assert.notCalled(QRCode.toDataURL);

				sinon.assert.notCalled(bwipjs.toBuffer);
			});
		});

		it('Should return an error when pass a empty object', () => {

			assert.throws(() => Handlebars.preCompile({}), { name: 'Error', message: 'Template values can\'t be an empty object' });

			sinon.assert.notCalled(QRCode.toDataURL);

			sinon.assert.notCalled(bwipjs.toBuffer);
		});
	});


	context('When the document must render QR Code', () => {

		beforeEach(() => {
			sinon.restore();
		});

		const qr = 'https://www.google.com/';
		const qrObject = { id: '4f1fc1eeb5b68406e0487a09', movementId: '4f1fc1eeb5b68406e0487a87' };
		const qrArray = [qrObject];

		const dataBase = {
			title: 'Example',
			email: 'test@example.com'
		};

		const data = {
			...dataBase,
			qr_data: qr
		};

		const qrCode = 'data:image/png;base64;ivBoQR01W';

		const response = {
			...data,
			qr_data: qrCode
		};

		it('Should return the qr replaced when it is an string', async () => {

			sinon.stub(QRCode, 'toDataURL').resolves(qrCode);

			const preCompileResponse = await Handlebars.preCompile(data);

			assert.deepStrictEqual(preCompileResponse, response);
		});

		it('Should return the qr replaced when it is an object', async () => {

			sinon.stub(QRCode, 'toDataURL').resolves(qrCode);

			const preCompileResponse = await Handlebars.preCompile({ ...data, qr_data: qrObject });

			assert.deepStrictEqual(preCompileResponse, response);
		});

		it('Should return the qr replaced when it is an array', async () => {

			sinon.stub(QRCode, 'toDataURL').resolves(qrCode);

			const preCompileResponse = await Handlebars.preCompile({ ...data, qr_data: qrArray });

			assert.deepStrictEqual(preCompileResponse, response);
		});

		it('Should return the qr replaced when it is inside of array', async () => {

			const dataWithArray = {
				...dataBase,
				users: [
					{
						email: 'test@example.com',
						qr_data: 'https://www.google.com/test'
					},
					'example'
				]
			};

			sinon.stub(QRCode, 'toDataURL').resolves(qrCode);

			const preCompileResponse = await Handlebars.preCompile(dataWithArray);

			assert.deepStrictEqual(preCompileResponse, {
				...dataBase,
				users: [
					{
						email: 'test@example.com',
						qr_data: qrCode
					},
					'example'
				]
			});
		});

		it('Should return the qr replaced when it is inside of object', async () => {

			const dataWithObject = {
				...dataBase,
				users: {
					email: 'test@example.com',
					qr_data: 'https://www.google.com/test'
				}
			};

			sinon.stub(QRCode, 'toDataURL').resolves(qrCode);

			const preCompileResponse = await Handlebars.preCompile(dataWithObject);

			assert.deepStrictEqual(preCompileResponse, {
				...dataBase,
				users: {
					email: 'test@example.com',
					qr_data: qrCode
				}
			});
		});
	});

	context('When the document must render Barcode128 Code', () => {

		beforeEach(() => {
			sinon.restore();
		});

		const barCode128 = '123123';

		const dataBase = {
			title: 'Example',
			email: 'test@example.com'
		};

		const data = {
			...dataBase,
			barcode128_ean: barCode128
		};

		const barcode128Code = 'ivBoQR01W';

		const response = {
			...data,
			barcode128_ean: 'data:image/png;base64,' + barcode128Code
		};

		it('Should return the barcode128 replaced when it is an string', async () => {

			sinon.stub(bwipjs, 'toBuffer').resolves(barcode128Code);

			const preCompileResponse = await Handlebars.preCompile(data);

			assert.deepStrictEqual(preCompileResponse, response);
		});

		it('Should return the barcode128 replaced when it is inside of array', async () => {

			const dataWithArray = {
				...dataBase,
				users: [
					{
						email: 'test@example.com',
						barcode128_ean: 'https://www.google.com/test'
					},
					{
						email: 'test2@example.com',
						barcode128_ean: 'https://www.google.com/test2'
					}
				]
			};

			sinon.stub(bwipjs, 'toBuffer').resolves(barcode128Code);

			const preCompileResponse = await Handlebars.preCompile(dataWithArray);

			assert.deepStrictEqual(preCompileResponse, {
				...dataBase,
				users: [
					{
						email: 'test@example.com',
						barcode128_ean: 'data:image/png;base64,' + barcode128Code
					},
					{
						email: 'test2@example.com',
						barcode128_ean: 'data:image/png;base64,' + barcode128Code
					}
				]
			});
		});

		it('Should return undefined when it fails to generate the barcode (not supported characters)', async () => {

			sinon.spy(bwipjs, 'toBuffer');

			const preCompileResponse = await Handlebars.preCompile({ ...data, barcode128_ean: 'elcaimán_09090' });

			assert.deepStrictEqual(preCompileResponse, { ...response, barcode128_ean: undefined });
		});
	});
});
