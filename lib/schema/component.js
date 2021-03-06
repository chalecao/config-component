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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var formal_web_1 = __importDefault(require("../form/formal-web"));
var field_1 = require("./field");
/**
 *
 * @param {*} uiConfig: ui config in JSON schema
 * @param {*} initialValues: init value
 * @param {*} schema: the core schema rule to verify you data
 * @param {*} componentSet: self define component set
 */
function ConfigComponent(props) {
    var uiConfig = props.uiConfig, initialValues = props.initialValues, schema = props.schema, _a = props.componentSet, componentSet = _a === void 0 ? {} : _a;
    var formal = formal_web_1.default(initialValues, {
        schema: schema,
    });
    react_1.useEffect(function () {
        if (!initialValues)
            return;
        formal.validate(initialValues);
    }, [initialValues]);
    return uiConfig.items.map(function (item) {
        return react_1.default.createElement(field_1.Tag, __assign({}, item, { components: componentSet, formal: formal }));
    });
}
exports.default = ConfigComponent;
