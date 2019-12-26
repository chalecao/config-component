import React, { useContext } from "react";
// import { ThemeContext } from './theme'


export default function Field({ id, label, error, components, ...props }) {
  // let theme = useContext(ThemeContext)
  // console.log('theme', theme, props)

  let COMP = components['Input']
  let Form = components['Form']
  let tipsStyle = {
    'color': '#f5222d',
    'font-size': '12px'
  }

  return (
    <Form.Item label={label} className={error ? 'has-error' : ''}>
      <COMP type="text" {...props} />
      {error && <div style={tipsStyle}>{error}</div>}
    </Form.Item>
  );
}