import React, { useState } from 'react'
import * as yup from 'yup'
import * as FusionComponents from '@alifd/next'
import { ConfigForm } from '../../src/index'

import '@alifd/next/dist/next.css'

const schema = yup.object().shape({
  actName: yup.string().required(),
  blackList: yup.string().required(),
})

const initialValues = {
  actName: [],
  blackList: '',
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
      componentSet={FusionComponents}
      uiConfig={{
        layout: formItemLayout,
        items: [
          {
            label: '活动名称: ',
            comp: 'Select',
            schemaKey: 'actName',
            props: {
              // placeholder: "Select users",
              // notFoundContent: fetching ? <FusionComponents.Spin size="small" /> : null,
              filterOption: false,
              showSearch: true,
              onSearch: fetchUser,
              dataSource: userData,
              onChange: onChange('actName'),
            },
          },
          {
            label: '黑名单: ',
            comp: [
              {
                comp: 'Input',
                schemaKey: 'blackList',
                props: {},
              },
              {
                comp: 'div',
                children: '此处黑名单只增不减，运营请谨慎添加!',
                props: {
                  style: {
                    color: 'red',
                    marginTop: '10px',
                    fontSize: '12px',
                  },
                },
              },
            ],
            props: {},
          },

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
        ],

      }}
    />
  )
}