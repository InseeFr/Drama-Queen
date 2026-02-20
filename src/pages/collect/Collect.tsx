import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { TelemetryProvider } from '@/contexts/TelemetryContext'
import { useCore } from '@/core'
import type { collectLoader } from '@/core/loader'
import { Route as CollectRoute } from '@/routes/_layout/interrogations/$interrogationId/route'

export function Collect() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = CollectRoute.useLoaderData() as Awaited<
    ReturnType<typeof collectLoader>
  >

  const {
    collectSurvey: {
      addParadata,
      getReferentiel,
      changePage,
      changeInterrogationState,
      quit,
    },
  } = useCore().functions

  return (
    <TelemetryProvider addParadata={addParadata}>
      <Orchestrator
        initialPage={loaderData.page}
        source={loaderData.questionnaire}
        interrogation={loaderData.interrogation}
        readonly={false}
        onQuit={quit}
        onDefinitiveQuit={quit}
        onChangePage={changePage}
        getReferentiel={getReferentiel}
        onChangeInterrogationState={changeInterrogationState}
      />
    </TelemetryProvider>
  )
}
