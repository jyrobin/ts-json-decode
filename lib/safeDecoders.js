"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = exports.compose = exports.field = exports.record = exports.astype = exports.object = exports.union = exports.maybe = exports.nullable = exports.oneOf = exports.array = exports.nil = exports.bool = exports.num = exports.str = void 0;
var shared_1 = require("./shared");
var isPlainObject = function (value) {
    if (typeof value !== "object") {
        return false;
    }
    return Object.prototype.toString.call(value) === "[object Object]";
};
var str = function (value) {
    if (typeof value !== "string") {
        throw new shared_1.DecodeError("string", (0, shared_1.getAccurateTypeOf)(value));
    }
    return value;
};
exports.str = str;
var num = function (value) {
    if (typeof value !== "number") {
        throw new shared_1.DecodeError("number", (0, shared_1.getAccurateTypeOf)(value));
    }
    return value;
};
exports.num = num;
var bool = function (value) {
    if (typeof value !== "boolean") {
        throw new shared_1.DecodeError("boolean", (0, shared_1.getAccurateTypeOf)(value));
    }
    return value;
};
exports.bool = bool;
var nil = function (value) {
    if (value !== null) {
        throw new shared_1.DecodeError("null", (0, shared_1.getAccurateTypeOf)(value));
    }
    return value;
};
exports.nil = nil;
var array = function (decoder) { return function (values) {
    if (!Array.isArray(values)) {
        throw new shared_1.DecodeError("array", (0, shared_1.getAccurateTypeOf)(values));
    }
    values.forEach(decoder);
    return values;
}; };
exports.array = array;
var oneOf = function () {
    var decoders = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        decoders[_i] = arguments[_i];
    }
    return function (value) {
        var expectations = [];
        for (var _i = 0, decoders_1 = decoders; _i < decoders_1.length; _i++) {
            var decoder = decoders_1[_i];
            try {
                decoder(value);
                return value;
            }
            catch (error) {
                if (error instanceof shared_1.DecodeError) {
                    expectations = __spreadArray(__spreadArray([], expectations, true), [error.expected], false);
                }
            }
        }
        throw new shared_1.DecodeError("one of \"".concat(expectations.join('" or "'), "\""), (0, shared_1.getAccurateTypeOf)(value));
    };
};
exports.oneOf = oneOf;
var nullable = function (decoder) {
    return (0, exports.oneOf)(exports.nil, decoder);
};
exports.nullable = nullable;
var maybe = function (decoder) {
    return (0, exports.oneOf)(function (value) {
        if (value !== undefined) {
            throw new shared_1.DecodeError("undefined", (0, shared_1.getAccurateTypeOf)(value));
        }
        return value;
    }, decoder);
};
exports.maybe = maybe;
var union = function (decoder) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    return (0, exports.compose)(decoder, function (value) {
        if (!values.includes(value)) {
            throw new shared_1.DecodeError("one of \"".concat(values.join('" or "'), "\""), value);
        }
        return value;
    });
};
exports.union = union;
var object = function (decoders) { return function (value) {
    if (!isPlainObject(value)) {
        throw new shared_1.DecodeError("object", (0, shared_1.getAccurateTypeOf)(value));
    }
    var decodedValue = __assign({}, value);
    for (var key in decoders) {
        try {
            decodedValue[key] = decoders[key](value[key]);
        }
        catch (error) {
            if (error instanceof shared_1.DecodeError) {
                throw new shared_1.DecodeError("".concat(error.expected, " at field \"").concat(key, "\""), error.received);
            }
            throw error;
        }
    }
    return decodedValue;
}; };
exports.object = object;
var astype = function (decoders) { return function (value) {
    if (!isPlainObject(value)) {
        throw new shared_1.DecodeError("object", (0, shared_1.getAccurateTypeOf)(value));
    }
    for (var key in decoders) {
        try {
            decoders[key](value[key]);
        }
        catch (error) {
            if (error instanceof shared_1.DecodeError) {
                throw new shared_1.DecodeError("".concat(error.expected, " at field \"").concat(key, "\""), error.received);
            }
            throw error;
        }
    }
    return value;
}; };
exports.astype = astype;
var record = function (decoder) { return function (value) {
    if (!isPlainObject(value)) {
        throw new shared_1.DecodeError("record", (0, shared_1.getAccurateTypeOf)(value));
    }
    var decodedValue = {};
    for (var key in value) {
        if (!(0, shared_1.hasOwnProperty)(value, key)) {
            continue;
        }
        try {
            decodedValue[key] = decoder(value[key]);
        }
        catch (error) {
            if (error instanceof shared_1.DecodeError) {
                throw new shared_1.DecodeError("".concat(error.expected, " at field \"").concat(key, "\""), error.received);
            }
            throw error;
        }
    }
    return decodedValue;
}; };
exports.record = record;
var field = function (name, decoder) { return function (value) {
    if (!(name in value)) {
        throw new shared_1.DecodeError("".concat(name, " to be an existing attribute of ").concat(JSON.stringify(value)), "undefined");
    }
    return decoder(value[name]);
}; };
exports.field = field;
var compose = function () {
    var decoders = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        decoders[_i] = arguments[_i];
    }
    return function (value) { return decoders.reduce(function (acc, reducer) { return reducer(acc); }, value); };
};
exports.compose = compose;
var map = function (f) {
    var decoders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        decoders[_i - 1] = arguments[_i];
    }
    return function (value) { return f.apply(void 0, decoders.map(function (decoder) { return decoder(value); })); };
};
exports.map = map;
