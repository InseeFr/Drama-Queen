import { createFileRoute } from '@tanstack/react-router'

import { collectLoader } from '@/core/loader'
import { isPageTag } from '@/core/tools/pageTag'

import { Collect } from './index'

type CollectSearch = {
  page?: string
}

export const Route = createFileRoute(
  '/_layout/interrogations/$interrogationId',
)({
  component: Collect,
  validateSearch: (search: Record<string, unknown>): CollectSearch => {
    const rawPage = search.page
    const page =
      typeof rawPage === 'string'
        ? rawPage
        : typeof rawPage === 'number'
          ? String(rawPage)
          : undefined
    return {
      page: page !== undefined && isPageTag(page) ? page : undefined,
    }
  },
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: ({ params, deps }) =>
    collectLoader({
      interrogationId: params.interrogationId,
      page: deps.page,
    }),
})
