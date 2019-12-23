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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_fast_compare_1 = __importDefault(require("react-fast-compare"));
var utils_1 = require("./utils");
function useFormal(initialValues, _a) {
    var _this = this;
    var schema = _a.schema, onSubmit = _a.onSubmit;
    var _b = react_1.useState(initialValues), lastValues = _b[0], setLastValues = _b[1];
    var _c = react_1.useState(initialValues), values = _c[0], setValues = _c[1];
    var _d = react_1.useState({}), errors = _d[0], setErrors = _d[1];
    react_1.useEffect(function () {
        setValues(function (prevValues) { return (__assign(__assign({}, prevValues), initialValues)); });
        clearErrors();
    }, [initialValues]);
    var _e = react_1.useState(false), isValidating = _e[0], setIsValidating = _e[1];
    var _f = react_1.useState(false), isSubmitting = _f[0], setIsSubmitting = _f[1];
    var _g = react_1.useState(false), isSubmitted = _g[0], setIsSubmitted = _g[1];
    var isDirty = react_1.useMemo(function () { return !react_fast_compare_1.default(lastValues, values); }, [
        lastValues,
        values,
    ]);
    var isValid = react_1.useMemo(function () { return !isDirty || utils_1.objectIsEmpty(errors); }, [
        errors,
        isDirty,
    ]);
    var change = react_1.useCallback(function (field, value) {
        setValues(function (prevValues) {
            var _a;
            return (__assign(__assign({}, prevValues), (_a = {}, _a[field] = value, _a)));
        });
    }, []);
    var clearErrors = react_1.useCallback(function () {
        setErrors({});
    }, []);
    var validate = react_1.useCallback(function (val) {
        if (!schema) {
            console.log('no schema');
            return;
        }
        // console.log(val)
        var checkValues = values;
        if (val) {
            checkValues = __assign(__assign({}, values), val);
        }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var isAsync, validationMethod, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isAsync = utils_1.schemaHasAsyncValidation(schema, checkValues);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        validationMethod = isAsync ? 'validate' : 'validateSync';
                        clearErrors();
                        if (isAsync)
                            setIsValidating(true);
                        // console.log(validationMethod, checkValues)
                        return [4 /*yield*/, schema[validationMethod](checkValues, { abortEarly: false })];
                    case 2:
                        // console.log(validationMethod, checkValues)
                        _a.sent();
                        resolve();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        // console.log(error)
                        setErrors(utils_1.formatYupErrors(error_1));
                        reject(error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        if (isAsync)
                            setIsValidating(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    }, [initialValues, schema, values, clearErrors, setErrors]);
    var reset = react_1.useCallback(function () {
        setValues(lastValues);
        clearErrors();
    }, [clearErrors, lastValues]);
    var submit = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!schema) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validate({})];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, error_2];
                case 4:
                    setIsSubmitting(true);
                    return [4 /*yield*/, onSubmit(values)];
                case 5:
                    _a.sent();
                    setLastValues(values);
                    setIsSubmitted(true);
                    setIsSubmitting(false);
                    return [2 /*return*/];
            }
        });
    }); }, [schema, validate, onSubmit, values]);
    var getFieldProps = react_1.useCallback(function (field) { return ({
        disabled: isSubmitting,
        value: values[field],
        error: errors[field],
    }); }, [errors, isSubmitting, values]);
    var getResetButtonProps = react_1.useCallback(function () { return ({
        disabled: (!isDirty && utils_1.objectIsEmpty(errors)) || isValidating || isSubmitting,
    }); }, [errors, isDirty, isSubmitting, isValidating]);
    var getSubmitButtonProps = react_1.useCallback(function () { return ({
        disabled: (!isDirty && utils_1.objectIsEmpty(errors)) || isValidating || isSubmitting,
    }); }, [errors, isDirty, isSubmitting, isValidating]);
    return {
        isDirty: isDirty,
        isValid: isValid,
        isValidating: isValidating,
        isSubmitting: isSubmitting,
        isSubmitted: isSubmitted,
        schema: schema,
        values: values,
        errors: errors,
        change: change,
        setErrors: setErrors,
        clearErrors: clearErrors,
        validate: validate,
        reset: reset,
        submit: submit,
        getFieldProps: getFieldProps,
        getResetButtonProps: getResetButtonProps,
        getSubmitButtonProps: getSubmitButtonProps,
    };
}
exports.default = useFormal;
