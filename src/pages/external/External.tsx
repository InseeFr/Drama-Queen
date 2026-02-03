import { CenteredSpinner } from '@/components/ui/CenteredSpinner'
import { ErrorComponent } from '@/components/ui/ErrorComponent'
import { EXTERNAL_RESOURCES_URL } from '@/core/constants'
import { getTranslation } from '@/i18n'

import useScript from './useScript'

const { t } = getTranslation('errorMessage')

export function ExternalRessources() {
  const status = useScript(`${EXTERNAL_RESOURCES_URL}/entry.js`, {
    id: 'capmi-app-scripts',
    removeOnUnmount: true,
  })
  if (status === 'loading' || status === 'idle') return <CenteredSpinner />
  if (status === 'ready') return <capmi-app />
  if (status === 'error')
    return <ErrorComponent message={t('externalResourcesLoadedError')} />
}
