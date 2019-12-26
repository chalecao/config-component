import { Schema as YupSchema } from 'yup'

import { FormalErrors } from './types'

export function formatYupErrors<Values>(yupError: any): FormalErrors<Values> {
  const errors: any = {} as FormalErrors<Values>
  if (typeof yupError === 'object' && yupError.hasOwnProperty('inner')) {
    Object.keys(yupError.inner).forEach(key => {
      const err = yupError.inner[key]
      if (!errors[err.path]) {
        errors[err.path] = err.message
      }
    })
  }
  return errors
}

export function objectIsEmpty(obj: object): boolean {
  let flag = true
  Object.keys(obj).forEach(key => {
    if (obj.hasOwnProperty(key)) {
      flag = false
    }
  })
  return flag
}

export function schemaHasAsyncValidation<Schema>(
  schema: YupSchema<Schema>,
  values: Schema
): boolean {
  try {
    schema.validateSync(values)
  } catch (error) {
    if (error.message.includes('Promise')) return true
  }

  return false
}
