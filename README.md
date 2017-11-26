# all-error-handler v0.1.0

The [all-error-handler](https://lodash.com/) library is  exported as a [UMD](https://github.com/umdjs/umd) module.

## Installation

In a browser:
```html
<script src="node_modules/all-error-handler.js/index.js"></script>
```

In Node.js:
```js
// Load the package.
let AllErrorHandler = require("all-error-handler");

// Initialize object and pass a callback function to it
let errorHandler = new AllErrorHandler((err) =>{
    console.log(`Error occured ${err}`);
})
