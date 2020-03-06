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
function getComp(comp, components, _ctlProps, _props) {
    var ctlProps = _ctlProps;
    var props = __assign({}, _props);
    if (Array.isArray(comp)) {
        return comp.map(function (_item, index) {
            //list shoud has key
            var item = _item;
            if (!item.props)
                item.props = {};
            item.props.key = "key-" + index;
            var formal = props.formal;
            var ctlProp = getCtlProps(formal, item);
            return getComp(item.comp, components, ctlProp, __assign(__assign({}, props), item));
        });
    }
    var formal = props.formal;
    var COMP;
    //comp 可以是DatePicker.RangePicker这种
    if (typeof comp === 'string' && components[comp.split('.')[0]]) {
        COMP = components[comp.split('.')[0]];
        if (comp.split('.')[1]) {
            COMP = COMP[comp.split('.')[1]];
        }
    }
    else if (typeof comp === 'string') {
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
    if (formal.schema) {
        Object.keys(props.props).forEach(function (pop) {
            if (Object.prototype.toString.call(props.props[pop]).match('Function')) {
                var func_1 = props.props[pop];
                props.props[pop] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (Object.prototype.toString.call(args[0] && args[0].submit).match('Function')) {
                        return func_1.apply(void 0, args);
                    }
                    return func_1.apply(void 0, __spreadArrays([formal], args));
                };
            }
        });
    }
    if (!constant_1.HasValueHtmlTag(comp) && typeof props.valueTarget === 'string') {
        if (props.valueTarget === 'children') {
            props.children = ctlProps.value;
            delete ctlProps.value;
        }
        else {
            props.props[props.valueTarget] = ctlProps.value;
            delete ctlProps.value;
        }
    }
    var errorInfo = '';
    if (ctlProps.error) {
        errorInfo = ctlProps.error;
        if (!props.props.className) {
            props.props.className = 'error';
        }
        else if (!props.props.className.match('error')) {
            props.props.className += ' error';
        }
        props.props.state = 'error';
        delete ctlProps.error;
    }
    else {
        props.props.state = '';
        if (props.props.className) {
            props.props.className = props.props.className.split(' ').filter(function (cls) { return cls !== 'error'; }).join(' ');
        }
    }
    if (props.children) {
        if (typeof props.children === 'string') {
            return react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(COMP, __assign({}, ctlProps, props.props), props.children || ''),
                errorInfo && react_1.default.createElement("div", { style: props.props.tipsStyle || constant_1.TipsStyleDefault }, errorInfo));
        }
        if (Object.prototype.toString.call(props.children).match('Function')) {
            return react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(COMP, __assign({}, ctlProps, props.props), props.children(formal) || ''),
                errorInfo && react_1.default.createElement("div", { style: props.props.tipsStyle || constant_1.TipsStyleDefault }, errorInfo));
        }
        if (Array.isArray(props.children)) {
            var children = props.children, otherProps = __rest(props, ["children"]);
            if (ctlProps.onChange && props.props.onChange) {
                var tempfunc_1 = props.props.onChange;
                props.props.onChange = function (_formal, e) {
                    ctlProps.onChange && ctlProps.onChange(e);
                    tempfunc_1 && tempfunc_1(_formal, e);
                };
            }
            return react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(COMP, __assign({}, ctlProps, props.props), getComp(children, components, ctlProps, otherProps) || ''),
                errorInfo && react_1.default.createElement("div", { style: props.props.tipsStyle || constant_1.TipsStyleDefault }, errorInfo));
        }
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(COMP, __assign({}, ctlProps, props.props)),
        errorInfo && react_1.default.createElement("div", { style: props.props.tipsStyle || constant_1.TipsStyleDefault }, errorInfo));
}
/**
 * 获取控制属性
 * @param formal
 * @param item
 */
function getCtlProps(formal, item) {
    var ctlProps = {};
    if (item.type === constant_1.BUTTON_TYPE_SUBMIT) {
        ctlProps = formal.getSubmitButtonProps();
    }
    else if (item.type === constant_1.BUTTON_TYPE_RESET) {
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
function Field(props) {
    var Form = props.components.Form || {
        'Item': constant_1.DefaultItem,
    };
    var ctlProps = getCtlProps(props.formal, props);
    if (props.props && ctlProps.onChange && props.props.onChange) {
        var tempfunc_2 = props.props.onChange;
        props.props.onChange = function (formal, e) {
            ctlProps.onChange && ctlProps.onChange(e);
            tempfunc_2 && tempfunc_2(formal, e);
        };
    }
    return (react_1.default.createElement(Form.Item, __assign({ label: props.label }, props.layout), getComp(props.comp, props.components, ctlProps, props)));
}
exports.Field = Field;
/**
 * 对html tag特殊处理
 * @param param0
 */
function Tag(prop) {
    var components = prop.components, comp = prop.comp, props = __rest(prop, ["components", "comp"]);
    var formal = props.formal;
    var ctlProps = getCtlProps(formal, prop);
    var error = ctlProps.error;
    // console.log(ctlProps)
    if (error) {
        ctlProps.value = props.hasOwnProperty('alt') ? props.alt : '';
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, getComp(comp, components, ctlProps, props)));
}
exports.Tag = Tag;
