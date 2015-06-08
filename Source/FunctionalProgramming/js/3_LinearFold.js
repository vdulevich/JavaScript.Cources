(function () {
    "use strict";
    if (!Array.prototype.linearFoldFn) {
        Array.prototype.linearFoldFn = function (callback, initialValue) {
            if (this == null) {
                throw new Error('Execute function on undefined object');;
            }
            if (Object.prototype.toString.call(this) !== '[object Array]') {
                throw new TypeError();
            }
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }
            if (this.length > 0) {
                var result = callback(initialValue, this[0], 0, this);
                for (var i = 1; i < this.length; i++) {
                    result = callback(result, this[i], i, this);
                }
            }
            return result;
        }
    }
})();

//Does ES5 has built-in alternative? - ES5 Array.prototype.reduce() function