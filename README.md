<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [config-component](#config-component)
  - [creative feature](#creative-feature)
- [usage](#usage)
- [online example](#online-example)
  - [example - configForm](#example---configform)
  - [example - configComponent](#example---configcomponent)
- [contributor](#contributor)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## config-component

ConfigComponent, write your page with JSON config.

### creative feature

> ✅ change your code style to face data.

> ✅ add schema mechanism to ensure you data correct and force you to care you data and handle the abnormal situation.

> ✅ support get data async, verify data when it changes.

## usage

```
npm install config-component --save
```

For common component:

```javascript
import {ConfigComponent} from 'config-component'
...
<ConfigComponent
      initialValues={...}
      schema={...}
      uiConfig={...}
      />
```

For form component:

```javascript
import {ConfigForm} from 'config-component'
...
<ConfigComponent
      initialValues={...}
      schema={...}
      uiConfig={...}
      onSubmit={()=>{...}}
      componentSet={...}
      />
```

params:

> ℹ️schema: the core data you care, ConfigComponent will verify you core data with schema，you can specify alt props in item, when error occurs, will show alt as default value

> ℹ️initialValues: init value in you comp

> ℹ️uiConfig: define your ui interface with json config, support event hooks, see example in playground file.

> ℹ️onSubmit: used only in form when submit data.

> ℹ️componentSet: support [Ant Design](https://ant.design/) or [Fusion](https://fusion.design/) or you selfdefine Components.

---

## online example

playground：https://chalecao.github.io/config-component/playground/form/storybook-static/index.html

### example - configForm

online example: https://codesandbox.io/s/config-component-form-5hnvt

### example - configComponent

online example: https://codesandbox.io/s/config-component-z7u9x

## contributor

皓眸
