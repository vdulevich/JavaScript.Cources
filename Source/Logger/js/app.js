define(['./logger/logger.js'], function (logger) {
    'use strict';
    var logger = new logger();
    logger.initialize();
    var global = (1, eval)('this');
    global.logger = logger;
})