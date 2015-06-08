define(['./baseWriter.js'], function (baseWriter) {
    'use strict';

    function alertWriter() {
        alertWriter.superclass.constructor.call(this);

        this.log = function (data) {
            alert(this.format(data));
        }

        var name = 'Alert';

        this.name = function () {
            return name;
        }
    }

    extend(alertWriter, baseWriter);

    return alertWriter;
});