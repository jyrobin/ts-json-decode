"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.int = exports.notEmpty = exports.format = exports.within = exports.max = exports.min = exports.lengthWithin = exports.maxLength = exports.minLength = void 0;
var shared_1 = require("./shared");
var minLength = function (length) { return function (value) {
    if (typeof value !== "string") {
        throw new shared_1.DecodeError("string", (0, shared_1.getAccurateTypeOf)(value));
    }
    if (value.length <= length) {
        throw new shared_1.DecodeError("string with a length greater than ".concat(length), value);
    }
    return value;
}; };
exports.minLength = minLength;
var maxLength = function (length) { return function (value) {
    if (typeof value !== "string") {
        throw new shared_1.DecodeError("string", (0, shared_1.getAccurateTypeOf)(value));
    }
    if (value.length >= length) {
        throw new shared_1.DecodeError("string with a length lesser than ".concat(length), value);
    }
    return value;
}; };
exports.maxLength = maxLength;
var lengthWithin = function (minLength, maxLength) { return function (value) {
    if (typeof value !== "string") {
        throw new shared_1.DecodeError("string", (0, shared_1.getAccurateTypeOf)(value));
    }
    if (value.length <= minLength || value.length >= maxLength) {
        throw new shared_1.DecodeError("string of length within ".concat(minLength, " and ").concat(maxLength), value);
    }
    return value;
}; };
exports.lengthWithin = lengthWithin;
var min = function (minValue) { return function (value) {
    if (typeof value !== "number") {
        throw new shared_1.DecodeError("number", (0, shared_1.getAccurateTypeOf)(value));
    }
    if (value <= minValue) {
        throw new shared_1.DecodeError("number strictly greater than ".concat(minValue), value.toString());
    }
    return value;
}; };
exports.min = min;
var max = function (maxValue) { return function (value) {
    if (typeof value !== "number") {
        throw new shared_1.DecodeError("number", (0, shared_1.getAccurateTypeOf)(value));
    }
    if (value >= maxValue) {
        throw new shared_1.DecodeError("number strictly lesser than ".concat(maxValue), value.toString());
    }
    return value;
}; };
exports.max = max;
var within = function (minValue, maxValue) { return function (value) {
    if (typeof value !== "number") {
        throw new shared_1.DecodeError("number", (0, shared_1.getAccurateTypeOf)(value));
    }
    if (value <= minValue || value >= maxValue) {
        throw new shared_1.DecodeError("number strictly greater than ".concat(minValue, " and strictly lesser than ").concat(maxValue), value.toString());
    }
    return value;
}; };
exports.within = within;
var format = function (pattern) { return function (value) {
    if (typeof value !== "string" || !pattern.test(value)) {
        throw new shared_1.DecodeError("string matching ".concat(pattern), value);
    }
    return value;
}; };
exports.format = format;
var notEmpty = function (value) {
    if (typeof value !== "string") {
        throw new shared_1.DecodeError("string", (0, shared_1.getAccurateTypeOf)(value));
    }
    if (value.length === 0) {
        throw new shared_1.DecodeError("non empty string", value);
    }
    return value;
};
exports.notEmpty = notEmpty;
var int = function (value) {
    if (typeof value !== "number") {
        throw new shared_1.DecodeError("number", (0, shared_1.getAccurateTypeOf)(value));
    }
    if (!isFinite(value) || Math.floor(value) !== value) {
        throw new shared_1.DecodeError("integer", value.toString());
    }
    return value;
};
exports.int = int;
