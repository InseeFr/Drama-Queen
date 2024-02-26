import { useCore } from 'core'
import { useParams } from 'react-router-dom'
import { assert } from 'tsafe'
import type { collectLoader } from 'ui/routing/loader'
import { useLoaderData } from 'ui/routing/utils'

export function Collect() {
  const { questionnaireId, surveyUnitId } = useParams<{
    surveyUnitId: string
    questionnaireId: string
  }>()
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = useLoaderData() as Awaited<
    ReturnType<typeof collectLoader>
  >

  if (!loaderData.isQueenV2) {
    return <queen-app />
  }

  const { questionnaire, surveyUnit } = loaderData

  //surveyUnit possibly undefined in readOnly
  
  const { collectSurvey } = useCore().functions

  const nomenclatureForLunatic = collectSurvey.getReferentiel

  return (
    <div>
      Collect : {surveyUnit} with questionnaire {questionnaireId}
    </div>
  )
}
