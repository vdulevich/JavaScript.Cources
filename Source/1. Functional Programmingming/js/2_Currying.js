var curryFn = (function () {
    "use strict";
    return function (initialFn) {
        if (typeof initialFn !== 'function') {
            throw new TypeError(initialFn + ' is not a function');
        }
        if (initialFn.length == 0) {
            throw new Error(initialFn + ' has no explicit parameters');
        }
        //function with argument 'prevArgs' which contains previos function arguments
        var curryInternalFn = function (prevArgs) {
            //function with logic to control curry recursion process
            return function () {
                var args = prevArgs.concat(Array.prototype.slice.call(arguments));
                if (args.length < initialFn.length) {
                    return curryInternalFn.call(this, args);
                } else {
                    return initialFn.apply(this, args);
                }
            }
        }
        //return function with 'prevArgs = []' which will begin currying
        return curryInternalFn([]);
    }
})();

//How is it differ from Partial Application? - Currying is converting a function of n arguments into n functions with a single argument each. 