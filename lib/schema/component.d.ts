/**
 *
 * @param {*} uiConfig:
 * {
 *  items: [
 *    {
 *      comp: 'Input',
 *      props: {}
 *    },
 *    {
 *      comp: [
 *        {
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: {type:'primary'}
 *        },
 *        {
 *          comp: 'Button',
 *          txt:  '提交‘
 *          props: {type:'primary'}
 *        }
 *      ],
 *      props: {}
 *    }
 *  ],
 *
 * }
 */
export default function ConfigComponent({ uiConfig, initialValues, schema, onSubmit, componentSet }: {
    uiConfig: any;
    initialValues: any;
    schema: any;
    onSubmit: any;
    componentSet?: {} | undefined;
}): any;
