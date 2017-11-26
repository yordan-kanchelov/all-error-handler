# all-error-handler v0.2.0

[all-error-handler](https://github.com/jkanchelov/all-error-handler) package is  exported as a [UMD](https://github.com/umdjs/umd) module.

## Installation

In a browser:
```html
<script src="node_modules/all-error-handler/index.min.js"></script>
```

In Node.js:
```js
// Load the package.
let AllErrorHandler = require("all-error-handler");

// Initialize object and pass a callback function to it
let errorHandler = new AllErrorHandler((err) =>{
    console.log(`Error occured ${err}`);
})

//Test
throw new Error("Foo"); // Error occured Error: Foo 
//  at Object.<anonymous> ...
