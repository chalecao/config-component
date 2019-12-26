import React, { useState } from 'react'
import * as yup from 'yup'
import * as AntdComponents from 'antd'
import ConfigForm from '../../../../../lib/schema/form'
import 'antd/dist/antd.css'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required()
    .test('is-incorrect', 'email should be hi@kevinwolf.me', async value => {
      await sleep(0.2)
      return value === 'hi@kevinwolf.me'
    }),
})

const initialValues = {
  firstName: [],
  lastName: 'Stark',
  email: '',
}

function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000))
}

export default function App() {
  const [fetching, setFetching] = useState(false)
  const [userData, setUserData] = useState([])

  const config = {
    initialValues,
    schema,
    onSubmit: async values => {
      await sleep(0.2)
      alert(JSON.stringify(values, null, 2))
    },
  }
  // console.log('SchemaForm', SchemaForm)

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

  const fetchUser = async (form, e) => {
    // debugger;
    await sleep(0.2)
    setFetching(true)
    setUserData([])
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(body => {

        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }))
        setFetching(false)
        setUserData(data)

      })
  }
  const onChange = (schemaKey) => (form, e) => {
    const { onChange } = form.getFieldProps(schemaKey)
    onChange(e)
  }

  console.log('----', userData)

  return (
    <ConfigForm
      {...config}
      componentSet={AntdComponents}
      uiConfig={{
        layout: formItemLayout,
        items: [
          {
            label: 'First Name: ',
            comp: 'Select',
            schemaKey: 'firstName',
            children: () => userData.map(d => (
              <AntdComponents.Select.Option key={d.value}>{d.text}</AntdComponents.Select.Option>
            )),
            props: {
              placeholder: 'Select users',
              notFoundContent: fetching ? <AntdComponents.Spin size="small" /> : null,
              filterOption: false,
              showSearch: true,
              onSearch: fetchUser,
              onChange: onChange('firstName'),
            },
          },
          {
            label: 'Last Name: ',
            comp: 'Input',
            schemaKey: 'lastName',
            props: {},
          },
          {
            label: 'Email: ',
            comp: 'Input',
            schemaKey: 'email',
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