import { type LunaticSource, getArticulationState } from '@inseefr/lunatic'

import { type ReactNode } from 'react'
import type React from 'react'

import type { LeafStateState } from '@/core/model'
import { prCore } from '@/createCore'

type TableData = {
  headers: string[]
  rows: {
    cells: { label: string; value: ReactNode }[]
    label: string
    page: string | null
    url: string | null
  }[]
}

/**
 * Generates table data for articulation
 * Used to get the progress of a surveys containing a roundabout
 *
 * To ensure the host use the same version of React we require it as a dependency of this function
 */
export function useArticulationTable(
  react: typeof React,
  interrogationId: string,
) {
  const [data, setData] = react.useState<TableData | null>(null)

  react.useEffect(() => {
    ;(async () => {
      // Retrieve questionnaire source and interrogation data
      const { collectSurvey } = (await prCore).functions
      const { interrogation, questionnaire } = await collectSurvey.loader({
        interrogationId,
      })

      if (!hasArticulation(questionnaire)) {
        return
      }

      // Use leafState
      if (!interrogation.data) {
        if (!interrogation?.stateData?.leafStates) {
          return null
        }
        setData({
          headers:
            interrogation?.stateData.leafStates[0]?.cells?.map(
              (c) => c.label,
            ) ?? [],
          rows: interrogation?.stateData.leafStates.map((leafState) => ({
            cells: leafState.cells ?? [],
            url: null,
            page: null,
            label: progressLabel(leafProgress(leafState.state)),
            progress: leafProgress(leafState.state),
          })),
        })
        return
      }

      // Extract articulation data
      const { items } = getArticulationState(questionnaire, interrogation.data)
      if (items.length === 0) {
        return null
      }

      // Update the state
      return setData({
        headers: items[0].cells.map((c) => c.label),
        rows: items.map((item) => ({
          ...item,
          url: buildUrl(interrogationId, item.page),
          label: progressLabel(item.progress),
        })),
      })
    })()
  }, [interrogationId])

  return data
}

function hasArticulation(
  source: LunaticSource | null,
): source is Parameters<typeof getArticulationState>[0] {
  return Boolean(source && 'articulation' in source)
}

const buildUrl = (interrogationId: string, page: string): string => {
  const url = new URL(
    `/queen/interrogations/${interrogationId}`,
    window.location.origin,
  )
  url.searchParams.set('page', page.toString())
  return url.toString()
}

const progressLabel = (n: number) => {
  if (n === -1) {
    return 'Commencer'
  }
  if (n === 0) {
    return 'Continuer'
  }
  return 'Complété'
}

const leafProgress = (leafState: LeafStateState) => {
  if (leafState === 'NOT_INIT') {
    return -1
  }
  if (leafState === 'INIT') {
    return 0
  }
  return 1
}
