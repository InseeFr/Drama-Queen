import type { Variable } from '@inseefr/lunatic/type.source'

import { EXTERNAL_RESOURCES_URL } from '@/core/constants'
import type {
  Interrogation,
  InterrogationData,
  Questionnaire,
} from '@/core/model'

/** Add external variables to the interrogation data if necessary. */
function computeInterrogationDataExternalVariables(
  interrogationId: string,
  questionnaireId: string,
  data?: InterrogationData,
): InterrogationData {
  if (!EXTERNAL_RESOURCES_URL) return data ?? {}

  return {
    ...data,
    EXTERNAL: {
      ...data?.EXTERNAL,
      GLOBAL_QUESTIONNAIRE_ID: questionnaireId,
      GLOBAL_SURVEY_UNIT_ID: interrogationId,
    },
  }
}

/** Add external variables to the source if necessary. */
export function computeSourceExternalVariables(
  source: Questionnaire,
): Questionnaire {
  if (!EXTERNAL_RESOURCES_URL) return source

  const globalExternalVariables = [
    {
      name: 'GLOBAL_QUESTIONNAIRE_ID',
      value: null,
      variableType: 'EXTERNAL',
    },
    {
      name: 'GLOBAL_SURVEY_UNIT_ID',
      value: null,
      variableType: 'EXTERNAL',
    },
  ] as Variable[]

  return {
    ...source,
    variables: [...source.variables, ...globalExternalVariables],
  }
}

/**
 * Initialize the interrogation with the expected format since it can be empty or partial.
 */
export function computeInterrogation(
  partial?: Partial<Interrogation>,
): Interrogation {
  const interrogationId = partial?.id ?? ''
  const questionnaireId = partial?.questionnaireId ?? ''

  return {
    id: interrogationId,
    questionnaireId,
    personalization: partial?.personalization,
    data: computeInterrogationDataExternalVariables(
      interrogationId,
      questionnaireId,
      partial?.data,
    ),
    comment: partial?.comment,
    stateData: partial?.stateData,
  }
}
