import { useNavigate } from '@tanstack/react-router'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { visualizeLoader } from '@/core/loader/visualizeLoader'
import type { Interrogation } from '@/core/model'
import { Route as VisualizeRoute } from '@/routes/_layout/visualize/route'
import { downloadAsJson } from '@/utils/files'

import { VisualizeForm } from './VisualizeForm'

export function Visualize() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = VisualizeRoute.useLoaderData() as Awaited<
    ReturnType<typeof visualizeLoader>
  >

  const navigate = useNavigate()

  const onQuit = (interrogation: Interrogation) => {
    downloadAsJson({ data: interrogation })
    navigate({ to: '/visualize' })
  }

  if (loaderData) {
    return (
      <Orchestrator
        includeCalculatedVariables={true}
        source={loaderData.source}
        interrogation={loaderData.interrogation}
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
