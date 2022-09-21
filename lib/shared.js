"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOwnProperty = exports.getAccurateTypeOf = exports.ParseError = exports.DecodeError = void 0;
var DecodeError = (function (_super) {
    __extends(DecodeError, _super);
    function DecodeError(expected, received) {
        var _this = _super.call(this, "Expected ".concat(expected, " but got ").concat(received)) || this;
        Object.setPrototypeOf(_this, DecodeError.prototype);
        _this.expected = expected;
        _this.received = received;
        return _this;
    }
    return DecodeError;
}(Error));
exports.DecodeError = DecodeError;
var ParseError = (function (_super) {
    __extends(ParseError, _super);
    function ParseError(input) {
        var _this = _super.call(this, "Could not parse input: ".concat(input)) || this;
        Object.setPrototypeOf(_this, ParseError.prototype);
        _this.input = input;
        return _this;
    }
    return ParseError;
}(Error));
exports.ParseError = ParseError;
function getAccurateTypeOf(value) {
    var rawType = Object.prototype.toString.call(value);
    var matches = rawType.toLowerCase().match(/(\w+)/g);
    if (!matches || matches.length < 2) {
        return typeof value;
    }
    return matches[1];
}
exports.getAccurateTypeOf = getAccurateTypeOf;
function hasOwnProperty(value, key) {
    try {
        return Object.prototype.hasOwnProperty.call(value, key);
    }
    catch (_a) {
        return false;
    }
}
exports.hasOwnProperty = hasOwnProperty;
