import { useLoaderData, useNavigate } from 'react-router-dom'

import type { SurveyUnit } from '@/core/model'
import { Orchestrator } from '@/ui/components/orchestrator/Orchestrator'
import { downloadAsJson } from '@/ui/components/orchestrator/tools/functions'
import { visualizeLoader } from '@/ui/routing/loader/visualizeLoader'

import { VisualizeForm } from './VisualizeForm'

export function Visualize() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = useLoaderData() as Awaited<
    ReturnType<typeof visualizeLoader>
  >

  const navigate = useNavigate()

  const onQuit = (surveyUnit: SurveyUnit) => {
    downloadAsJson({ data: surveyUnit })
    navigate('/visualize')
  }

  if (loaderData) {
    return (
      <Orchestrator
        source={loaderData.source}
        surveyUnit={loaderData.surveyUnit}
        readonly={loaderData.readonly}
        onQuit={onQuit}
        onDefinitiveQuit={onQuit}
        onChangePage={undefined}
        getReferentiel={loaderData.getReferentiel}
      />
    )
  }

  return <VisualizeForm />
}
