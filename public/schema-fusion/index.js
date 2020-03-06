import React, { useContext } from 'react'
import * as yup from 'yup'
import * as FusionComponents from '@alifd/next'
import { ConfigForm } from '../../src/index'

import '@alifd/next/dist/next.css'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

const initialValues = {
  firstName: 'Tony',
  lastName: 'Stark',
}

export default function App() {

  const formConfig = {
    initialValues,
    schema,
    onSubmit: values => console.log('Your values are:', values),
    componentSet: FusionComponents,
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

  return (
    <ConfigForm
      {...formConfig}
      uiConfig={{
        layout: formItemLayout,
        items: [
          {
            label: 'First Name: ',
            comp: 'Input',
            schemaKey: 'firstName',
            props: {},
          },
          {
            label: 'Last Name: ',
            comp: 'Input',
            schemaKey: 'lastName',
            props: {},
          },
          {
            type: 'submit',
            comp: [
              {
                type: 'submit',
                comp: 'Button',
                children: '提交',
                props: {
                  type: 'primary',
                  htmlType: 'submit',
                  key: 'submit',
                },
              },
              {
                type: 'reset',
                comp: 'Button',
                children: '重置',
                props: {
                  type: 'primary',
                  key: 'reset',
                  style: { marginLeft: '10px' },
                },
              },
            ],
            props: {},
          },
        ],

      }}
    />
  )
}