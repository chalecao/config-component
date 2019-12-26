import { Schema as YupSchema } from 'yup'
import { FormalState } from '../core/types'
import { FormalWebState } from '../form/types'

export interface ConfigItem<Schema> {
  type: string,
  schemaKey: keyof Schema
  label: string,
  components: any,
  comp: string,
  alt: string,
  tipsStyle: Schema,
  layout: Schema,
  props: Schema,
  formal: FormalWebState<Schema>
}
export interface FormConfig<Schema> {
  label: string,
  components: any,
  comp: string,
  tipsStyle: Schema,
  layout: Schema,
  props: ConfigItem<Schema>,
  formal: FormalState<Schema>
}

export interface FieldProps {
  error?: string,
  value?: string
}

export interface UIConfig<Schema> {
  layout: Record<string, any>,
  tipsStyle: Schema,
  items: ConfigItem<Schema>[]
}

export interface ComponentSet {
  Form: any
}

export interface ComponentConfig<Schema> {
  uiConfig: UIConfig<Schema>,
  initialValues: Schema,
  schema: YupSchema<Schema>,
  onSubmit: (values: Record<string, any>) => boolean,
  componentSet: ComponentSet,
}