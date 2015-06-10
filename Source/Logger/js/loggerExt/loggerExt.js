define(['js/logger/logger.js', 'js/logger/utils.js'],
    function (loggerType, utils) {
        'use strict';

        function loggerExt() {
            this.logName = 'Console';
        }

        var eventHandlers = {};

        utils.extend(loggerExt, loggerType);

        var eventHandler = function (event) {
            this.log('Event {0} called on \'{1}\''.format(event.type, event.currentTarget.nodeName));
        }

        loggerExt.prototype.monitorEvent = function (domElement, eventName, unsubscribe) {
            if (domElement) {
                var handlers = eventHandlers[domElement.uniqueId()],
                    handler = handlers ? handlers[eventName] : undefined;
                if (!handlers) {
                    handlers = eventHandlers[domElement.uniqueId()] = {};
                }
                if (!unsubscribe) {
                    if (!handler) {
                        handler = eventHandler.bind(this);
                        handlers[eventName] = handler;
                        domElement.addEventListener(eventName, handler);
                    }
                } else {
                    domElement.removeEventListener(eventName, handler);
                    handlers[eventName] = null;
                }
            }
        }

        loggerExt.prototype.monitorEventAll = function (domElement, unsubscribe, callback) {
            if (domElement) {
                for (var key in domElement) {
                    if (key.slice(0, 2) == 'on') {
                        this.monitorEvent(domElement, key.slice(2), unsubscribe, callback);
                    }
                }
            }
        }

        loggerExt.prototype.monitorFunction = function (initialFn) {
            return function () {
                log('Function {0} called with arguments: ({1})'.format(initialFn.getName(), covertArgsToString(arguments)));
                var result = initialFn.apply(this, arguments);
                log('Function {0} returned {1}'.format(initialFn.getName(), utils.covertDataToString(result)));
                return result;
            }
        }

        return loggerExt;
    });