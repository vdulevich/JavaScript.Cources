define(['js/logger/logger.js', 'js/loggerExt/loggerExt.js'], function (logger, loggerExt) {
    'use strict';
    var global = (1, eval)('this');

    var logger = new logger();
    logger.initialize();

    var loggerExt = new loggerExt();
    loggerExt.initialize();

    global.logger = logger;
    global.loggerExt = loggerExt;
})