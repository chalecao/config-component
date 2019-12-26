import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import ConfigComponent from '../../../../../lib/schema/component'

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
        firstName: 'haha',
        lastName: 'fine, thank you',
        img: '',
        items: [1, 2, 3, 4],
      })
    }, 1000)
  }, [])

  const onChangeWrapper = (e) => {
    console.log(e)

  }

  return (
    <ConfigComponent
      uiConfig={{
        items: [
          {
            comp: 'h2',
            children: data.firstName,
            props: {
              onClick: onChangeWrapper,
            },
          },
          {
            comp: 'div',
            children: [
              {
                comp: 'p',
                children: 'hello',
              }, {
                comp: 'p',
                children: 'world',
              },
            ],
          },
          {
            comp: 'p',
            children: data.lastName,
          },
          {
            comp: 'img',
            props: {
              width: '100px',
              src: data.img || EmptyImg,
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