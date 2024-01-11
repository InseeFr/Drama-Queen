import type { Thunks } from 'core/bootstrap'
import { actions, name } from './state'
import type { AxiosError } from 'axios'

export const thunks = {
  download:
    () =>
    async (...args) => {
      const [dispatch, getState, { queenApi, dataStore, localSyncStorage }] =
        args

      {
        const state = getState()[name]

        if (state.stateDescription === 'running') {
          return
        }
      }

      dispatch(actions.runningDownload())

      /**
       * Pre-requis
       */
      const campaigns = await queenApi.getCampaigns()

      const campaignsIds = campaigns.map(({ id }) => id) ?? []
      const questionnaireIds = [
        ...new Set(
          campaigns.map(({ questionnaireIds }) => questionnaireIds).flat() ?? []
        ),
      ]

      dispatch(
        actions.setDownloadTotalSurvey({ totalSurvey: questionnaireIds.length })
      )

      /*
       * SurveyUnit
       */

      const prSurveyUnit = campaignsIds.map((campaignId) =>
        queenApi
          .getSurveyUnitsIdsAndQuestionnaireIdsByCampaign(campaignId)
          .then((arrayOfIds) => {
            dispatch(
              actions.updateDownloadTotalSurveyUnit({
                totalSurveyUnit: arrayOfIds.length,
              })
            )
            return Promise.all(
              arrayOfIds.map(({ id }) =>
                queenApi
                  .getSurveyUnit(id)
                  .then((surveyUnit) => dataStore.updateSurveyUnit(surveyUnit))
                  .then(() => {
                    localSyncStorage.addIdToSurveyUnitsSuccess(id)
                    dispatch(actions.downloadSurveyUnitCompleted())
                  })
              )
            )
          })
      )

      await Promise.all(prSurveyUnit)

      /*
       * Survey
       */

      const questionnaires = await Promise.all(
        questionnaireIds.map((questionnaireId) =>
          queenApi
            .getQuestionnaire(questionnaireId)
            .then((questionnaire) => {
              dispatch(actions.downloadSurveyCompleted())
              return questionnaire
            })
            .catch(() => {
              console.error(
                ` Questionnaire : An error occurred and we were unable to retrieve survey ${questionnaireId}`
              )
              return undefined
            })
        )
      )

      /*
       * Nomenclature
       */

      const suggestersNames = deduplicate(
        questionnaires
          .map((q) => q?.suggesters)
          .flat()
          .map((suggester) => suggester?.name)
      )

      dispatch(
        actions.setDownloadTotalNomenclature({
          totalNomenclature: suggestersNames.length,
        })
      )

      //We don't store the data, but instead, we simply initiate the request for the service worker to cache the response
      await Promise.all(
        suggestersNames.map((nomenclatureId) =>
          queenApi
            .getNomenclature(nomenclatureId)
            .catch(() => {
              console.error(
                `Nomenclature : An error occurred and we were unable to retrieve nomenclature ${nomenclatureId}`
              )
            })
            .finally(() => dispatch(actions.downloadNomenclatureCompleted()))
        )
      )

      dispatch(actions.downloadCompleted())
    },
  upload:
    () =>
    async (...args) => {
      const [dispatch, getState, { dataStore, queenApi, localSyncStorage }] =
        args

      {
        const state = getState()[name]

        if (state.stateDescription === 'running') {
          return
        }
      }

      dispatch(actions.runningUpload())

      //  If localStorageData exists, we refresh it; otherwise, we initialize it.
      localSyncStorage.saveObject({
        error: false,
        surveyUnitsInTempZone: [],
        surveyUnitsSuccess: [],
      })

      try {
        const prSurveyUnits = dataStore.getAllSurveyUnits()
        const surveyUnits = await prSurveyUnits

        if (surveyUnits) {
          dispatch(actions.setUploadTotal({ total: surveyUnits.length ?? 0 }))

          const surveyUnitPromises = surveyUnits.map((surveyUnit) =>
            queenApi
              .putSurveyUnit(surveyUnit)
              .catch((error: AxiosError) => {
                if (
                  error.response &&
                  [400, 403, 404, 500].includes(error.response.status)
                ) {
                  return queenApi
                    .postSurveyUnitInTemp(surveyUnit)
                    .then(() =>
                      localSyncStorage.addIdToSurveyUnitsInTempZone(
                        surveyUnit.id
                      )
                    )
                    .catch((postError: Error) => {
                      console.error(
                        'Error: Unable to post surveyUnit in tempZone',
                        postError
                      )
                      throw postError
                    })
                }
                throw error
              })
              .then(() => dataStore.deleteSurveyUnit(surveyUnit.id))
              .then(() => {
                dispatch(actions.uploadSurveyUnitCompleted())
              })
              .catch((error) => {
                console.error('Error: Unable to upload data', error)
                throw error
              })
          )
          await Promise.all(surveyUnitPromises)
        }
        dispatch(actions.uploadCompleted())
        dispatch(thunks.download())
      } catch (error) {
        localSyncStorage.addError(true)
        dispatch(actions.uploadError())
      }
    },
} satisfies Thunks

/**
 * Remove undefined values from an array and remove duplicates
 */
function deduplicate<T>(items: (T | undefined)[]): T[] {
  return [...new Set(items.filter((data) => !!data))] as T[]
}
