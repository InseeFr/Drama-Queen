import { type GenericCore, createCore } from 'redux-clean-architecture'

import type { DataStore } from '@/core/ports/DataStore'
import type { Oidc } from '@/core/ports/Oidc'
import type { QueenApi } from '@/core/ports/QueenApi'

import type { LocalSyncStorage } from './ports/LocalSyncStorage'
import { usecases } from './usecases'

type ParamsOfBootstrapCore = {
  apiUrl: string
  oidcParams:
    | {
        issuerUri: string
        clientId: string
      }
    | undefined
}

type Context = {
  paramsOfBootstrapCore: ParamsOfBootstrapCore
  getOidc: () => Promise<Oidc>
  queenApi: QueenApi
  dataStore: DataStore
  localSyncStorage: LocalSyncStorage
}

export type Core = GenericCore<typeof usecases, Context>

export type State = Core['types']['State']
export type Thunks = Core['types']['Thunks']
export type CreateEvt = Core['types']['CreateEvt']

export async function bootstrapCore(
  params: ParamsOfBootstrapCore,
): Promise<{ core: Core }> {
  const { apiUrl, oidcParams } = params

  const getOidc = await (async () => {
    if (oidcParams === undefined || oidcParams.issuerUri === '') {
      const { createOidc } = await import('@/core/adapters/oidc/mock')
      return createOidc({ isUserLoggedIn: true })
    }
    const { createOidc } = await import('@/core/adapters/oidc/default')

    return createOidc({
      issuerUri: oidcParams.issuerUri,
      clientId: oidcParams.clientId,
    })
  })()

  const queenApi = await (async () => {
    if (apiUrl === '') {
      // When no apiUrl is provided, we use the mock
      const { createApiClient } = await import('@/core/adapters/queenApi/mock')
      return createApiClient()
    }

    const { createApiClient } = await import('@/core/adapters/queenApi/default')

    return createApiClient({
      apiUrl,
      getAccessToken: async () => {
        const oidc = await getOidc()

        if (!oidc.isUserLoggedIn) {
          return undefined
        }
        return oidc.getTokens().accessToken
      },
    })
  })()

  const dataStore = await (async () => {
    const { createDataStore } = await import(
      '@/core/adapters/datastore/default'
    )
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
      '@/core/adapters/localSyncStorage/default'
    )

    return createLocalSyncStorage({ localStorageKey: 'QUEEN_SYNC_RESULT' })
  })()

  const context: Context = {
    paramsOfBootstrapCore: params,
    getOidc,
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
