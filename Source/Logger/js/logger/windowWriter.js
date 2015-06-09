define(['./baseWriter.js'], function (baseWriter) {
    'use strict';

    function windowWriter() {
        windowWriter.superclass.constructor.call(this);

        var logDiv;

        var getOrCreateLogDiv = function () {
            if (!logDiv && window) {
                logDiv = document.createElement('div');
                logDiv.style.cssText = 'position:absolute;width:100%;height:120px;opacity:0.3;z-index:100;background:lightgray;bottom: 0px;left: 0px;';
                window.document.body.appendChild(logDiv);
            }
            return logDiv;
        }

        this.writeLog = function (data) {
            if (getOrCreateLogDiv()) {
                var logItemDiv = document.createElement('div');
                logItemDiv.innerHTML = this.format(data);
                logDiv.appendChild(logItemDiv);
            }
        }

        var name = 'Window';

        this.name = function () {
            return name;
        }
    };

    extend(windowWriter, baseWriter);

    return windowWriter;
});