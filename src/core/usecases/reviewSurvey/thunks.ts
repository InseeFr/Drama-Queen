import type { Thunks } from '@/core/bootstrap'
import { isSurveyCompatibleWithQueen } from '@/core/tools/SurveyModelBreaking'
import { getTranslation } from '@/i18n'

const { t } = getTranslation('errorMessage')

export const name = 'reviewSurvey'

export const reducer = null

export const thunks = {
  loader:
    (params: { interrogationId: string }) =>
    async (...args) => {
      const [, , { queenApi }] = args

      const { interrogationId } = params

      const interrogation = await queenApi
        .getInterrogation(interrogationId)
        .then((interrogation) => {
          if (!interrogation) {
            throw new Error(t('interrogationNotFound', { interrogationId }))
          }
          return interrogation
        })

      const questionnaire = await queenApi
        .getQuestionnaire(interrogation.questionnaireId)
        .then((questionnaire) => {
          if (!isSurveyCompatibleWithQueen({ questionnaire })) {
            throw new Error(t('questionnaireNotCompatible'))
          }
          return questionnaire
        })

      return { interrogation, questionnaire }
    },
  getReferentiel:
    (name: string) =>
    (...args) => {
      const [, , { queenApi }] = args
      return queenApi.getNomenclature(name)
    },
} satisfies Thunks
