/// <reference types="react" />
import { ConfigItem } from './types'
/**
 * 构建每个field
 * @param param field参数和配置
 */
export declare function Field<Schema>(props: ConfigItem<Schema>): JSX.Element;
/**
 * 对html tag特殊处理
 * @param param0
 */
export declare function Tag(prop: ConfigItem<any>): JSX.Element;
