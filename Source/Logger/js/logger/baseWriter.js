define(['./utils.js'], function (utils) {
    'use strict';

    function baseWriter(name) {
        if (this.constructor === baseWriter) {
            throw new Error("Can't create abstract class");
        }
        if (!name) {
            throw new Error("Name can't be empty or undefined");
        } 
        this.__name = name;
    }

    baseWriter.prototype.name = function (data) {
        return this.__name;
    }

    baseWriter.prototype.writeLog = function (data) {
        throw new Error("Method not implemented");
    }

    baseWriter.prototype.log = function (data) {
        this.writeLog(this.lineFormat(utils.covertDataToString(data)));
    }

    baseWriter.prototype.lineFormat = function (data) {
        var now = new Date();
        return ">>> {0} - {1}".format(now.toLocaleTimeString(), data);
    }

    return baseWriter;
});