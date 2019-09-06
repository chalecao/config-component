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
 * @param {*} uiConfig:
 * {
 *  items: [
 *    {
 *      comp: 'Input',
 *      props: {}
 *    },
 *    {
 *      comp: [
 *        {
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: {type:'primary'}
 *        },
 *        {
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: {type:'primary'}
 *        }
 *      ],
 *      props: {}
 *    }
 *  ],
 *
 * }
 */
function ConfigComponent(_a) {
    var uiConfig = _a.uiConfig, initialValues = _a.initialValues, schema = _a.schema, onSubmit = _a.onSubmit, _b = _a.componentSet, componentSet = _b === void 0 ? {} : _b;
    var formal = formal_web_1.default(initialValues, {
        schema: schema,
        onSubmit: onSubmit
    });
    if (schema) {
        react_1.useEffect(function () {
            formal.validate().catch(function (e) { return console.error(e.message); });
        }, [initialValues]);
    }
    return uiConfig.items.map(function (item) {
        return react_1.default.createElement(field_1.Tag, __assign({}, item, { components: componentSet, formal: formal }));
    });
}
exports.default = ConfigComponent;
