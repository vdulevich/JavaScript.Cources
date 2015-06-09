define(['./baseWriter.js'], function (baseWriter) {
    'use strict';

    function consoleWriter() {
        consoleWriter.superclass.constructor.call(this);
        this.writeLog = function (data) {
            console.log(data.toString());
        }

        var name = 'Console';

        this.name = function () {
            return name;
        }
    }

    extend(consoleWriter, baseWriter);

    return consoleWriter;
});