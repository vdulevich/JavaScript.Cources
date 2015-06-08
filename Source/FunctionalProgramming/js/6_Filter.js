(function () {
    "use strict";
    if (!Array.prototype.filterFn) {
        Array.prototype.filterFn = function (callback, initialValue) {
            if (this == null) {
                throw new Error('Execute function on undefined object');;
            }
            if (Object.prototype.toString.call(this) !== '[object Array]') {
                throw new TypeError();
            }
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }
            var result = [];
            for (var i = 0; i < this.length; i++) {
                if (callback(this[i], i, this) === true) {
                    result.push(this[i])
                }
            }
            return result;
        }
    }
})();

//Does ES5 has built-in alternative? - ES5 Array.prototype.filter() function