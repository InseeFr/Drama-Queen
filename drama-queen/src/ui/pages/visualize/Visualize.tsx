import { useLoaderData, useNavigate } from 'react-router-dom'
import { VisualizeForm } from './VisualizeForm'
import { visualizeLoader } from 'ui/routing/loader/visualizeLoader'
import { Orchestrator } from 'ui/components/orchestrator/Orchestrator'
import type { SurveyUnit } from 'core/model'
import { downloadAsJson } from 'ui/components/orchestrator/tools/functions'

export function Visualize() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = useLoaderData() as Awaited<
    ReturnType<typeof visualizeLoader>
  >

  const navigate = useNavigate()

  // function applied on when page changes
  const onChangePage = (surveyUnit: SurveyUnit) => {
    return
  }

  const onQuit = (surveyUnit: SurveyUnit) => {
    downloadAsJson({ data: surveyUnit })
    navigate('/visualize')
  }

  if (loaderData) {
    return loaderData.isQueenV2 ? (
      <Orchestrator
        source={loaderData.source}
        surveyUnit={loaderData.surveyUnit}
        readonly={loaderData.readonly}
        onQuit={onQuit}
        onDefinitiveQuit={onQuit}
        onChangePage={onChangePage}
        getReferentiel={loaderData.getReferentiel}
      />
    ) : (
      <queen-app />
    )
  }

  return <VisualizeForm />
}
