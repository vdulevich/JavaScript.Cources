define(function () {
    'use strict';

    function baseWriter() {
        if (this.constructor === baseWriter) {
            throw new Error("Can't create abstract class");
        }
    }

    baseWriter.prototype.name = function (data) {
        throw new Error("Method not implemented");
    }

    baseWriter.prototype.log = function (data) {
        throw new Error("Method not implemented");
    }

    baseWriter.prototype.format = function (data) {
        var now = new Date();
        return ">>> {0}:{1}:{2} - {3}".format(now.getHours(), now.getMinutes(), now.getSeconds(), data);
    }

    return baseWriter;
});