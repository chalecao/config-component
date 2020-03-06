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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.BUTTON_TYPE_SUBMIT = 'submit';
exports.BUTTON_TYPE_RESET = 'reset';
exports.BUTTON_TYPE_COMMON = 'button';
exports.FORM_BUTTON = [exports.BUTTON_TYPE_SUBMIT, exports.BUTTON_TYPE_RESET];
exports.TipsStyleDefault = {
    'color': '#f5222d',
    'fontSize': '12px',
    'lineHeight': '20px',
    'whiteSpace': 'nowrap',
};
exports.DefaultItem = function (prop) {
    var children = prop.children, props = __rest(prop, ["children"]);
    var label = props.label;
    return react_1.default.createElement("div", __assign({}, props),
        react_1.default.createElement("span", null, label),
        children);
};
exports.DefaultForm = function (prop) {
    var children = prop.children, props = __rest(prop, ["children"]);
    return react_1.default.createElement("form", __assign({}, props), children);
};
exports.HasValueHtmlTag = function (comp) {
    return (typeof comp === 'string') && ['input', 'select', 'textarea'].includes(comp && comp.toLowerCase());
};
