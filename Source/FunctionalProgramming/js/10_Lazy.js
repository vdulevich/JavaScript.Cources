//#10 Lazy
var lazyFn = (function () {
    "use strict";
    return function (initialFn) {
        if (typeof initialFn !== 'function') {
            throw new TypeError(initialFn + ' is not a function');
        }
        var getLazyFn = function (args, result) {
            return function () {
                var compareArgsFn = function (curArg, index, array) { return curArg === args[index]; }
                //Check if arguments changed, if so reset result to get new function result
                if (arguments.length != args.length ||
                    !Array.prototype.every.call(arguments, compareArgsFn)) {
                    result = undefined;
                }
                //If there is no result call function to get it
                if (result == undefined) {
                    result = initialFn.apply(this, arguments);
                    args = arguments;
                }
                return result;
            }
        };
        return getLazyFn([]);
    };
})();