var memorizationFn = (function () {
    "use strict";
    return function (initialFn) {
        if (typeof initialFn !== 'function') {
            throw new TypeError(initialFn + ' is not a function');
        }
        var getMemorizationFn = function (result) {
            return function () {
                if (result == undefined) {
                    result = initialFn.apply(this, arguments);
                }
                return result;
            }
        };
        return getMemorizationFn();
    };
})();