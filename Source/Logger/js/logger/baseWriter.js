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

    baseWriter.prototype.writeLog = function (data) {
        throw new Error("Method not implemented");
    }

    baseWriter.prototype.log = function () {
        var result = Array.prototype.reduce.call(arguments, function (prev, cur) {
            return prev + JSON.stringify(cur) + ' ';
        }, '');
        this.writeLog(this.lineFormat(result));
    }

    baseWriter.prototype.lineFormat = function (data) {
        var now = new Date();
        return ">>> {0}:{1}:{2} - {3}".format(now.getHours(), now.getMinutes(), now.getSeconds(), data);
    }

    return baseWriter;
});