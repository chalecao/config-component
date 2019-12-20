import { FormalConfig } from '../core/formal'
import { FormalWebState } from './types'

export default function useFormalWeb<Schema>(initialValues: Schema, config: FormalConfig<Schema>): FormalWebState<Schema>
