import { useLoaderData } from 'react-router-dom'
import { VisualizeForm } from './VisualizeForm'
import { visualizeLoader } from 'ui/routing/loader/visualizeLoader'

export function Visualize() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const params = useLoaderData() as Awaited<ReturnType<typeof visualizeLoader>>

  if (params !== null) {
    return params.isQueenV2 ? (
      <>Queen v2 orchestrator</>
    ) : (
      <>Queen v1 orchestrator</>
    )
  }

  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const params = useLoaderData() as Awaited<ReturnType<typeof visualizeLoader>>

  if (params) {
    return params.isQueenV2 ? (
      <>Queen v2 orchestrator</>
    ) : (
      <>Queen v1 orchestrator</>
    )
  }

  return <VisualizeForm />
}
