

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
const __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod
    const result = {}
    if (mod != null) for (const k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
    result.default = mod
    return result
}
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const react_1 = __importStar(require('react'))
const formal_web_1 = __importDefault(require('../form/formal-web'))
const field_1 = require('./field')
/**
 *
 * @param {*} uiConfig: ui config in JSON schema
 * @param {*} initialValues: init value
 * @param {*} schema: the core schema rule to verify you data
 * @param {*} componentSet: self define component set
 */
function ConfigComponent(_a) {
    const {uiConfig} = _a; const {initialValues} = _a; const {schema} = _a; const _b = _a.componentSet; const componentSet = _b === void 0 ? {} : _b
    const formal = formal_web_1.default(initialValues, {
        schema,
    })
    react_1.useEffect(function () {
        if (!initialValues)
            return
        formal.validate(initialValues).catch(function (e) { return console.error(e.message) })
    }, [initialValues])
    return uiConfig.items.map(function (item) {
        return react_1.default.createElement(field_1.Tag, __assign({}, item, { components: componentSet, formal }))
    })
}
exports.default = ConfigComponent
