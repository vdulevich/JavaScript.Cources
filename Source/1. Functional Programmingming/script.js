//#1 Partial application
function partialFn() {
    var args = Array.prototype.slice.call(arguments, 0, -1),
        initialFn = arguments[arguments.length - 1];
    if (typeof initialFn !== 'function') {
        throw new TypeError(initialFn + ' is not a function');
    }
    return function() {
        return initialFn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    }
}

//#2 Curry functions
function curryFn(initialFn) {
    if (typeof initialFn !== 'function') {
        throw new TypeError(initialFn + ' is not a function');
    }
    if (initialFn.length == 0) {
        throw new Error(initialFn + ' has no explicit parameters');
    }
    var curryInternal = function (prev) {
        return function () {
            var args = prev.concat(Array.prototype.slice.call(arguments));
            if (args.length < initialFn.length) {
                return curryInternal.call(this, args);
            } else {
                return initialFn.apply(this, args);
            }
        }
    }
    return curryInternal([]);
}

//#3 Linear fold (ES5 Array.prototype.reduce)
(function () {
    "use strict";
    if (!Array.prototype.reduceFn) {
        Array.prototype.reduceFn = function (callback, initialValue) {
            if (this == null) {
                throw new Error('Execute function on undefined object'); ;
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

//#4 Linear unfold
(function () {
    "use strict";
    function tupleFn(callback, initialValue){
        if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
        }
    };
})();

//#5 Map
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


//#6 Filter
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
                if(callback(this[i], i, this)){
                    result.push(this[i])
                }
            }
            return result;
        }
    }
})();

//#7 Average of even numbers
function avgFn(array){
    if (Object.prototype.toString.call(array) !== '[object Array]') {
                throw new TypeError();
    }
    return array.reduceFn(function(prev, curr, index, array){
        return prev + curr / array.length;
    }, 0);
}

//#8 Sum of random numbers//#9 First(function () {
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
                if(callback(this[i], 0, this)){
                    return this[i];
                }
            }
        }
    }
})();