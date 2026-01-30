import { createFileRoute } from '@tanstack/react-router'

import { collectLoader } from '@/routes/routing/loader'

import { Collect } from './index'
import { isPageTag } from '@/core/tools/pageTag'

type CollectSearch = {
    page?: string
}

export const Route = createFileRoute('/_layout/interrogations/$interrogationId')({
    component: Collect,
    validateSearch: (search: Record<string, unknown>): CollectSearch => ({
        page: typeof search.page === 'string' && isPageTag(search.page) ? search.page : undefined,
    }),
    loaderDeps: ({ search }) => ({ page: search.page }),
    loader: ({ params, deps }) =>
        collectLoader({
            interrogationId: params.interrogationId,
            page: deps.page,
        }),
})