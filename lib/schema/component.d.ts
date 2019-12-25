/// <reference types="react" />
import { ComponentConfig } from './types'
/**
 *
 * @param {*} uiConfig: ui config in JSON schema
 * @param {*} initialValues: init value
 * @param {*} schema: the core schema rule to verify you data
 * @param {*} componentSet: self define component set
 */
export default function ConfigComponent<Schema>(props: ComponentConfig<Schema>): JSX.Element[]
