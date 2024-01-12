import { assert } from 'tsafe/assert'
import type { Thunks } from 'core/bootstrap'

export const name = 'surveyUnit'

export const reducer = null

export const thunks = {
  getSurveyWithSurveyUnit:
    (params: { surveyUnitId: string }) =>
    async (...args) => {
      const [, , { dataStore }] = args
      const { surveyUnitId } = params

      const surveyUnit = await dataStore.getSurveyUnit(surveyUnitId)
      return surveyUnit?.questionnaireId
    },
} satisfies Thunks
