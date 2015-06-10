define(['./alertWriter.js', './consoleWriter.js', './windowWriter.js', './utils.js'],
    function (alertWriter, consoleWriter, windowWriter, utils) {
        'use strict';

        function logger() {
            this.logName = 'Console';
        }

        var loggers = {};

        var eventHandlers = {};

        var registerWriter = function (writer) {
            loggers[writer.name()] = writer;
        }

        logger.prototype.registerWriter = registerWriter;

        logger.prototype.setWriter = function(name) {
            if (loggers[name]) {
                this.logName = name;
            }
        }

        logger.prototype.log = function (data, name) {
            (loggers[name] || loggers[this.logName]).log(data);
        }

        var oldErrorHandler = window ? window.onerror : undefined;
        var newErrorHandler = function (errorMsg, url, lineNumber) {
            this.log(errorMsg);
            if (oldErrorHandler) {
                return oldErrorHandler(errorMsg, url, lineNumber);
            }
            return false;
        }

        logger.prototype.monitorExceptions = function (unsubscribe) {
            if (!unsubscribe) {
                window.onerror = newErrorHandler.bind(this);
            } else {
                window.onerror = oldErrorHandler;
            }
        }

        var eventHandler = function (callback, event) {
            if (callback) {
                callback.apply(this, arguments);
            }
            this.log('Event {0} called on \'{1}\''.format(event.type));
        }

        logger.prototype.monitorEvent = function(domElement, eventName, unsubscribe, callback) {
            if (domElement) {
                var handlers = eventHandlers[domElement.uniqueId()],
                    handler = handlers ? handlers[eventName] : undefined;
                if (!handlers) {
                    handlers = eventHandlers[domElement.uniqueId()] = {};
                }
                if (!unsubscribe) {
                    if (!handler) {
                        handler = eventHandler.bind(this, callback);
                        handlers[eventName] = handler;
                        domElement.addEventListener(eventName, handler);
                    }
                } else {
                    domElement.removeEventListener(eventName, handler);
                    handler = null;
                }
            }
        }

        logger.prototype.monitorEventAll = function (domElement, unsubscribe, callback) {
            if (domElement) {
                for (var key in domElement) {
                    if (key.slice(0, 2) == 'on') {
                        this.monitorEvent(domElement, key.slice(2), unsubscribe, callback);
                    }
                }
            }
        }

        logger.prototype.monitorFunction = function(initialFn) {
            return function () {
                log('Function {0} called with arguments: ({1})'.format(initialFn.getName(), covertArgsToString(arguments)));
                var result = initialFn.apply(this, arguments);
                log('Function {0} returned {1}'.format(initialFn.getName(), utils.covertDataToString(result)));
                return result;
            }
        }

        logger.prototype.initialize = function () {
            registerWriter(new alertWriter());
            registerWriter(new consoleWriter());
            registerWriter(new windowWriter());
        };

        return logger;
    });