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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var formal_1 = __importDefault(require("../core/formal"));
function useFormalWeb(initialValues, config) {
    var formal = formal_1.default(initialValues, config);
    var getFormProps = react_1.useCallback(function () { return ({
        onSubmit: function (e) {
            e.preventDefault();
            return formal.submit();
        },
    }); }, [formal]);
    var getFieldProps = react_1.useCallback(function (field) { return (__assign(__assign({}, formal.getFieldProps(field)), { name: field, id: field, onChange: function (e) {
            //判断下，fusion1.x组件evt包装了一层，返回的e是数据
            if (typeof e === 'string') {
                formal.change(field, e);
            }
            else if (e && e.target && typeof e.target.value === 'string') {
                formal.change(field, e.target.value);
            }
            else if (e && e.target && typeof e.target.checked === 'boolean') {
                formal.change(field, e.target.checked);
            }
            else {
                formal.change(field, e);
            }
        } })); }, [formal]);
    var getResetButtonProps = react_1.useCallback(function () { return (__assign(__assign({}, formal.getResetButtonProps()), { type: 'button', onClick: function () {
            formal.reset();
        } })); }, [formal]);
    var getSubmitButtonProps = react_1.useCallback(function () { return (__assign(__assign({}, formal.getSubmitButtonProps()), { type: 'submit' })); }, [formal]);
    return __assign(__assign({}, formal), { getFormProps: getFormProps,
        getFieldProps: getFieldProps,
        getResetButtonProps: getResetButtonProps,
        getSubmitButtonProps: getSubmitButtonProps });
}
exports.default = useFormalWeb;
