import React, { useEffect } from 'react'
import useForm from '../form/formal-web'
import { Tag } from './field'
import { ComponentConfig } from './types'
/**
 * 
 * @param {*} uiConfig: ui config in JSON schema
 * @param {*} initialValues: init value 
 * @param {*} schema: the core schema rule to verify you data
 * @param {*} componentSet: self define component set
 */
export default function ConfigComponent<Schema>(props: ComponentConfig<Schema>) {
  const { uiConfig, initialValues, schema, componentSet = {} } = props
  const formal = useForm(initialValues, {
    schema,
  })

  useEffect(() => {
    if (!initialValues) return
    formal.validate(initialValues)
  }, [formal, initialValues])


  return uiConfig.items.map(item => {
    return <Tag {...item} components={componentSet}
      formal={formal} />
  })
}