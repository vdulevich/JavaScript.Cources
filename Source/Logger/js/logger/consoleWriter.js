define(['./baseWriter.js', './utils.js'], function (baseWriter, utils) {
    'use strict';

    function consoleWriter() {
        consoleWriter.superclass.constructor.call(this, 'Console');
    }

    utils.extend(consoleWriter, baseWriter);

    consoleWriter.prototype.writeLog = function (data) {
        console.log(data);
    }

    return consoleWriter;
});