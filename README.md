#Simple Swipe Events

Detects and dispatches swipe events. The minified script is 1kB.

- swipe-left
- swipe-right
- swipe-up
- swipe-down

##Usage

###Importing the library

There are 2 methods to import the library:

**1. Include the script on your page**
```html
<script src="swiper.min.js"></script>
```
**2. Use with Browserify**

Install

```sh
npm install --save simple-swipe-events
```

and require

```js
const simpleSwipeEvents = require('simple-swipe-events');
```

[More information about Browserify](http://browserify.org/)

###Options

**Set the base element**

By default swipe events are registered to the document but can be unregistered from the document and registered on another dom element using the ``` setBaseElement ``` function.

```js
simpleSwipeEvents.setBaseElement(document.getElementById('aDiv'));
```

Child elements of the base element can then listen to swipe events

**Set the minimum distance**

The minimum distance to trigger a swipe event can be set using the ``` setMinimumMovement ``` function (default value is 30 pixels).

```js
// set minimum movement to 60 pixels
simpleSwipeEvents.setMinimumMovement(60);
```

###Examples

Without using any options you can listen to swipe events on any element in the document

```js
document.getElementById('aDiv').addEventListener('swipe-down', function() {
  console.log('swipe-down triggered on #aDiv');
});

// or with jQuery
$('div').on('swipe-up', function() {
  console.log('swipe-up triggered on a div element');
});
```

Setting the base element means that swipe events are available to the base element and it's child elements

```js
simpleSwipeEvents.setBaseElement(document.getElementById('aDiv'));

document.getElementById('childDiv').addEventListener('swipe-right', function () {
  console.log('swipe-right triggered');
});

$('div').on('swipe-down', function () {
  console.log('swipe-down triggered on a div that is a child of aDiv');
});
```

