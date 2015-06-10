define(['./baseWriter.js', './utils.js'], function (baseWriter, utils) {
    'use strict';

    function alertWriter() {
        alertWriter.superclass.constructor.call(this, 'Alert');
    }

    utils.extend(alertWriter, baseWriter);

    alertWriter.prototype.lineFormat = function (data) {
        return data;
    }

    alertWriter.prototype.writeLog = function (data) {
        alert(data);
    }

    return alertWriter;
});