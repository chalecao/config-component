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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var constant_1 = require("../common/constant");
var html_1 = __importDefault(require("./html"));
/**
 * {
 *      type: 'submit',
 *      comp: [
 *        {
 *          type: 'submit',
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: type="primary" htmlType="submit"
 *        },
 *        {
 *          type: 'reset',
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: type="primary" htmlType="submit"
 *        }
 *      ],
 *      props: {}
 *    }
 * @param comp 支持comp是数组的情况
 * @param components 组件集合
 * @param ctlProps 控制属性
 * @param props 其他属性
 */
function getComp(comp, components, ctlProps, props) {
    if (Array.isArray(comp)) {
        return comp.map(function (item, index) {
            //list shoud has key
            if (!item.props)
                item.props = {};
            item.props.key = "key-" + index;
            var formal = props.formal;
            var ctlProps = getCtlProps(formal, item);
            return getComp(item.comp, components, ctlProps, __assign(__assign({}, props), item));
        });
    }
    else {
        var formal_1 = props.formal;
        var COMP = void 0;
        //comp 可以是DatePicker.RangePicker这种
        if (typeof comp == 'string' && components[comp.split('.')[0]]) {
            COMP = components[comp.split('.')[0]];
            if (comp.split('.')[1]) {
                COMP = COMP[comp.split('.')[1]];
            }
        }
        else if (typeof comp == 'string') {
            COMP = html_1.default;
            ctlProps.comp = comp.toLowerCase();
        }
        else if (Object.prototype.toString.call(comp).match('Function')) {
            COMP = comp;
        }
        else {
            COMP = constant_1.DefaultItem;
        }
        if (!props.props)
            props.props = {};
        Object.keys(props.props).forEach(function (pop) {
            if (Object.prototype.toString.call(props.props[pop]).match('Function')) {
                var func_1 = props.props[pop];
                props.props[pop] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (Object.prototype.toString.call(args[0] && args[0].submit).match('Function')) {
                        func_1.apply(void 0, args);
                    }
                    else {
                        func_1.apply(void 0, __spreadArrays([formal_1], args));
                    }
                };
            }
        });
        if (!constant_1.HasValueHtmlTag(comp) && typeof props.valueTarget == 'string') {
            if (props.valueTarget == 'children') {
                props.children = ctlProps.value;
                delete ctlProps.value;
            }
            else {
                props.props[props.valueTarget] = ctlProps.value;
                delete ctlProps.value;
            }
        }
        if (ctlProps.error) {
            ctlProps.title = ctlProps.error;
            delete ctlProps.error;
        }
        if (props.children) {
            if (typeof props.children == 'string') {
                return react_1.default.createElement(COMP, __assign({}, ctlProps, props.props), props.children || '');
            }
            else if (Object.prototype.toString.call(props.children).match('Function')) {
                return react_1.default.createElement(COMP, __assign({}, ctlProps, props.props), props.children() || '');
            }
        }
        else {
            return react_1.default.createElement(COMP, __assign({}, ctlProps, props.props));
        }
    }
}
/**
 * 获取控制属性
 * @param formal
 * @param item
 */
function getCtlProps(formal, item) {
    var ctlProps = {};
    if (item.type == constant_1.BUTTON_TYPE_SUBMIT) {
        ctlProps = formal.getSubmitButtonProps();
    }
    else if (item.type == constant_1.BUTTON_TYPE_RESET) {
        ctlProps = formal.getResetButtonProps();
    }
    else if (item.schemaKey) {
        ctlProps = formal.getFieldProps(item.schemaKey);
    }
    return ctlProps;
}
/**
 * 构建每个field
 * @param param field参数和配置
 */
function Field(_a) {
    var label = _a.label, components = _a.components, comp = _a.comp, tipsStyle = _a.tipsStyle, layout = _a.layout, props = __rest(_a, ["label", "components", "comp", "tipsStyle", "layout"]);
    var Form = components['Form'] || {
        "Item": constant_1.DefaultItem
    };
    var formal = props.formal;
    var error = "";
    // 兼容array comp情况
    if (Array.isArray(comp)) {
        comp.forEach(function (item) {
            var ctlProps = getCtlProps(formal, item);
            if (ctlProps.error) {
                error = ctlProps.error;
            }
        });
    }
    else {
        var ctlProps = getCtlProps(formal, props);
        error = ctlProps.error;
    }
    return (react_1.default.createElement(Form.Item, __assign({ label: label }, layout, { className: error ? 'has-error' : '' }),
        getComp(comp, components, ctlProps, props),
        error && react_1.default.createElement("div", { style: tipsStyle || constant_1.TipsStyleDefault }, error)));
}
exports.Field = Field;
/**
 * 对html tag特殊处理
 * @param param0
 */
function Tag(_a) {
    var label = _a.label, components = _a.components, comp = _a.comp, props = __rest(_a, ["label", "components", "comp"]);
    var formal = props.formal;
    var ctlProps = getCtlProps(formal, props);
    var error = ctlProps.error;
    // console.log(ctlProps)
    if (error) {
        ctlProps.value = props.hasOwnProperty('alt') ? props.alt : "";
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, getComp(comp, components, ctlProps, props)));
}
exports.Tag = Tag;
