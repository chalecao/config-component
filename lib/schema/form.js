

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p]
        }
        return t
    }
    return __assign.apply(this, arguments)
}
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const react_1 = __importDefault(require('react'))
const formal_web_1 = __importDefault(require('../form/formal-web'))
const field_1 = require('./field')
const constant_1 = require('../common/constant')
/**
 *
 * @param {*} uiConfig:
 * {
 *  layout: {},
 *  items: [
 *    {
 *      label: 'First Name',
 *      comp: 'Input',
 *      props: {}
 *    },
 *    {
 *      type: 'submit',
 *      comp: [
 *        {
 *          type: 'submit',
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: type='primary' htmlType='submit'
 *        },
 *        {
 *          type: 'reset',
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: type='primary' htmlType='submit'
 *        }
 *      ],
 *      props: {}
 *    }
 *  ],
 *
 * }
 */
function ConfigForm(props) {
    const {uiConfig} = props; const {initialValues} = props; const {schema} = props; const {onSubmit} = props; const {componentSet} = props
    const formal = formal_web_1.default(initialValues, {
        schema,
        onSubmit,
    })
    const Form = (componentSet && componentSet.Form) || constant_1.DefaultForm
    return (react_1.default.createElement(Form, __assign({}, formal.getFormProps(), uiConfig.layout), uiConfig.items.map(function (item, i) {
        return react_1.default.createElement(field_1.Field, __assign({ key: `key-${  i}`, tipsStyle: uiConfig.tipsStyle }, item, { components: componentSet, formal }))
    })))
}
exports.default = ConfigForm
