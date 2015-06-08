function tuple(state, value) {
    this.state = state;
    this.value = value;
};

var linearUnfoldFn = (function () {
    "use strict";
    return function (callback, initialState) {
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        var result = [];
        while (true) {
            var tuple = callback.call(this, initialState);
            if (tuple === false) {
                return result;
            } else {
                initialState = tuple.state;
                result.push(tuple.value)
            }
        }
    };
})();