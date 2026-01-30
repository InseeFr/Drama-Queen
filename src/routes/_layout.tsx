import { createFileRoute } from '@tanstack/react-router'

import { ErrorPage } from '@/routes/pages/error/Error'

import { Layout } from './index'

export const Route = createFileRoute('/_layout')({
    component: Layout,
    errorComponent: ({ error }) => <ErrorPage error={error} />,
    notFoundComponent: () => <ErrorPage error={new Error('Page not found')} />,
})