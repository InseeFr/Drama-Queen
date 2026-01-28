

import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import type { Interrogation } from '@/core/model'
import { visualizeLoader } from '@/routes/routing/loader/visualizeLoader'
import { downloadAsJson } from '@/utils/files'

import { VisualizeForm } from './VisualizeForm'
import { useNavigate } from '@tanstack/react-router'

import { Route as VisualizeRoute } from '@/routes/_layout/visualize/route'

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
