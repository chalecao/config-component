Basic ConfigComponent usage, write your page with JSON config.

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

---

```javascript
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { ConfigComponent } from "config-component";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  desc: yup.string().required(),
  img: yup.string().required()
});
const IMG =
  "https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d54205637882.png";
const EmptyImg =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%2F%3E";

export default function App() {
  const [data, setData] = useState({
    firstName: "hello world",
    lastName: "how are you",
    desc: "something you know",
    img: IMG
  });

  // maybe you need set data async
  useEffect(() => {
    setTimeout(() => {
      setData({
        firstName: "",
        lastName: "fine, thank you",
        img: ""
      });
    }, 1000);
  }, []);

  const formConfig = {
    initialValues: data,
    schema
  };

  const onChangeWrapper = schemaKey => (compscm, ...e) => {
    const { value } = compscm.getFieldProps(schemaKey); // see Event API above
    alert("prevalue", value);
    alert("event", e);
  };

  return (
    <ConfigComponent
      {...formConfig}
      uiConfig={{
        items: [
          {
            comp: "h2", // component tag name, support basic html tag or self-define tag
            schemaKey: "firstName", // schemaKey corresponding to the key you defined in schema
            alt: "miss firstName", // when the schemaKey corresponding data validate error, alt shows
            valueTarget: "children", // specify the props get the value of current schemaKey
            props: {
              onClick: onChangeWrapper("lastName") // self define event and its handler
            }
          },
          {
            comp: "p",
            schemaKey: "lastName",
            valueTarget: "children"
          },
          {
            comp: "img",
            schemaKey: "img",
            valueTarget: "src",
            alt: EmptyImg,
            props: {
              // define the props of the element
              width: "100px"
            }
          },
          {
            label: "desc: ",
            comp: "p",
            children:
              "configComponent support html tag or components you defined with componentSet variable.", // you can also just specify the value of the element
            props: {
              style: {
                color: "red"
              }
            }
          }
        ]
      }}
    />
  );
}
```
