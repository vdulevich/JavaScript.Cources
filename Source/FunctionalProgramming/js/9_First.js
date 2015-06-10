//#9 First(function () {
    "use strict";
    if (!Array.prototype.firstFn) {
        Array.prototype.firstFn = function (callback, initialValue) {
            if (this == null) {
                throw new Error('Execute function on undefined object');;
            }
            if (Object.prototype.toString.call(this) !== '[object Array]') {
                throw new TypeError();
            }
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }
            for (var i = 0; i < this.length; i++) {
                if (callback(this[i], 0, this)) {
                    return this[i];
                }
            }
        }
    }
})();