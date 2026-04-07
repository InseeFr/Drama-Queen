import { createFileRoute } from '@tanstack/react-router'

import { visualizeLoader } from '@/core/loader'
import type { FormValues } from '@/pages/visualize/models'

import { Visualize } from './index'

export type VisualizeSearch = FormValues

const parseStringSearch = (value: unknown) =>
  typeof value === 'string' ? value : ''

const parseBooleanSearch = (value: unknown) =>
  typeof value === 'boolean' ? value : false

const parseObjectSearch = (value: unknown) => {
  return typeof value === 'object'
    ? (value as Record<string, string>)
    : undefined
}

export const Route = createFileRoute('/_layout/visualize')({
  component: Visualize,
  loader: ({ location }) => visualizeLoader({ location }),
  validateSearch: (search: Record<string, unknown>): VisualizeSearch => ({
    questionnaire: parseStringSearch(search.questionnaire),
    data: parseStringSearch(search.data),
    nomenclature: parseObjectSearch(search.nomenclature),
    readonly: parseBooleanSearch(search.readonly),
  }),
})
