define(['./alertWriter.js', './consoleWriter.js', './windowWriter.js', './baseWriter.js', './utils.js'],
    function (alertWriter, consoleWriter, windowWriter, baseWriter, utils) {
        'use strict';

        function logger() {
            this.logName = 'Console';
        }

        var loggers = {};

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

        var registerWriter = function (writer) {
            if (!(writer instanceof baseWriter)) {
                throw new Error('Writer must inherit \'baseWriter\' class');
            }
            loggers[writer.name()] = writer;
        }

        logger.prototype.registerWriter = registerWriter;

        logger.prototype.log = function (data, name) {
            (loggers[name] || loggers[this.logName]).log(data);
        }

        logger.prototype.initialize = function () {
            registerWriter(new alertWriter());
            registerWriter(new consoleWriter());
            registerWriter(new windowWriter());
        };

        logger.prototype.setWriter = function (name) {
            if (loggers[name]) {
                this.logName = name;
            }
        }

        return logger;
    });