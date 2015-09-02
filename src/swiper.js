var simpleSwipeEvents = (function (element) {
    var gestureInput = ('ontouchstart' in window) ? 'touch' : 'mouse',
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
                return customEvent(e, 'initial-touch'); // can remove return and just call customEvent
            },
            touchmove: function (e) {
                noMovement = false;
                endingX = e.touches[0].pageX;
                endingY = e.touches[0].pageY;
                return 1; // can remove this statement
            },
            touchend: function (e) {
                return customEvent(e, determineEvent()); // can remove return and just call customEvent
            },
            touchcancel: function (e) {
                noMovement = false;
                return 1; // can remove this statement
            }
        },
        mouse: {
            mousedown: function (e) {
                //skip if this isn't button 0 (left mouse button)
                if (e.button) {
                    return e.button; // can just return;
                }
                buttonDown = true;
                startingX = e.x;
                startingY = e.y;
                return customEvent(e, 'initial-touch'); // can remove return and just call customEvent
            },
            mousemove: function (e) {
                //only do stuff if the button is down
                if (buttonDown) {
                    noMovement = false;
                    endingX = e.x;
                    endingY = e.y;
                    return 1; // can remove this statement
                }
            },
            mouseup: function (e) {
                //skip if this isn't the left button
                if (e.button) {
                    return e.button; // can just return;
                }
                buttonDown = false;
                return customEvent(e, determineEvent()); // can remove return and just call customEvent
            }
        }
    };

    handleListeners(baseElement);
    
    return {
        setMinimumMovement: setMinimumMovement,
        setBaseElement: handleListeners
    }
    
    function setMinimumMovement(distance) {
        minimumMovement = typeof distance === "number" ? distance : minimumMovement;
    }
    
    function customEvent(e, eventName) { // rename to eventFactory
        var event = new CustomEvent(eventName, {
            detail: e.target,
            bubble: true
        });
        e.target.dispatchEvent(event);
        event = null; // can probably remove this
        return 1; // can probably remove this
    }
    
    function handleListeners(baseElement) {
        if (baseElement == null) {
            return;
        }
        for (var event in events[gestureInput]) {
            if (previousBaseElement) {
                previousBaseElement.removeEventListener(event, events[gestureInput][event], false);
            }
            baseElement.addEventListener(event, events[gestureInput][event], false);
        }
        previousBaseElement = baseElement;
    }

    function determineEvent() {
        if (noMovement) {
            return 'fast-click'; // can just return;
        } else {
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
                    } else {
                        return 'swipe-right'; // can return without else
                    }
                } else {
                    if (yMovement < 0) {
                        return 'swipe-up';
                    } else {
                        return 'swipe-down'; // can return without else
                    }
                }
            } else {
                // didn't move more than the minimum movement we care about so this was just a click
                return 'fast-click';  // can return without else and just return;
            }
        }
    }
}());

