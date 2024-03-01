import { Stack, Typography } from '@mui/material'
import { useCore } from 'core'
import type { SurveyUnit } from 'core/model'
import { Orchestrator } from 'ui/components/orchestrator/Orchestrator'
import type { collectLoader } from 'ui/routing/loader'
import { useLoaderData } from 'ui/routing/utils'
import { Error } from 'ui/components/Error/Error'

export function Collect() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = useLoaderData() as Awaited<
    ReturnType<typeof collectLoader>
  >

  if (loaderData.isError) {
    return <Error message={loaderData.errorMessage} />
  }

  if (!loaderData.isQueenV2) {
    return <queen-app />
  }

  const { collectSurvey } = useCore().functions

  const getReferentiel = collectSurvey.getReferentiel

  const onChangePage = (surveyUnit: SurveyUnit) => {
    collectSurvey.onChangePage(surveyUnit)
    return
  }

  const quit = (surveyUnit: SurveyUnit) => {
    onChangePage(surveyUnit)
  }

  return (
    <Orchestrator
      source={loaderData.questionnaire}
      surveyUnit={loaderData.surveyUnit}
      readonly={false}
      quit={quit}
      definitiveQuit={quit}
      save={onChangePage}
      getReferentiel={getReferentiel}
    />
  )
}
