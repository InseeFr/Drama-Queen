import { createFileRoute } from '@tanstack/react-router'

import { collectLoader } from '@/routes/routing/loader'

import { Collect } from './index'
import { isPageTag } from '@/core/tools/pageTag'

export const Route = createFileRoute('/_layout/interrogations')({
    component: Collect,
    validateSearch: (search: Record<string, unknown>) => ({
        page: typeof search.page === 'string' && isPageTag(search.page) ? search.page : undefined,
    }),
    loader: ({ params, search }) =>
        collectLoader({
            interrogationId: params.interrogationId,
            page: search.page,
        }),
})