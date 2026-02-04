import type { Thunks } from '@/core/bootstrap'
import { LUNATIC_MODEL_VERSION_BREAKING } from '@/core/constants'
import { isSurveyCompatibleWithQueen } from '@/core/tools/SurveyModelBreaking'
import i18n from '@/libs/i18n'

export const name = 'reviewSurvey'

export const reducer = null

export const thunks = {
  loader:
    (params: { interrogationId: string }) =>
    async (...args) => {
      const [, , { queenApi }] = args

      const { interrogationId } = params

      const interrogation = await queenApi.getInterrogation(interrogationId)
      if (!interrogation) {
        throw new Error(
          i18n.t('error.interrogationNotFound', { interrogationId }),
        )
      }

      const questionnaire = await queenApi.getQuestionnaire(
        interrogation.questionnaireId,
      )

      if (!isSurveyCompatibleWithQueen({ questionnaire })) {
        throw new Error(
          i18n.t('error.questionnaireNotCompatible', {
            versionBreaking: LUNATIC_MODEL_VERSION_BREAKING,
          }),
        )
      }

      return { interrogation, questionnaire }
    },
  getReferentiel:
    (name: string) =>
    (...args) => {
      const [, , { queenApi }] = args
      return queenApi.getNomenclature(name)
    },
} satisfies Thunks
