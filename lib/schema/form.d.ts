/// <reference types="react" />
import { ComponentConfig } from './types'
/**
 *
 * @param {*} uiConfig:
 * {
 *  layout: {},
 *  items: [
 *    {
 *      label: 'First Name',
 *      comp: 'Input',
 *      props: {}
 *    },
 *    {
 *      type: 'submit',
 *      comp: [
 *        {
 *          type: 'submit',
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: type='primary' htmlType='submit'
 *        },
 *        {
 *          type: 'reset',
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: type='primary' htmlType='submit'
 *        }
 *      ],
 *      props: {}
 *    }
 *  ],
 *
 * }
 */
export default function ConfigForm<Schema>(props: ComponentConfig<Schema>): JSX.Element
