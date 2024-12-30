import { type LunaticSource, getArticulation } from '@inseefr/lunatic'

import { type ReactNode, useEffect, useState } from 'react'

import { prCore } from '@/createCore'

type TableData = {
  headers: string[]
  rows: {
    cells: { label: string; value: ReactNode }[]
    label: string
    page: string
    url: string
  }[]
}

/**
 * Generates table data for articulation
 * Used to get the progress of a surveys containing a roundabout
 */
export function useArticulationTable(surveyUnitId: string) {
  const [data, setData] = useState<TableData | null>(null)

  useEffect(() => {
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
      if (!hasArticulation(questionnaire) || !surveyUnit.data) {
        return
      }

      // Extract articulation data
      const { items } = getArticulation(questionnaire, surveyUnit.data)
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
): source is Parameters<typeof getArticulation>[0] {
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
