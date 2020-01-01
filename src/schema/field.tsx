import React from 'react'
import { BUTTON_TYPE_SUBMIT, BUTTON_TYPE_RESET, DefaultItem, HasValueHtmlTag, TipsStyleDefault } from '../common/constant'
import HtmlTag from './html'
import { FormalState } from '../core/types'
import { ConfigItem, FieldProps, FormalWebTextFieldEvent } from './types'
/**
 * { 
 *      type: 'submit',
 *      comp: [
 *        {
 *          type: 'submit',
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: type="primary" htmlType="submit"
 *        },
 *        {
 *          type: 'reset',
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: type="primary" htmlType="submit"
 *        }
 *      ],
 *      props: {}
 *    }
 * @param comp 支持comp是数组的情况
 * @param components 组件集合
 * @param ctlProps 控制属性
 * @param props 其他属性
 */
function getComp<Schema>(comp: any, components: any, _ctlProps: any, _props: any): any {
  const ctlProps = _ctlProps
  const props = { ..._props }
  if (Array.isArray(comp)) {
    return comp.map((_item, index) => {
      //list shoud has key
      const item = _item
      if (!item.props) item.props = {}
      item.props.key = `key-${index}`
      const { formal } = props
      const ctlProp = getCtlProps(formal, item)
      return getComp(item.comp, components, ctlProp, { ...props, ...item })
    })
  }
  const { formal } = props

  let COMP
  //comp 可以是DatePicker.RangePicker这种
  if (typeof comp === 'string' && components[comp.split('.')[0]]) {
    COMP = components[comp.split('.')[0]]
    if (comp.split('.')[1]) {
      COMP = COMP[comp.split('.')[1]]
    }
  } else if (typeof comp === 'string') {
    COMP = HtmlTag
    ctlProps.comp = comp.toLowerCase()
  } else if (Object.prototype.toString.call(comp).match('Function')) {
    COMP = comp
  } else {
    COMP = DefaultItem
  }

  if (!props.props) props.props = {}
  if (formal.schema) {
    Object.keys(props.props).forEach(pop => {
      if (Object.prototype.toString.call(props.props[pop]).match('Function')) {
        const func = props.props[pop]
        props.props[pop] = (...args: any[]) => {
          if (Object.prototype.toString.call(args[0] && args[0].submit).match('Function')) {
            return func(...args)
          }
          return func(formal, ...args)

        }
      }
    })
  }

  if (!HasValueHtmlTag(comp) && typeof props.valueTarget === 'string') {
    if (props.valueTarget === 'children') {
      props.children = ctlProps.value
      delete ctlProps.value
    } else {
      props.props[props.valueTarget] = ctlProps.value
      delete ctlProps.value
    }
  }

  let errorInfo = ''
  if (ctlProps.error) {
    errorInfo = ctlProps.error
    if (!props.props.className) {
      props.props.className = 'error'
    } else if (!props.props.className.match('error')) {
      props.props.className += ' error'
    }
    props.props.state = 'error'
    delete ctlProps.error
  } else {
    props.props.state = ''
    if (props.props.className) {
      props.props.className = props.props.className.split(' ').filter((cls: string) => cls !== 'error').join(' ')
    }
  }

  if (props.children) {
    if (typeof props.children === 'string') {
      return <>
        <COMP {...ctlProps} {...props.props} >{props.children || ''}</COMP>
        {errorInfo && <div style={props.props.tipsStyle || TipsStyleDefault}>{errorInfo}</div>}
      </>
    }
    if (Object.prototype.toString.call(props.children).match('Function')) {
      return <>
        <COMP {...ctlProps} {...props.props} >{props.children(formal) || ''}</COMP>
        {errorInfo && <div style={props.props.tipsStyle || TipsStyleDefault}>{errorInfo}</div>}
      </>
    }
    if (Array.isArray(props.children)) {
      const { children, ...otherProps } = props
      if (ctlProps.onChange && props.props.onChange) {
        const tempfunc = props.props.onChange
        props.props.onChange = (_formal: any, e: FormalWebTextFieldEvent) => {
          ctlProps.onChange && ctlProps.onChange(e)
          tempfunc && tempfunc(_formal, e)
        }
      }
      return <>
        <COMP {...ctlProps} {...props.props} >{getComp(children, components, ctlProps, otherProps) || ''}</COMP>
        {errorInfo && <div style={props.props.tipsStyle || TipsStyleDefault}>{errorInfo}</div>}
      </>
    }
    return <></>
  }
  return <>
    <COMP {...ctlProps} {...props.props} />
    {errorInfo && <div style={props.props.tipsStyle || TipsStyleDefault}>{errorInfo}</div>}
  </>


}

/**
 * 获取控制属性
 * @param formal 
 * @param item 
 */
function getCtlProps<Schema>(formal: FormalState<Schema>, item: ConfigItem<Schema>): FieldProps {
  let ctlProps = {}
  if (item.type === BUTTON_TYPE_SUBMIT) {
    ctlProps = formal.getSubmitButtonProps()
  } else if (item.type === BUTTON_TYPE_RESET) {
    ctlProps = formal.getResetButtonProps()
  } else if (item.schemaKey) {
    ctlProps = formal.getFieldProps(item.schemaKey)
  }
  return ctlProps
}



/**
 * 构建每个field
 * @param param field参数和配置
 */
export function Field<Schema>(props: ConfigItem<Schema>) {

  const Form = props.components.Form || {
    'Item': DefaultItem,
  }
  const ctlProps = getCtlProps(props.formal, props)
  if (ctlProps.onChange && props.props.onChange) {
    const tempfunc = props.props.onChange
    props.props.onChange = (formal: any, e: FormalWebTextFieldEvent) => {
      ctlProps.onChange && ctlProps.onChange(e)
      tempfunc && tempfunc(formal, e)
    }
  }
  return (
    <Form.Item label={props.label} {...props.layout} >
      {getComp(props.comp, props.components, ctlProps, props)}
    </Form.Item>
  )
}

/**
 * 对html tag特殊处理
 * @param param0
 */
export function Tag(prop: ConfigItem<any>) {
  const { components, comp, ...props } = prop
  const { formal } = props
  const ctlProps = getCtlProps(formal, prop)
  const { error } = ctlProps
  // console.log(ctlProps)
  if (error) {
    ctlProps.value = props.hasOwnProperty('alt') ? props.alt : ''
  }
  return (
    <>
      {getComp(comp, components, ctlProps, props)}
    </>
  )
}