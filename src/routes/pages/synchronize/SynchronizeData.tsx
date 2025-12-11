import { useEvt } from 'evt/hooks'

import { useEffect } from 'react'

import { useCore, useCoreState } from '@/core'

import { LoadingDisplay } from './LoadingDisplay'

export function SynchronizeData() {
  const bars = useCoreState('synchronizeData', 'progressBars')
  const title = useCoreState('synchronizeData', 'stepTitle')

  const { synchronizeData } = useCore().functions

  useEffect(() => {
    synchronizeData.sync({ resetMoved: true })
  }, [synchronizeData])

  const { evtSynchronizeData } = useCore().evts

  useEvt((ctx) => {
    evtSynchronizeData.$attach(
      (data) => (data.action === 'redirect' ? [data] : null),
      ctx,
      () => {
        //window.location.href = window.location.origin
      },
    )
  }, [])

  if (bars.length === 0) {
    return null
  }

  return <LoadingDisplay progressBars={bars} syncStepTitle={title} />
}
