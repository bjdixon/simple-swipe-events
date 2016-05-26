var simpleSwipeEvents = (function (element) {
  'use strict';
  var gestureInput = 'ontouchstart' in window ? 'touch' : 'mouse',
    baseElement = element || document,
    noMovement = true,
    buttonDown = false,
    startingX,
    startingY,
    endingX,
    endingY,
    xMovement,
    yMovement,
    minimumMovement = 30,
    previousBaseElement,
    events = {
      touch: {
        touchstart: function (e) {
          startingX = e.touches[0].pageX;
          startingY = e.touches[0].pageY;
          eventFactory(e, 'initial-touch');
        },
        touchmove: function (e) {
          noMovement = false;
          endingX = e.touches[0].pageX;
          endingY = e.touches[0].pageY;
        },
        touchend: function (e) {
          eventFactory(e, getEventType());
        },
        touchcancel: function (e) {
          noMovement = false;
        }
      },
      mouse: {
        mousedown: function (e) {
          //skip if this isn't button 0 (left mouse button)
          if (e.button) {
            return;
          }
          buttonDown = true;
          startingX = e.x;
          startingY = e.y;
          eventFactory(e, 'initial-touch');
        },
        mousemove: function (e) {
          //only do stuff if the button is down
          if (buttonDown) {
            noMovement = false;
            endingX = e.x;
            endingY = e.y;
          }
        },
        mouseup: function (e) {
          //skip if this isn't the left button
          if (e.button) {
            return;
          }
          buttonDown = false;
          eventFactory(e, getEventType());
        }
      }
    };

  handleListeners(baseElement);

  return {
    setMinimumMovement: setMinimumMovement,
    setBaseElement: handleListeners
  };

  function setMinimumMovement(distance) {
    minimumMovement = typeof distance === 'number' ? distance : minimumMovement;
  }

  function eventFactory(e, eventName) {
    var event = new CustomEvent(eventName, {
      detail: e.target,
      bubble: true
    });
    e.target.dispatchEvent(event);
  }

  function handleListeners(baseElement) {
    if (!baseElement || !baseElement.nodeName) {
      return;
    }
    for (var event in events[gestureInput]) {
      if (events[gestureInput].hasOwnProperty(event)) {
        if (previousBaseElement) {
          previousBaseElement.removeEventListener(event, events[gestureInput][event], false);
        }
        baseElement.addEventListener(event, events[gestureInput][event], false);
      }
    }
    previousBaseElement = baseElement;
  }

  function getEventType() {
    if (noMovement) {
      return;
    }
    xMovement = endingX - startingX;
    yMovement = endingY - startingY;
    //reset no movement
    noMovement = true;
    // if we've moved more than the minimum movement we care about pixels
    if (Math.max(Math.abs(xMovement), Math.abs(yMovement)) > minimumMovement) {
      // did we move more on the x or y plane?
      if (Math.abs(xMovement) > Math.abs(yMovement)) {
        if (xMovement < 0) {
          return 'swipe-left';
        }
        return 'swipe-right';
      }
      if (yMovement < 0) {
        return 'swipe-up';
      }
      return 'swipe-down';
    }
    // didn't move more than the minimum movement we care about so this was just a click
    return 'fast-click';
  }
}());

