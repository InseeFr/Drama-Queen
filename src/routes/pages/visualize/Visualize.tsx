import { useNavigate } from 'react-router-dom'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import type { SurveyUnit } from '@/core/model'
import { visualizeLoader } from '@/routes/routing/loader/visualizeLoader'
import { useLoaderData } from '@/routes/routing/utils'
import { downloadAsJson } from '@/utils/files'

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
        includeCalculatedVariables={true}
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
