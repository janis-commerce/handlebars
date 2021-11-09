
## **Pre compile** 👀

With this function we can `pre-compile` the templates values replacing `qr codes` and `barcode128` for `images` 

* ⚠ For replace qr codes the property needs to start with `qr_` 
* ⚠ For replace barcode128 the property needs to start with `barcode128_` 

**Example**
```js
const Handlebars = require("@janiscommerce/handlebars")

const templateValues = {
    name: "Example",
    qr_code: 'https://www.google.com/'
	barcode128_ean: '123123'
}

const templateValuesPreCompiled = await Handlebars.preCompile(templateValues)
```
**Result example 🤩**
```js
{
    name: "Example",
    qr_code: 'data:image/png;base64;ivBoQR01W'
	barcode128_ean: 'data:image/png;base64,ivBoQR01W'
}
```

Valid values: 
* `Object`

If another value is passed, it will throw an `error` ❌
