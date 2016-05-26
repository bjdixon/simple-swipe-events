#Simple Swipe Events

Detects and dispatches swipe events. The minified script is 1kB.

- swipe-left
- swipe-right
- swipe-up
- swipe-down

##Usage

Include the script on your page

```html
<script src="swiper.min.js"></script>
```

By default swipe events are registered to the document but can be unregistered from the document and registered on another dom element using the ``` setBaseElement ``` function.

```html
simpleSwipeEvents.setBaseElement(document.getElementById('aDiv'));
```

Child elements of the base element can then listen to swipe events

```js
document.getElementById('childDiv').addEventListener('swipe-right', function () {
  console.log('swipe-right triggered');
});

$('div').on('swipe-down', function () {
  console.log('swipe-down triggered');
});
```

The minimum distance to trigger a swipe event can be set using the ``` setMinimumMovement ``` function (default value is 30 pixels).

```js
// set minimum movement to 60 pixels
simpleSwipeEvents.setMinimumMovement(60);
```

