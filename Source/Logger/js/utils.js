function extend(Child, Parent) {
    var F = function () { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
            ;
        });
    };
}

if (!Function.prototype.getName) {
     Function.prototype.getName = function () {
        var ret = this.toString();
        ret = ret.substr('function '.length);
        ret = ret.substr(0, ret.indexOf('('));
        return ret;
    }
}

if (!Object.prototype.uniqueId) {
    (function () {
        var id = 0;
        Object.prototype.uniqueId = function () {
            if (typeof this.__uniqueid == "undefined") {
                this.__uniqueid = ++id;
            }
            return this.__uniqueid;
        };
    })();
};

if (!Object.prototype.covertToString) {
    Object.prototype.covertToString = function () {
        if (typeof this === 'object') {
            if (JSON) {
                return JSON.stringify(this);
            }
            else {
                new String(this).toString();
            }
        } else {
            return new String(this).toString();
        }
    }
}



