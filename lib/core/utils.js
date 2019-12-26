"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatYupErrors(yupError) {
    var errors = {};
    if (typeof yupError === 'object' && yupError.hasOwnProperty('inner')) {
        Object.keys(yupError.inner).forEach(function (key) {
            var err = yupError.inner[key];
            if (!errors[err.path]) {
                errors[err.path] = err.message;
            }
        });
    }
    return errors;
}
exports.formatYupErrors = formatYupErrors;
function objectIsEmpty(obj) {
    var flag = true;
    Object.keys(obj).forEach(function (key) {
        if (obj.hasOwnProperty(key)) {
            flag = false;
        }
    });
    return flag;
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
