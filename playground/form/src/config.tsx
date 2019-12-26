/* eslint-disable @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require */
import React from 'react'
import {
  configure,
  storiesOf,
  addParameters,
  addDecorator,
} from '@storybook/react'
import { addReadme } from 'storybook-readme'
import centered from '@storybook/addon-centered/react'

import { Theme } from './components/theme'
import stories from './stories'

addParameters({
  options: {
    enableShortcuts: false,
    showPanel: true,
  },
})

addDecorator(addReadme)
addDecorator(centered)

addDecorator(storyFn => <Theme>{storyFn()}</Theme>)

configure(() => {
  stories.forEach(({ section, title, path }) => {
    const sidebar = require(`./examples/${path}/README.md`)
    const Component = require(`./examples/${path}/index`).default

    storiesOf(section, module)
      .addParameters({
        readme: {
          sidebar,
        },
      })
      .add(title, () => <Component />)
  })
}, module)
