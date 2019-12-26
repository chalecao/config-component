import React from 'react'

export default (prop: any) => {
  const { children, ...props } = prop
  const { comp, ...subProps } = props
  return React.createElement(String(comp).toLowerCase(), subProps, children)

}