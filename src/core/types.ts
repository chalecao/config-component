import { Schema as YupSchema } from 'yup'

export interface FormalConfig<Schema> {
  schema?: YupSchema<Schema>
  onSubmit?: (values: Schema) => boolean
}

export type FormalErrors<Schema> = {
  [K in keyof Schema]?: Schema[K] extends object
  ? FormalErrors<Schema[K]>
  : string
}

export interface FormalTextFieldEvent {
  target: {
    value: string
  }
}

export interface FormalFieldProps {
  disabled: boolean
  value: any
  error?: string
}

export interface FormalResetButtonProps {
  disabled: boolean
}

export interface FormalSubmitButtonProps {
  disabled: boolean
}

export interface FormalState<Schema> {
  // Flags.
  isDirty: boolean
  isValid: boolean
  isValidating: boolean
  isSubmitting: boolean
  isSubmitted: boolean

  // State.
  schema?: YupSchema<Schema>,
  values: Schema
  errors: FormalErrors<Schema>

  // Callbacks.
  change: (field: keyof Schema, value: any) => void
  setErrors: (errors: FormalErrors<Schema>) => void
  clearErrors: () => void
  validate: (val: Schema) => void
  reset: () => void
  submit: () => void

  // Getters.
  getFieldProps: (field: keyof Schema) => FormalFieldProps
  getResetButtonProps: () => FormalResetButtonProps
  getSubmitButtonProps: () => FormalSubmitButtonProps
}
