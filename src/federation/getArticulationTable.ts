import { type LunaticSource, getArticulationState } from '@inseefr/lunatic'

import { type ReactNode } from 'react'

import type { LeafStateState } from '@/core/model'
import { prCore } from '@/createCore'

export type TableData = {
  dates?: number[]
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
 * Refactored: Expose a plain async function returning the table data
 */
export async function getArticulationTable(
  interrogationId: string,
): Promise<TableData | null> {
  // Retrieve questionnaire source and interrogation data
  const { collectSurvey } = (await prCore).functions
  const { interrogation, questionnaire } = await collectSurvey.loader({
    interrogationId,
  })

  if (!hasArticulation(questionnaire)) {
    return null
  }

  // Use leafState
  if (!interrogation.data) {
    if (!interrogation?.stateData?.leafStates) {
      return null
    }
    return {
      dates: interrogation?.stateData?.leafStates.map((s) => s.date),
      headers:
        interrogation?.stateData.leafStates[0]?.cells?.map((c) => c.label) ??
        [],
      rows: interrogation?.stateData.leafStates.map((leafState) => ({
        cells: leafState.cells ?? [],
        url: null,
        page: null,
        label: progressLabel(leafProgress(leafState.state)),
        // progress is intentionally not part of the public type
        progress: leafProgress(leafState.state),
      })),
    }
  }

  // Extract articulation data
  const { items } = getArticulationState(questionnaire, interrogation.data)
  if (items.length === 0) {
    return null
  }

  // Build the result
  return {
    dates: interrogation?.stateData?.leafStates?.map((s) => s.date),
    headers: items[0].cells.map((c) => c.label),
    rows: items.map((item) => ({
      ...item,
      url: buildUrl(interrogationId, item.page),
      label: progressLabel(item.progress),
    })),
  }
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
