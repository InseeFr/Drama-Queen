import { usecases } from './usecases'
import { createCore, type GenericCore } from 'redux-clean-architecture'
import type { Oidc } from 'core/ports/Oidc'
import type { DataStore } from 'core/ports/DataStore'
import type { QueenApi } from 'core/ports/QueenApi'
import type { LocalSyncStorage } from './ports/LocalSyncStorage'

type ParamsOfBootstrapCore = {
  apiUrl: string
  publicUrl: string
  oidcParams:
    | {
        issuerUri: string
        clientId: string
      }
    | undefined
}

type Context = {
  paramsOfBootstrapCore: ParamsOfBootstrapCore
  oidc: Oidc
  queenApi: QueenApi
  dataStore: DataStore
  localSyncStorage: LocalSyncStorage
}

export type Core = GenericCore<typeof usecases, Context>

export type State = Core['types']['State']
export type Thunks = Core['types']['Thunks']
export type CreateEvt = Core['types']['CreateEvt']

export async function bootstrapCore(
  params: ParamsOfBootstrapCore
): Promise<{ core: Core }> {
  const { apiUrl, publicUrl, oidcParams } = params

  const oidc = await (async () => {
    if (oidcParams === undefined || oidcParams.issuerUri === '') {
      const { createOidc } = await import('core/adapters/oidc/mock')
      return createOidc({ isUserLoggedIn: true })
    }
    const { createOidc } = await import('core/adapters/oidc/default')
    return createOidc({
      issuerUri: oidcParams.issuerUri,
      clientId: oidcParams.clientId,
      publicUrl: publicUrl,
    })
  })()

  const queenApi = await (async () => {
    if (apiUrl === '') {
      // When no apiUrl is provided, we use the mock
      const { createApiClient } = await import('core/adapters/queenApi/mock')
      return createApiClient()
    }

    const { createApiClient } = await import('core/adapters/queenApi/default')

    return createApiClient({
      apiUrl,
      getAccessToken: () => {
        if (oidc === undefined) {
          return undefined
        }

        if (!oidc.isUserLoggedIn) {
          return undefined
        }
        return oidc.getTokens().accessToken
      },
    })
  })()

  const dataStore = await (async () => {
    const { createDataStore } = await import('core/adapters/datastore/default')
    /**
     * TODO : replace schema (There are impact on legacy queens)
    schema: {
        paradata: "idSU",
        surveyUnit: "id",
      }
    version: 3,
    */
    return createDataStore({
      name: 'Queen',
      schema: {
        paradata: '++id,idSU,events',
        surveyUnit: 'id,data,stateData,personalization,comment,questionnaireId',
      },
      version: 2,
    })
  })()

  const localSyncStorage = await (async () => {
    const { createLocalSyncStorage } = await import(
      'core/adapters/localSyncStorage/default'
    )

    return createLocalSyncStorage({ localStorageKey: 'QUEEN_SYNC_RESULT' })
  })()

  const context: Context = {
    paramsOfBootstrapCore: params,
    oidc,
    queenApi,
    dataStore,
    localSyncStorage,
  }

  const { core } = createCore({
    context,
    usecases,
  })

  return { core }
}
