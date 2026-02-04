import { createSelector, createUsecaseActions } from 'redux-clean-architecture'
import { id } from 'tsafe/id'

import type { State as RootState, Thunks } from '@/core/bootstrap'
import i18n from '@/libs/i18n'

/**
 * Cas de reprise en main d'une interrogation commencée par le web
 *
 * Le questionnaire a été commencé par l'utilisateur en ligne, mais l'enquêteur
 * souhaite prendre la main pour réinterroger les personnes.
 */
const state = (state: RootState) => state[name]
export const name = 'takeControl'

export type State = {
  // Current state of what's being synchronized
  message: string
  // Synchronization is completed
  done: boolean
  // Error if something went wrong
  error: string | null
}

export const { reducer, actions } = createUsecaseActions({
  name,
  initialState: id<State>({
    message: '',
    error: null,
    done: false,
  }),
  reducers: {
    finished: (state) => {
      state.done = true
    },
    message: (state, { payload }: { payload: string }) => {
      state.message = payload
    },
    fail: (state, { payload }: { payload: Error | string }) => {
      state.error = payload.toString()
    },
  },
})

export const thunks = {
  start:
    (params: { interrogationId: string }) =>
    async (...args) => {
      const [dispatch, , { queenApi, dataStore }] = args
      try {
        dispatch(actions.message(i18n.t('synchronize.takingControl')))
        const interrogation = await queenApi.syncInterrogation(
          params.interrogationId,
        )
        await dataStore.updateInterrogation(interrogation)
        dispatch(actions.finished())
      } catch (e) {
        dispatch(actions.fail(e as Error))
      }
    },
} satisfies Thunks

export const selectors = {
  state: createSelector(state, (state: State) => {
    return state
  }),
}
