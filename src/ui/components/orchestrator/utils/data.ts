import type { Variable } from '@inseefr/lunatic/type.source'

import { EXTERNAL_RESOURCES_URL } from '@/core/constants'
import type { Questionnaire, SurveyUnit, SurveyUnitData } from '@/core/model'

function getInitialData(
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

export function getSource(source: Questionnaire): Questionnaire {
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

export function getinitialSurveyUnit(
  partial?: Partial<SurveyUnit>,
): SurveyUnit {
  const surveyUnitId = partial?.id ?? ''
  const questionnaireId = partial?.questionnaireId ?? ''

  return {
    id: surveyUnitId,
    questionnaireId: questionnaireId,
    personalization: partial?.personalization,
    data: getInitialData(surveyUnitId, questionnaireId, partial?.data),
    comment: partial?.comment,
    stateData: partial?.stateData ?? {
      state: null,
      date: new Date().getTime(),
      currentPage: '1',
    },
  }
}
