import type { Variable } from '@inseefr/lunatic/type.source'

import { EXTERNAL_RESOURCES_URL } from '@/core/constants'
import type { Questionnaire, SurveyUnit, SurveyUnitData } from '@/core/model'

/** Add external variables to the survey unit data if necessary. */
function computeSurveyUnitDataExternalVariables(
  surveyUnitId: string,
  questionnaireId: string,
  data?: SurveyUnitData,
): SurveyUnitData {
  if (!EXTERNAL_RESOURCES_URL) return data ?? {}

  return {
    ...data,
    EXTERNAL: {
      ...data?.EXTERNAL,
      GLOBAL_QUESTIONNAIRE_ID: questionnaireId,
      GLOBAL_SURVEY_UNIT_ID: surveyUnitId,
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
 * Initialize the survey unit with the expected format since it can be empty or
 * partial. State data must be initialized the first time.
 */
export function computeSurveyUnit(partial?: Partial<SurveyUnit>): SurveyUnit {
  const surveyUnitId = partial?.id ?? ''
  const questionnaireId = partial?.questionnaireId ?? ''

  return {
    id: surveyUnitId,
    questionnaireId,
    personalization: partial?.personalization,
    data: computeSurveyUnitDataExternalVariables(
      surveyUnitId,
      questionnaireId,
      partial?.data,
    ),
    comment: partial?.comment,
    stateData: partial?.stateData ?? {
      state: null,
      date: new Date().getTime(),
      currentPage: '1',
    },
  }
}
