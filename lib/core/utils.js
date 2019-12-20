

Object.defineProperty(exports, '__esModule', { value: true })
function formatYupErrors(yupError) {
    const errors = {}
    if (typeof yupError === 'object' && yupError.hasOwnProperty('inner')) {
        for (let _i = 0, _a = yupError.inner; _i < _a.length; _i++) {
            const err = _a[_i]
            if (!errors[err.path]) {
                errors[err.path] = err.message
            }
        }
    }
    return errors
}
exports.formatYupErrors = formatYupErrors
function objectIsEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            return false
    }
    return true
}
exports.objectIsEmpty = objectIsEmpty
function schemaHasAsyncValidation(schema, values) {
    try {
        schema.validateSync(values)
    }
    catch (error) {
        if (error.message.includes('Promise'))
            return true
    }
    return false
}
exports.schemaHasAsyncValidation = schemaHasAsyncValidation
