import { createFileRoute } from '@tanstack/react-router'

import { ErrorPage } from '@/pages/error/Error'

import { Layout } from './index'

export const Route = createFileRoute('/_layout')({
  component: Layout,
  errorComponent: ({ error }) => <ErrorPage error={error} />,
})
