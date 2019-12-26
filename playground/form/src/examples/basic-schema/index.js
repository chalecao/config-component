import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import ConfigComponent from '../../../../../lib/schema/component'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  desc: yup.string().required(),
  img: yup.string().required(),
})
const IMG = 'https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d54205637882.png'
const EmptyImg = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%2F%3E'

export default function App() {
  const [data, setData] = useState({
    firstName: 'hello world',
    lastName: 'how are you',
    desc: 'something you know',
    items: [],
    img: IMG,
  })
  useEffect(() => {
    setTimeout(() => {
      setData({
        firstName: '',
        lastName: 'fine, thank you',
        img: '',
        items: [1,2,3,4],
      })
    }, 1000)
  }, [])

  const formConfig = {
    initialValues: data,
    schema,
  }

  const onChangeWrapper = schemaKey => (component, e) => {
    const { value } = component.getFieldProps(schemaKey)
    console.log('prevalue', value)
    console.log('event', e)
  }

  return (
    <ConfigComponent
      {...formConfig}
      uiConfig={{
        items: [
          {
            comp: 'h2',
            schemaKey: 'firstName',
            alt: 'miss firstName',
            valueTarget: 'children',
            props: {
              onClick: onChangeWrapper('lastName'),
            },
          },
          {
            comp: 'p',
            schemaKey: 'lastName',
            valueTarget: 'children',
          },
          {
            comp: 'p',
            children: data.lastName,
          },
          {
            comp: 'img',
            schemaKey: 'img',
            valueTarget: 'src',
            alt: EmptyImg,
            props: {
              width: '100px',
            },
          },
          {
            label: 'desc: ',
            comp: 'p',
            children:
              'configComponent support html tag or components you defined with componentSet variable.',
            props: {},
          },
        ],
      }}
    />
  )
}