import { FormalConfig, FormalState } from './types';
export default function useFormal<Schema>(initialValues: Schema, { schema, onSubmit }: FormalConfig<Schema>): FormalState<Schema>;
