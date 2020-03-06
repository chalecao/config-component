import React from 'react'
import useForm from '../form/formal-web'
import { Field } from './field'
import { ComponentConfig } from './types'
import { DefaultForm } from '../common/constant'

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
export default function ConfigForm<Schema>(props: ComponentConfig<Schema>) {
  const { uiConfig, initialValues, schema, onSubmit, componentSet } = props
  const formal = useForm<Schema>(initialValues, {
    schema,
    onSubmit,
  })

  const Form = DefaultForm
  return (
    <Form {...formal.getFormProps()} {...uiConfig.layout}>
      {
        uiConfig.items.map((item, i) => {
          return <Field key={`key-${i}`} tipsStyle={uiConfig.tipsStyle} {...item} components={componentSet}
            formal={formal} />
        })
      }
    </Form>
  )
}