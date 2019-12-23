import { FormalState } from '../core/types';
export interface ConfigItem<Schema> {
    type: string;
    schemaKey: keyof Schema;
    label: string;
    components: any;
    comp: string;
    alt: string;
    tipsStyle: Schema;
    layout: Schema;
    props: Schema;
    formal: FormalState<Schema>;
}
export interface FormConfig<Schema> {
    label: string;
    components: any;
    comp: string;
    tipsStyle: Schema;
    layout: Schema;
    props: ConfigItem<Schema>;
    formal: FormalState<Schema>;
}
