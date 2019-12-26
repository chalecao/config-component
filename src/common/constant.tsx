import React from 'react'
import { ElementProps } from './types'

export const BUTTON_TYPE_SUBMIT = 'submit'
export const BUTTON_TYPE_RESET = 'reset'
export const BUTTON_TYPE_COMMON = 'button'
export const FORM_BUTTON = [BUTTON_TYPE_SUBMIT, BUTTON_TYPE_RESET]


export const TipsStyleDefault = {
  'color': '#f5222d',
  'fontSize': '12px',
  'lineHeight': '20px',
  'whiteSpace': 'nowrap',
}

export const DefaultItem = (prop: ElementProps) => {
  const { children, ...props } = prop
  const { label } = props
  return <div {...props}><span>{label}</span>{children}</div>
}


export const DefaultForm = (prop: ElementProps) => {
  const { children, ...props } = prop
  return <form {...props}>{children}</form>
}


export const HasValueHtmlTag = (comp: string) => {
  return (typeof comp === 'string') && ['input', 'select', 'textarea'].includes(comp && comp.toLowerCase())
}