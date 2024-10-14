import type { Thunks } from 'core/bootstrap'
import { actions, name } from './state'
import { AxiosError } from 'axios'
import type { Questionnaire } from 'core/model'
import {
  getExternalQuestionnaireFiltered,
  getExternalQuestionnaires,
  getOldExternalCacheNames,
  getResourcesFromExternalQuestionnaire,
} from 'core/tools/externalResources'

export const externalResourcesUrl = import.meta.env.VITE_EXTERNAL_RESOURCES_URL
const externalResourcesRootCacheName = 'cache-root-external'

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

      try {
        /**
         * First
         */

        const campaigns = await queenApi.getCampaigns()

        const campaignsIds = campaigns.map(({ id }) => id) ?? []

        //extract all questionnaireIds without duplicate
        const questionnaireIds = [
          ...new Set(
            campaigns.map(({ questionnaireIds }) => questionnaireIds).flat() ??
              []
          ),
        ]

        dispatch(
          actions.setDownloadTotalSurvey({
            totalSurvey: questionnaireIds.length,
          })
        )

        /*
         * Survey
         */

        //We need surveyResults before fetching SurveyUnit so we await.
        const surveyResults = await Promise.all(
          questionnaireIds.map((questionnaireId) =>
            queenApi
              .getQuestionnaire(questionnaireId)
              .then((questionnaire) => {
                dispatch(actions.downloadSurveyCompleted())
                return {
                  success: true as const,
                  questionnaireId,
                  questionnaire,
                }
              })
              .catch(() => {
                console.error(
                  ` Questionnaire : An error occurred and we were unable to retrieve survey ${questionnaireId}`
                )
                return {
                  success: false as const,
                  questionnaireId,
                  questionnaire: undefined,
                }
              })
          )
        )

        const { questionnaireIdInSuccess, questionnaires } =
          surveyResults.reduce(
            (acc, result) => {
              if (result.success) {
                acc.questionnaireIdInSuccess.push(result.questionnaireId)
                acc.questionnaires.push(result.questionnaire)
              }
              return acc
            },
            { questionnaireIdInSuccess: [], questionnaires: [] } as {
              questionnaireIdInSuccess: string[]
              questionnaires: Questionnaire[]
            }
          )

        /*
         * SurveyUnit
         */

        const prSurveyUnit = await Promise.all(
          campaignsIds.map((campaignId) =>
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
                      .then((surveyUnit) => {
                        dataStore.updateSurveyUnit(surveyUnit)
                        return questionnaireIdInSuccess.includes(
                          surveyUnit.questionnaireId
                        )
                      })
                      .then((isSurveyWellDownload) => {
                        if (isSurveyWellDownload) {
                          localSyncStorage.addIdToSurveyUnitsSuccess(id)
                        }
                        dispatch(actions.downloadSurveyUnitCompleted())
                      })
                      .catch((error) => {
                        if (
                          error instanceof AxiosError &&
                          error.response &&
                          [400, 403, 404, 500].includes(error.response.status)
                        ) {
                          console.error(
                            `An error occurred while fetching surveyUnit : ${id}, synchronization continue`,
                            error
                          )
                          return
                        }
                        throw error
                      })
                  )
                )
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
        const prNomenclatures = Promise.all(
          suggestersNames.map((nomenclatureId) =>
            queenApi
              .getNomenclature(nomenclatureId)
              .catch((error) => {
                console.error(
                  `Nomenclature : An error occurred and we were unable to retrieve nomenclature ${nomenclatureId}`,
                  error
                )
              })
              .finally(() => {
                dispatch(actions.downloadNomenclatureCompleted())
              })
          )
        )

        /*
         * External special ressources
         */

        // we sychronize the external ressource only if there is a url for getting them
        if (externalResourcesUrl) {
          // get the list of external questionnaires
          const externalQuestionnaires = await getExternalQuestionnaires(
            externalResourcesUrl
          ).catch((error) => {
            if (
              error instanceof AxiosError &&
              error.response &&
              [400, 403, 404, 500].includes(error.response.status)
            ) {
              console.error(
                `An error occurred while fetching external questionnaires list`,
                error
              )
            }
            throw error
          })

          const { neededQuestionnaires, notNeededQuestionnaires } =
            getExternalQuestionnaireFiltered(
              questionnaireIdInSuccess,
              externalQuestionnaires
            )

          // set the total of needed external questionnaires for progress bar
          dispatch(
            actions.setDownloadTotalExternalResources({
              totalExternalResources: neededQuestionnaires.length,
            })
          )

          // add in cache the missing external resources for needed questionnaires
          const prGetExternalResources = Promise.all(
            neededQuestionnaires.map(async (questionnaire) => {
              await getResourcesFromExternalQuestionnaire(
                externalResourcesUrl,
                questionnaire
              )
                .then(() =>
                  dispatch(actions.downloadExternalResourceCompleted())
                )
                .catch((error) =>
                  console.error(
                    `An error occurred while fetching external resources of questionnaire ${questionnaire.id}`,
                    error
                  )
                )
            })
          )

          // delete the cache of every not needed external questionnaires
          const prDeleteExternalResources = Promise.all(
            notNeededQuestionnaires.map((questionnaire) =>
              caches.delete(questionnaire.cacheName)
            )
          )

          // delete the root-cache of external resources if no external questionnaire is needed
          const prDeleteExternalRootCache =
            neededQuestionnaires.length === 0
              ? caches.delete(externalResourcesRootCacheName)
              : Promise.resolve()

          // delete old caches (that are not in external questionnaires list but sill in browser) :
          const oldExternalCacheNames =
            await getOldExternalCacheNames(neededQuestionnaires)

          const prDeleteOldExternalCaches = Promise.all(
            oldExternalCacheNames.map((cacheName) => caches.delete(cacheName))
          )

          // We await untill the promises for external resources are finished
          await Promise.all([
            prGetExternalResources,
            prDeleteExternalResources,
            prDeleteExternalRootCache,
            prDeleteOldExternalCaches,
          ])
        }

        //We await untill all the promises are finished
        await Promise.all([prSurveyUnit, prNomenclatures])

        dispatch(actions.downloadCompleted())
      } catch (error) {
        console.error(
          'An unknown error occurred while we were fetching data so we stop the synchronization.',
          error
        )
        localSyncStorage.addError(true)
        dispatch(actions.downloadFailed())
      }
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
