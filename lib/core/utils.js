"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatYupErrors(yupError) {
    var errors = {};
    if (typeof yupError === 'object' && yupError.hasOwnProperty('inner')) {
        for (var _i = 0, _a = yupError.inner; _i < _a.length; _i++) {
            var err = _a[_i];
            if (!errors[err.path]) {
                errors[err.path] = err.message;
            }
        }
    }
    return errors;
}
exports.formatYupErrors = formatYupErrors;
function objectIsEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
exports.objectIsEmpty = objectIsEmpty;
function schemaHasAsyncValidation(schema, values) {
    try {
        schema.validateSync(values);
    }
    catch (error) {
        if (error.message.includes('Promise'))
            return true;
    }
    return false;
}
exports.schemaHasAsyncValidation = schemaHasAsyncValidation;
