/// <reference types="react" />
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
export default function ConfigForm({ uiConfig, initialValues, schema, onSubmit, componentSet }: {
    uiConfig: any;
    initialValues: any;
    schema: any;
    onSubmit: any;
    componentSet?: {} | undefined;
}): JSX.Element
