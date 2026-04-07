import { type GenericCore, createCore } from 'redux-clean-architecture'

import type { DataStore } from '@/core/ports/DataStore'
import type { Oidc } from '@/core/ports/Oidc'
import type { QueenApi } from '@/core/ports/QueenApi'

import { DYNAMIC_PUBLIC_URL } from './constants'
import type { LocalSyncStorage } from './ports/LocalSyncStorage'
import { getParentGetAccessToken } from './sharedAuth'
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

export const isStandAlone = DYNAMIC_PUBLIC_URL === window.location.origin

export async function bootstrapCore(
  params: ParamsOfBootstrapCore,
): Promise<{ core: Core }> {
  const { apiUrl, oidcParams } = params
  console.log('toto', DYNAMIC_PUBLIC_URL, window.location.origin)

  const getOidc = await (async () => {
    if (
      oidcParams === undefined ||
      oidcParams.issuerUri === '' ||
      !isStandAlone
    ) {
      console.log('create mock')
      const { createOidc } = await import('@/core/adapters/oidc/mock')
      return createOidc({ isUserLoggedIn: true })
    }
    console.log('create default')
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

    const parentGetAccessToken = getParentGetAccessToken()

    return createApiClient({
      apiUrl,
      getAccessToken: !isStandAlone
        ? parentGetAccessToken
          ? parentGetAccessToken
          : async () => undefined
        : async () => {
            const oidc = await getOidc()

            if (!oidc.isUserLoggedIn) {
              return undefined
            }
            return (await oidc.getTokens()).accessToken
          },
    })
  })()

  const dataStore = await (async () => {
    const { createDataStore } =
      await import('@/core/adapters/datastore/default')

    return createDataStore()
  })()

  const localSyncStorage = await (async () => {
    const { createLocalSyncStorage } =
      await import('@/core/adapters/localSyncStorage/default')

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
