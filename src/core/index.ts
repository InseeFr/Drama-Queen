/*
NOTE: Only here do we export the API for a specific framework (here react).
In the rest of the core directory everything is agnostic to React
*/
import { createReactApi } from 'redux-clean-architecture/react'

import { bootstrapCore } from '@/core/bootstrap'

export const { createCoreProvider, useCore, useCoreState } = createReactApi({
  bootstrapCore,
})
