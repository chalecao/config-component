/// <reference types="react" />
import { ElementProps } from './types'

export declare const BUTTON_TYPE_SUBMIT = 'submit'
export declare const BUTTON_TYPE_RESET = 'reset'
export declare const BUTTON_TYPE_COMMON = 'button'
export declare const FORM_BUTTON: string[]
export declare const TipsStyleDefault: {
    'color': string;
    'fontSize': string;
    'lineHeight': string;
    'whiteSpace': string;
}
export declare const DefaultItem: (prop: ElementProps) => JSX.Element
export declare const DefaultForm: (prop: ElementProps) => JSX.Element
export declare const HasValueHtmlTag: (comp: string) => boolean
