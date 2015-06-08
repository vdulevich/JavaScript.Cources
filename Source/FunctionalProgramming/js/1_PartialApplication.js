var partialFn = (function () {
    "use strict";
    return function () {
        //convert argumets to array removing last argument
        var initialArgs = Array.prototype.slice.call(arguments, 0, -1),
            initialFn = arguments[arguments.length - 1];
        //check if last argument is function
        if (typeof initialFn !== 'function') {
            throw new TypeError(initialFn + ' is not a function');
        }
        //function which will execute initial function with initialArgs and argumets
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return initialFn.apply(this, initialArgs.concat(args));
        }
    }
})();

//Is there any JavaScript built-in alternative? - ES5 bind() function