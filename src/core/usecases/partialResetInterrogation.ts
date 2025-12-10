import { createDataStore } from '@/core/adapters/datastore/default'
import { createOidcGetter, createQueenClient } from '@/core/bootstrap'
import { CORE_PROVIDER_CONTEXT } from '@/core/constants'

export async function partialResetInterrogation(interrogationId: string) {
  const store = createDataStore()
  const getOidc = await createOidcGetter(CORE_PROVIDER_CONTEXT.oidcParams)
  const queen = await createQueenClient(CORE_PROVIDER_CONTEXT, getOidc)

  // Retrieve information from IndexedDB
  const interrogation = await store
    .getInterrogation(interrogationId)
    .catch(() => {
      throw new Error('Cannot retrieve interrogations from indexedDB')
    })

  if (!interrogation) {
    return
  }

  // Retrieve questionnaire from the API
  const questionnaire = await queen.getQuestionnaire(
    interrogation.questionnaireId,
  )

  if (!questionnaire) {
    return
  }

  // Reset data
  interrogation.data.CALCULATED = {}
  interrogation.data.COLLECTED = {}
  // Reset external variables
  for (const variable of questionnaire.variables) {
    if (
      variable.variableType === 'EXTERNAL' &&
      variable.isDeletedOnReset &&
      // eslint-disable-next-line no-prototype-builtins
      interrogation.data.EXTERNAL?.hasOwnProperty(variable.name)
    ) {
      delete interrogation.data.EXTERNAL[variable.name]
    }
  }
  delete interrogation.stateData

  await store.updateInterrogation(interrogation)
}
