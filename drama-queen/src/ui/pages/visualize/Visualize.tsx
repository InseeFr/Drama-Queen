import { useLoaderData } from 'react-router-dom'
import { VisualizeForm } from './VisualizeForm'
import { visualizeLoader } from 'ui/routing/loader/visualizeLoader'
import { Orchestrator } from 'ui/components/orchestrator/Orchestrator'

export function Visualize() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = useLoaderData() as Awaited<
    ReturnType<typeof visualizeLoader>
  >

  if (loaderData !== null) {
    return loaderData.isQueenV2 ? (
      <Orchestrator
        source={loaderData.source}
        surveyUnit={loaderData.surveyUnit}
        readonly={loaderData.readonly}
      />
    ) : (
      <>Queen v1 orchestrator</>
    )
  }

  return <VisualizeForm />
}
