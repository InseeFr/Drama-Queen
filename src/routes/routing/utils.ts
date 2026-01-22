// utils.ts
//https://stackoverflow.com/a/74937950/18201973
import {
  type LoaderFunction,
  type LoaderFunctionArgs,
  Await as RrdAwait,
  defer,
  useLoaderData as useRrdLoaderData,
} from 'react-router-dom'

export function useLoaderData<
  TLoader extends ReturnType<typeof deferredLoader>,
>() {
  return useRrdLoaderData() as ReturnType<TLoader>['data']
}

/**
 * Allow typing when creating a loader
 *
 * The function should return an object of promises that will be Awaited in the component
 *
 * ## Exemple
 *
 * Define a loader using deferredLoader()
 *
 * ```js
 * export const interrogationLoader = deferredLoader((args) => ({
 *       questionnaireId: getQuestionnaireId(args.params.interrogationId),
 * }))
 * ```
 *
 * Then use the Await (wrap it with Suspense to display a loader)
 *
 * ```jsx
 *   <Await resolve={deferred.questionnaireId}>
 *     {questionnaireId => (
 *       <div>Interrogation Mapping id : {interrogationId} and questionnaireId :{questionnaireId}
 *     )}
 *   </Await>
 * ```
 *
 */
export function deferredLoader<TData extends Record<string, unknown>>(
  dataFunc: (args: LoaderFunctionArgs) => TData,
) {
  return (args: LoaderFunctionArgs) =>
    defer(dataFunc(args)) as Omit<ReturnType<typeof defer>, 'data'> & {
      data: TData
    }
}

export interface AwaitResolveRenderFunction<T> {
  (data: Awaited<T>): React.ReactElement
}

export interface AwaitProps<T> {
  children: React.ReactNode | AwaitResolveRenderFunction<T>
  errorElement?: React.ReactNode
  resolve: Promise<T>
}

export function Await<T>(props: AwaitProps<T>): React.JSX.Element {
  return RrdAwait(props)
}

export type LoaderData<TLoaderFn extends LoaderFunction> =
  Awaited<ReturnType<TLoaderFn>> extends Response | infer D ? D : never
