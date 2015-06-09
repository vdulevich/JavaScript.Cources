define(['./js/logger/alertWriter.js', './js/logger/consoleWriter.js', './js/logger/windowWriter.js'],
    function (alertWriter, consoleWriter, windowWriter) {
        'use strict';
    
        var loggers = {};
        var eventHandlers = {};

        function registerWriter(writer) {
            loggers[writer.name()] = writer;
        }

        function log(data, name) {
            (loggers[name] || loggers.Console).log(data);
        }

        var oldErrorHandler = window ? window.onerror : undefined;
        var newErrorHandler = function (errorMsg, url, lineNumber) {
            log(errorMsg);
            if (oldErrorHandler) {
                return oldErrorHandler(errorMsg, url, lineNumber);
            }
            return false;
        }

        function monitorUnhandled(toggle) {
            if (toggle) {
                if (window && window.onerror !== newErrorHandler) {
                    window.onerror = newErrorHandler;
                }
            } else {
                window.onerror = oldErrorHandler;
            }
        }

        var eventHandler = function (callback, event) {
            if (callback) {
                callback.apply(this, arguments);
            }
            log('Event {0} called.'.format(event.type));
        }

        function monitorEvent(domElement, eventName, unsubscribe, callback) {
            if (domElement) {

                var handlers = eventHandlers[domElement.uniqueId()], handler = handlers ? handlers[eventName] : undefined;
                if (!handlers) {
                    handlers = eventHandlers[domElement.uniqueId()] = {};
                }
                if (!unsubscribe) {
                    if(!handler) {
                        handler = eventHandler.bind(domElement, callback);
                        handlers[eventName] = handler;
                        domElement.addEventListener(eventName, handler);
                    }
                } else {
                    domElement.removeEventListener(eventName, handler);
                    handler = null;
                }
            }
        }

        function monitorEventAll(domElement, unsubscribe, callback) {
            if (domElement) {
                for (var key in domElement) {
                    if (key.slice(0, 2) == 'on') {
                        monitorEvent(domElement, key.slice(2), unsubscribe, callback);
                    }
                }
            }
        }

        function monitorFunction(initialFn) {
            return function () {
                var argsString = Array.prototype.reduce.call(arguments, function (prev, cur) { return '{0}, {1}'.format(prev, cur.covertToString()); });
                log('Function {0} called with arguments: ({1})'.format(initialFn.getName(), argsString));
                var result = initialFn.apply(this, arguments);
                log('Function {0} returned {1}'.format(initialFn.getName(), result.covertToString()));
                return result;
            }
        }

        registerWriter(new alertWriter());
        registerWriter(new consoleWriter());
        registerWriter(new windowWriter());

        return {
            log: log,
            registerWriter: registerWriter,
            monitorFunction: monitorFunction,
            monitorUnhandled: monitorUnhandled,
            monitorEvent: monitorEvent,
            monitorEventAll: monitorEventAll
        }
    });