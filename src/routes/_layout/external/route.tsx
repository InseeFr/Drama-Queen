import { createFileRoute } from '@tanstack/react-router'

import { ExternalRessources } from './index'

export const Route = createFileRoute('/_layout/external')({
    component: ExternalRessources,
})