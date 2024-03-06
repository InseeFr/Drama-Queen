import { useCore } from 'core'
import { Orchestrator } from 'ui/components/orchestrator/Orchestrator'
import type { collectLoader } from 'ui/routing/loader'
import { useLoaderData } from 'ui/routing/utils'

export function Collect() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = useLoaderData() as Awaited<
    ReturnType<typeof collectLoader>
  >

  if (!loaderData.isQueenV2) {
    return <queen-app />
  }

  const { collectSurvey } = useCore().functions

  const getReferentiel = collectSurvey.getReferentiel

  const onChangePage = collectSurvey.onChangePage

  const onChangeSurveyUnitState = collectSurvey.onChangeSurveyUnitState

  const onQuit = collectSurvey.onQuit

  return (
    <Orchestrator
      source={loaderData.questionnaire}
      surveyUnit={loaderData.surveyUnit}
      readonly={false}
      onQuit={onQuit}
      onDefinitiveQuit={onQuit}
      onChangePage={onChangePage}
      getReferentiel={getReferentiel}
      onChangeSurveyUnitState={onChangeSurveyUnitState}
    />
  )
}
