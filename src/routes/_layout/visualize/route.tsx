import { createFileRoute } from '@tanstack/react-router'

import { visualizeLoader } from '@/core/loader'

import { Visualize } from './index'

export type VisualizeSearch = {
  questionnaire?: string
  data?: string
  nomenclature?: string
  readonly?: string
}

const parseStringSearch = (value: unknown) =>
  typeof value === 'string' ? value : undefined

export const Route = createFileRoute('/_layout/visualize')({
  component: Visualize,
  loader: ({ location }) => visualizeLoader({ location }),
  validateSearch: (search: Record<string, unknown>): VisualizeSearch => ({
    questionnaire: parseStringSearch(search.questionnaire),
    data: parseStringSearch(search.data),
    nomenclature: parseStringSearch(search.nomenclature),
    readonly: parseStringSearch(search.readonly),
  }),
})
