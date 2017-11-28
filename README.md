# all-error-handler

[![Known Vulnerabilities](https://snyk.io/test/github/jkanchelov/all-error-handler/badge.svg)](https://snyk.io/test/github/jkanchelov/all-error-handler)
[![devDependencies Status](https://david-dm.org/jkanchelov/all-error-handler/dev-status.svg)](https://david-dm.org/jkanchelov/all-error-handler?type=dev) [![Build Status](https://travis-ci.org/jkanchelov/all-error-handler.svg?branch=master)](https://travis-ci.org/jkanchelov/all-error-handler)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjkanchelov%2Fall-error-handler.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjkanchelov%2Fall-error-handler?ref=badge_shield)

[АllЕrrorHandler](https://github.com/jkanchelov/all-error-handler) provides you a object, which will listen for error events and then call a provided callback function.

АllЕrrorHandler package is  exported as a [UMD](https://github.com/umdjs/umd) module.

## Installation

In a browser:
```html
<script src="node_modules/all-error-handler/index.min.js"></script>
```

In Node.js:
```js
let AllErrorHandler = require("all-error-handler");
```

## Usage
````js
// Initialize object and pass a callback function to it
let errorHandler = new AllErrorHandler((err) =>{
    console.log(`Error occured - ${err}`);
})

//Test
throw new Error("Foo"); // Error occured - Error: Foo 
//  at Object.<anonymous> ...
````

## Params
```js
new AllErrorHandler({Function}callback, {Boolean}startListening = true)
````
-- callback - pass a function which will be called after an Error is throwed.

-- startListening - if true it will start listining for the errors when the object is created. 

## Methods: 

####
#### startListening();
-- Start listening for error events 
```js
errorHandler.startListening();
````
#### stopListening();
-- Stop listening for error events
```js
errorHandler.stopListening();
````
#### dispose();
-- Call before setting the object to null to prevent memory leak 
```js
errorHandler.dispose();
errorHandler = null;
````


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjkanchelov%2Fall-error-handler.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjkanchelov%2Fall-error-handler?ref=badge_large)
