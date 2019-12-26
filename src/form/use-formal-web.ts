import { useCallback } from 'react'
import useFormal, { FormalConfig } from '../core/formal'

import { FormalWebState, FormalWebTextFieldEvent } from './types'

export default function useFormalWeb<Schema>(
  initialValues: Schema,
  config: FormalConfig<Schema>
): FormalWebState<Schema> {
  const formal = useFormal(initialValues, config)

  const getFormProps = useCallback(
    () => ({
      onSubmit: (e: any) => {
        e.preventDefault()
        formal.submit()
      },
    }),
    [formal]
  )

  const getFieldProps = useCallback(
    (field: keyof Schema) => ({
      ...formal.getFieldProps(field),
      name: field as string,
      id: field as string,
      onChange: (e: FormalWebTextFieldEvent) => {
        //判断下，fusion1.x组件evt包装了一层，返回的e是数据
        if (typeof e === 'string') {
          formal.change(field, e)
        } else if (e && e.target && typeof e.target.value === 'string') {
          formal.change(field, e.target.value)
        } else if (e && e.target && typeof e.target.checked === 'boolean') {
          formal.change(field, e.target.checked)
        } else {
          formal.change(field, e)
        }
      },
    }),
    [formal]
  )

  const getResetButtonProps = useCallback(
    () => ({
      ...formal.getResetButtonProps(),
      type: 'button',
      onClick: () => {
        formal.reset()
      },
    }),
    [formal]
  )

  const getSubmitButtonProps = useCallback(
    () => ({
      ...formal.getSubmitButtonProps(),
      type: 'submit',
    }),
    [formal]
  )

  return {
    ...formal,
    getFormProps,
    getFieldProps,
    getResetButtonProps,
    getSubmitButtonProps,
  }
}
