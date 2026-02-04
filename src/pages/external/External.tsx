import { CenteredSpinner } from '@/components/ui/CenteredSpinner'
import { ErrorComponent } from '@/components/ui/ErrorComponent'
import { EXTERNAL_RESOURCES_URL } from '@/core/constants'
import i18n from '@/libs/i18n'

import useScript from './useScript'

export function ExternalRessources() {
  const status = useScript(`${EXTERNAL_RESOURCES_URL}/entry.js`, {
    id: 'capmi-app-scripts',
    removeOnUnmount: true,
  })
  if (status === 'loading' || status === 'idle') return <CenteredSpinner />
  if (status === 'ready') return <capmi-app />
  if (status === 'error')
    return (
      <ErrorComponent message={i18n.t('error.externalResourcesLoadedError')} />
    )
}
