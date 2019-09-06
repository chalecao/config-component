/// <reference types="react" />
import { ConfigItem, FormConfig } from './types';
/**
 * 构建每个field
 * @param param field参数和配置
 */
export declare function Field<Schema>({ label, components, comp, tipsStyle, layout, ...props }: FormConfig<Schema>): JSX.Element;
/**
 * 对html tag特殊处理
 * @param param0
 */
export declare function Tag({ label, components, comp, ...props }: ConfigItem<any>): JSX.Element;
