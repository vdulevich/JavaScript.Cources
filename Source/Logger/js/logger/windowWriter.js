define(['./baseWriter.js', './utils.js'], function (baseWriter, utils) {
    'use strict';

    function windowWriter() {
        windowWriter.superclass.constructor.call(this, 'Window');
    };

    utils.extend(windowWriter, baseWriter);

    var logDiv;

    var getOrCreateLogDiv = function () {
        if (!logDiv && window) {
            logDiv = document.createElement('div');
            logDiv.style.cssText = 'width:100%;height:200px; overflow:auto; padding:0px; opacity:0.6;z-index:100;background:lightgray;bottom: 0px;left: 0px;';
            window.document.body.appendChild(logDiv);
        }
        return logDiv;
    }

    windowWriter.prototype.writeLog = function (data) {
        if (getOrCreateLogDiv()) {
            logDiv.innerHTML += '{0} </br>'.format(data);
            logDiv.scrollTop = logDiv.scrollHeight;
        }
    }

    return windowWriter;
});