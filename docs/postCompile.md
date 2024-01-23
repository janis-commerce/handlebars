
## **Post compile** 🛠️	

With this function we can `post-compile` the compiled templates that have a `#SHORTLINK[link]` pattern as a result of the [`shortLink` helper](docs/helpers.md)

**Example**
```js
const Handlebars = require("@janiscommerce/handlebars")

const compiledTemplate = 'This is a template with a link to shorten: #SHORTLINK[https://www.google.com]'

const postCompiledTemplate = await Handlebars.postCompile(compiledTemplate)

console.log(postCompiledTemplate)
```
**Result example 🤩**
```js
'This is a template with a link to shorten: https://app.janis.in/link/l/phgwly'
```

Valid values: 
* `String`

If another value is passed, it will throw an `error` ❌