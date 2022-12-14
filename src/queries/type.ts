import { paths } from '../openapi'

export type pathKeys = keyof paths

export type getJSON<T extends pathKeys> =
  paths[T]['get']['responses'][200]['content']['application/json']

export type answerMatch = NonNullable<
  NonNullable<getJSON<'/answer/'>['data']>['answer']
>[0]
