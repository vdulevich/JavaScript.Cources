define(['./baseWriter.js'], function (baseWriter) {
    'use strict';

    function alertWriter() {
        alertWriter.superclass.constructor.call(this);

        this.writeLog = function (data) {
            alert(data);
        }

        var name = 'Alert';

        this.name = function () {
            return name;
        }

        this.format = function (data) {
            return data;
        }
    }

    extend(alertWriter, baseWriter);

    return alertWriter;
});