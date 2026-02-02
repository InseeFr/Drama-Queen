import { createFileRoute } from '@tanstack/react-router'

import { reviewLoader } from '@/routes/routing/loader'

import { Review } from './index'

export const Route = createFileRoute(
  '/_layout/review/interrogations/$interrogationId',
)({
  component: Review,
  loader: ({ params }) => reviewLoader({ params }),
})
