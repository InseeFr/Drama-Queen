import { type LunaticSource, getArticulationState } from '@inseefr/lunatic'

import { type ReactNode } from 'react'
import type React from 'react'

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
  surveyUnitId: string,
) {
  const [data, setData] = react.useState<TableData | null>(null)

  react.useEffect(() => {
    ;(async () => {
      // Retrieve questionnaire source and survey unit data
      const { collectSurvey } = (await prCore).functions
      const questionnaireId = await collectSurvey.retrieveQuestionnaireId({
        surveyUnitId,
      })
      const { surveyUnit, questionnaire } = await collectSurvey.loader({
        questionnaireId,
        surveyUnitId,
      })

      if (!hasArticulation(questionnaire)) {
        return
      }

      // Use leafState
      if (!surveyUnit.data) {
        if (!surveyUnit?.stateData.leafStates) {
          return null
        }
        setData({
          headers: [],
          rows: surveyUnit?.stateData.leafStates.map((leaf: any) => ({
            cells: [],
            url: null,
            page: null,
            label: progressLabel(leafProgress(leaf.state)),
            progress: leafProgress(leaf.state),
          })),
        })
        return
      }

      // Extract articulation data
      const { items } = getArticulationState(questionnaire, surveyUnit.data)
      if (items.length === 0) {
        return null
      }

      // Update the state
      return setData({
        headers: items[0].cells.map((c) => c.label),
        rows: items.map((item) => ({
          ...item,
          url: buildUrl(questionnaireId, surveyUnitId, item.page),
          label: progressLabel(item.progress),
        })),
      })
    })()
  }, [surveyUnitId])

  return data
}

function hasArticulation(
  source: LunaticSource | null,
): source is Parameters<typeof getArticulationState>[0] {
  return Boolean(source && source && 'articulation' in source)
}

const buildUrl = (
  questionnaireId: string,
  surveyUnitId: string,
  page: string,
): string => {
  const url = new URL(
    `/queen/questionnaire/${questionnaireId}/survey-unit/${surveyUnitId}`,
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

const leafProgress = (leafState: string) => {
  if (leafState === 'NOT_INIT') {
    return -1
  }
  if (leafState === 'INIT') {
    return 0
  }
  return 1
}
