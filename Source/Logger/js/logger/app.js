define(['./js/logger/alertWriter.js', './js/logger/consoleWriter.js', './js/logger/windowWriter.js'],
    function (alertWriter, consoleWriter, windowWriter) {
        'use strict';
    
        var loggers = {};

        function registerWriter(writer) {
            loggers[writer.name()] = writer;
        }

        function log(data, name) {
            (loggers[name] || loggers.Console).log(data);
        }

        registerWriter(new alertWriter());
        registerWriter(new consoleWriter());
        registerWriter(new windowWriter());

        return {
            log: log,
            registerWriter: registerWriter
    }
});