import { useState, useMemo, useCallback, useEffect } from 'react'
import isEqual from 'react-fast-compare'

import { FormalConfig, FormalState, FormalErrors } from './types'
import {
  objectIsEmpty,
  schemaHasAsyncValidation,
  formatYupErrors,
} from './utils'

export default function useFormal<Schema>(
  initialValues: Schema,
  { schema, onSubmit }: FormalConfig<Schema>
): FormalState<Schema> {
  const [lastValues, setLastValues] = useState<Schema>(initialValues)
  const [values, setValues] = useState<Schema>(initialValues)
  const [errors, setErrors] = useState<FormalErrors<Schema>>({})
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const isDirty = useMemo(() => !isEqual(lastValues, values), [
    lastValues,
    values,
  ])

  const isValid = useMemo(() => !isDirty || objectIsEmpty(errors), [
    errors,
    isDirty,
  ])

  const change = useCallback(
    (field: keyof Schema, value: any): void => {
      setValues((prevValues: Schema) => ({ ...prevValues, [field]: value }))
    },
    []
  )

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  useEffect(() => {
    setValues((prevValues: Schema) => ({ ...prevValues, ...initialValues }))
    clearErrors()
  }, [clearErrors, initialValues])

  const validate = useCallback((val) => {
    if (!schema) {
      console.log('no schema')
      return
    }
    // console.log(val)
    let checkValues = values
    if (val) {
      checkValues = { ...values, ...val }
    }
    //这里需要return，这样下面校验的时候用await才能拿到异常信息
    return new Promise(async (resolve, reject) => {
      const isAsync = schemaHasAsyncValidation<Schema>(schema, checkValues)

      try {
        const validationMethod = isAsync ? 'validate' : 'validateSync'
        clearErrors()
        if (isAsync) setIsValidating(true)
        // console.log(validationMethod, checkValues)
        await schema[validationMethod](checkValues, { abortEarly: false })
        resolve()
      } catch (error) {
        // console.log(error)
        setErrors(formatYupErrors<Schema>(error))
        reject(error)
      } finally {
        if (isAsync) setIsValidating(false)
      }
    })
  }, [schema, values, clearErrors, setErrors])

  const reset = useCallback((key?: [keyof Schema]) => {
    if (key) {
      const _values = { ...values }
      key.forEach(kk => {
        _values[kk] = lastValues[kk]
      })
      setValues(_values)
    } else {
      setValues(lastValues)
    }
    clearErrors()
  }, [clearErrors, values, lastValues])

  const submit = useCallback(async () => {
    if (schema) {
      try {
        await validate({})
      } catch (error) {
        console.log('submit validate error:', error)
        return error
      }
    }

    setIsSubmitting(true)
    const res = onSubmit ? await onSubmit(values) : ''
    if (res) {
      setLastValues(values)
    }
    setIsSubmitted(true)
    setIsSubmitting(false)
  }, [schema, validate, onSubmit, values])

  const getFieldProps = useCallback(
    (field: keyof Schema) => ({
      disabled: isSubmitting,
      value: values[field],
      error: errors[field] as string,
    }),
    [errors, isSubmitting, values]
  )

  const getResetButtonProps = useCallback(
    () => ({
      disabled:
        (!isDirty && objectIsEmpty(errors)) || isValidating || isSubmitting,
    }),
    [errors, isDirty, isSubmitting, isValidating]
  )

  const getSubmitButtonProps = useCallback(
    () => ({
      disabled:
        (!isDirty && objectIsEmpty(errors)) || isValidating || isSubmitting,
    }),
    [errors, isDirty, isSubmitting, isValidating]
  )

  return {
    isDirty,
    isValid,
    isValidating,
    isSubmitting,
    isSubmitted,
    schema,
    values,
    errors,
    change,
    setErrors,
    clearErrors,
    validate,
    reset,
    submit,
    getFieldProps,
    getResetButtonProps,
    getSubmitButtonProps,
  }
}
