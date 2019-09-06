import { Schema as YupSchema } from 'yup';
import { FormalErrors } from './types';
export declare function formatYupErrors<Values>(yupError: any): FormalErrors<Values>;
export declare function objectIsEmpty(obj: object): boolean;
export declare function schemaHasAsyncValidation<Schema>(schema: YupSchema<Schema>, values: Schema): boolean;
