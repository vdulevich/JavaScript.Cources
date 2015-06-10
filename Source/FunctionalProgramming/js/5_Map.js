(function () {
    "use strict";
    if (!Array.prototype.mapFn) {
        Array.prototype.mapFn = function (callback, initialValue) {
            if (this == null) {
                throw new Error('Execute function on undefined object');;
            }
            if (Object.prototype.toString.call(this) !== '[object Array]') {
                throw new TypeError();
            }
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }
            var result = [this.length];
            for (var i = 0; i < this.length; i++) {
                result[i] = callback(this[i], i, this);
            }
            return result;
        }
    }
})();

//Does ES5 has built-in alternative? - ES5 Array.prototype.map function