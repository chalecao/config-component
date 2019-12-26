import React, { useContext, useState, useEffect } from 'react'
import * as yup from 'yup'
import * as AntdComponents from 'antd'
import SchemaForm from '../../../../../lib/schema/form'
import 'antd/dist/antd.css'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

const initialValues = {
  firstName: 'Tony',
  lastName: 'Stark',
}

export default function App() {
  const [data, setData] = useState({
    items: [],
  })
  useEffect(() => {
    setTimeout(() => {
      setData({
        items: [1, 2, 3, 4],
      })
    }, 1000)
  }, [])
  const formConfig = {
    initialValues,
    schema,
    onSubmit: values => alert(JSON.stringify(values, null, 2)),
    componentSet: AntdComponents,
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
    <SchemaForm
      {...formConfig}
      uiConfig={{
        layout: formItemLayout,
        items: [
          {
            label: 'First Name: ',
            comp: 'Input',
            schemaKey: 'firstName',
          },
          {
            label: 'Last Name: ',
            comp: 'Input',
            schemaKey: 'lastName',
            props: {},
          },
          {
            comp: 'List',
            props: {
              dataSource: data.items,
              grid: { gutter: 16, column: 4 },
              renderItem: (schema, data, index) => {
                return <p>{data}-{index}</p>
              },
            },
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
                },
              },
              {
                type: 'reset',
                comp: 'Button',
                children: '重置',
                props: {
                  type: 'primary',
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