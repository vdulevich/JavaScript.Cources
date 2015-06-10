//#7 Average of even numbers
var averageFn = (function () {
    "use strict";
    return function (array) {
        if (Object.prototype.toString.call(array) !== '[object Array]') {
            throw new TypeError();
        }
        return array.linearFoldFn(function (prev, curr, index, array) {
            return prev + curr / array.length;
        }, 0);
    };
})();