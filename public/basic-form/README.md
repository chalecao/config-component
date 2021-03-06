Basic ConfigForm usage, write your form with JSON config.

---

## Event API

in uiConfig you can custom defne event handler, in the event call back, you get two or more properties, the forst one is component schema instance, the res is the params the current component passing parameters.

component schema instance has some api list below:

> ℹ️ getFieldProps<schemaKey>, return the properties in schema of the specified schemaKey, the properties contains:

- value: current value
- error: current error message
- name: current name which equals schemaKey as default
- id: current id which equals schemaKey as default
- disabled: is disabled

> ℹ️ validate<data>, validate the data you specified or current schema data

> ℹ️ reset, reset to origin default value

> ℹ️ isDirty, is component data changed

> ℹ️ values, the form values, you can get value by compscm.values[schemaKey]

---

```javascript
import React, { useContext } from "react";
import * as yup from "yup";
import * as AntdComponents from "antd";
import { ConfigForm } from "config-component";
import "antd/dist/antd.css";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required()
});

const initialValues = {
  firstName: "Tony",
  lastName: "Stark"
};

export default function App() {
  const formConfig = {
    initialValues,
    schema,
    onSubmit: values => alert(JSON.stringify(values, null, 2)), // called then form submit
    componentSet: AntdComponents
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  return (
    <SchemaForm
      {...formConfig}
      uiConfig={{
        layout: formItemLayout,
        items: [
          {
            label: "First Name: ",
            comp: "Input",
            schemaKey: "firstName"
          },
          {
            label: "Last Name: ",
            comp: "Input",
            schemaKey: "lastName",
            props: {}
          },
          {
            type: "submit",
            comp: [
              // when it's an array, will render sub compponent one by one
              {
                type: "submit", // only support submit or reset
                comp: "Button",
                children: "提交",
                props: {
                  type: "primary",
                  htmlType: "submit"
                }
              },
              {
                type: "reset", // only support submit or reset
                comp: "Button",
                children: "重置",
                props: {
                  type: "primary",
                  style: { marginLeft: "10px" }
                }
              }
            ],
            props: {}
          }
        ]
      }}
    />
  );
}
```
