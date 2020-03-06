schema form with [ant design](https://ant.design/docs/react/introduce-cn) component

---

## Event API

in uiConfig you can custom defne event handler, in the event call back, you get two or more properties, the forst one is component schema instance, the res is the params the current component passing parameters.

component schema instance has some api list below:

> ℹ️ getFieldProps<schemaKey>, return the properties in schema of the specified schemaKey, the properties contains:

- value: current value
- onChange: the origin onChange function in component schema, you can call it to set field value
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
import moment from "moment";
import { ConfigForm } from "config-component";
import "antd/dist/antd.css";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  startTime: yup.array().required(),
  useTime: yup
    .array()
    .required()
    .when("startTime", (startTime, schem) => {
      return schem
        .test("check-start", "useTime required", value => {
          return !!value;
        })
        .test("check-start", "useTime start >= startTime start", value => {
          return (
            value &&
            startTime[0].milliseconds(0).valueOf() <=
              value[0].milliseconds(0).valueOf()
          );
        })
        .test("check-end", "useTime end >= startTime end", value => {
          return (
            value &&
            startTime[1].milliseconds(0).valueOf() <=
              value[1].milliseconds(0).valueOf()
          );
        })
        .required();
    }),
  agree: yup
    .boolean()
    .required()
    .test("check-agree", "agree must checked", value => {
      return !!value;
    })
    .required()
});

const initialValues = {
  firstName: "Tony",
  lastName: "Stark",
  startTime: [moment("2019-09-01"), moment("2019-09-03")]
};

export default function App() {
  const formConfig = {
    initialValues,
    schema,
    onSubmit: values => console.log("Your values are:", values),
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
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const onChangeWrapper = schemaKey => (form, e) => {
    const { onChange, value } = form.getFieldProps(schemaKey);
    console.log("prevalue", value);
    onChange(e);
  };

  return (
    <ConfigForm
      {...formConfig}
      uiConfig={{
        layout: formItemLayout,
        items: [
          {
            label: "First Name: ",
            comp: "Input",
            schemaKey: "firstName",
            props: {}
          },
          {
            label: "Last Name: ",
            comp: "Input",
            schemaKey: "lastName",
            props: {
              onChange: onChangeWrapper("lastName")
            }
          },
          {
            label: "Start Time: ",
            comp: "DatePicker.RangePicker",
            schemaKey: "startTime",
            props: {}
          },
          {
            label: "Use Time: ",
            comp: "DatePicker.RangePicker",
            schemaKey: "useTime",
            props: {}
          },
          {
            layout: tailFormItemLayout,
            comp: [
              {
                comp: "Checkbox",
                schemaKey: "agree",
                props: {
                  color: "#999"
                }
              },
              {
                comp: "span",
                children: "同意协议",
                props: {
                  style: {
                    marginLeft: "10px",
                    color: "#999"
                  }
                }
              }
            ],
            props: {}
          },
          {
            type: "submit",
            layout: tailFormItemLayout,
            comp: [
              {
                type: "submit",
                comp: "Button",
                children: "提交",
                props: {
                  type: "primary",
                  htmlType: "submit",
                  key: "submit"
                }
              },
              {
                type: "reset",
                comp: "Button",
                children: "重置",
                props: {
                  type: "primary",
                  key: "reset",
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
