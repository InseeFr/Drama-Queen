import { EXTERNAL_RESOURCES_URL } from 'core/constants'
import useScript from './useScript'
import { ErrorComponent } from 'ui/components/ErrorComponent'
import { CenteredSpinner } from 'ui/components/CenteredSpinner'
import { getTranslation } from 'i18n'

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
