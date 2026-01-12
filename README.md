# Drama Queen

[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Drama-Queen&metric=alert_status)](https://sonarcloud.io/dashboard?id=InseeFr_Drama-Queen)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Drama-Queen&metric=security_rating)](https://sonarcloud.io/dashboard?id=InseeFr_Drama-Queen)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Drama-Queen&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=InseeFr_Drama-Queen)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Drama-Queen&metric=coverage)](https://sonarcloud.io/dashboard?id=InseeFr_Drama-Queen)

Web application for the management of questionnaires powered by Lunatic (https://github.com/InseeFr/Lunatic).

[**Documentation de Drama-Queen**](https://inseefr.github.io/Drama-Queen/)

## Getting Started

```
pnpm install
pnpm run dev
pnpm run build
```

## Architecture explained

Drama Queen use the clean architecture to create a new feature add a new use case.

This is the minimal structure to make a useCase work. Feel free to split into multiple file if your use case becomes too big.

```ts
import { createSelector, createUsecaseActions } from 'redux-clean-architecture'
import { id } from 'tsafe/id'

import type { State as RootState, Thunks } from '@/core/bootstrap'

const state = (state: RootState) => state[name]
export const name = 'usecase-name'

export type State = {
  count: number
}

export const { reducer, actions } = createUsecaseActions({
  name,
  initialState: id<State>({
    counter: 0,
  }),
  reducers: {
    increment: (state, { payload }: { payload: number }) => {
      state.count = state.count + payload
    },
    reset: (state) => {
      state.count = 0
    },
  },
})

export const thunks = {
  setTo:
    (params: { n: number }) =>
    async (...args) => {
      const [dispatch, getState, context] = args
      dispatch(actions.reset())
      dispatch(actions.increment(n))
    },
} satisfies Thunks

export const selectors = {
  count: createSelector(state, (state: State) => state.count),
}
```
