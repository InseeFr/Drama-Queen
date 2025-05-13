import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { useCore } from '@/core'
import type { collectLoader } from '@/routes/routing/loader'
import { useLoaderData } from '@/routes/routing/utils'

export function Collect() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = useLoaderData() as Awaited<
    ReturnType<typeof collectLoader>
  >

  const {
    collectSurvey: { getReferentiel, changePage, changeSurveyUnitState, quit },
  } = useCore().functions

  return (
    <Orchestrator
      source={loaderData.questionnaire}
      surveyUnit={loaderData.surveyUnit}
      readonly={false}
      onQuit={quit}
      onDefinitiveQuit={quit}
      onChangePage={changePage}
      getReferentiel={getReferentiel}
      onChangeSurveyUnitState={changeSurveyUnitState}
    />
  )
}
