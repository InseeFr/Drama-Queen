import type { LunaticSource } from '@inseefr/lunatic'
import { AxiosError } from 'axios'

import { type Thunks } from '@/core/bootstrap'
import { EXTERNAL_RESOURCES_URL, IS_TELEMETRY_ENABLED } from '@/core/constants'
import type { Interrogation, Questionnaire } from '@/core/model'
import type { DataStore } from '@/core/ports/DataStore'
import type { LocalSyncStorage } from '@/core/ports/LocalSyncStorage'
import type { QueenApi } from '@/core/ports/QueenApi'
import {
  getExternalQuestionnaireFiltered,
  getExternalQuestionnaires,
  getOldExternalCacheNames,
  getResourcesFromExternalQuestionnaire,
} from '@/core/tools/externalResources'
import { interrogationFromLocalInterrogation } from '@/utils/interrogation'

import { actions, name } from './state'

const EXTERNAL_RESOURCES_ROOT_CACHE_NAME = 'cache-root-external'
const INTERROGATIONS_LIST_LOCAL_STORAGE_KEY =
  'SYNCHRONIZATION_INTERROGATION_IDS'

export const thunks = {
  // Sync the data (upload first, download last)
  sync: (params: { resetMoved: boolean }) => async (dispatch, getState) => {
    const state = getState()[name]
    if (state.stateDescription === 'running') {
      return
    }

    dispatch(actions.runningSync())
    if (params.resetMoved) {
      await dispatch(thunks.resetMoved())
    }
    await dispatch(thunks.upload())
    await dispatch(thunks.cleanupInterrogations())
    await dispatch(thunks.download())
    dispatch(actions.syncCompleted())
  },

  // Reset data for interrogations where the interrogated moved
  resetMoved: () => async (dispatch, _getState, context) => {
    const { queenApi } = context
    dispatch(actions.runningDownload())
    try {
      const ids = await queenApi.fetchMoved()
      dispatch(
        actions.updateDownloadTotalInterrogation({
          totalInterrogation: ids.length,
        }),
      )
      for (const { id } of ids) {
        await dispatch(thunks.partialReset({ interrogationId: id }))
        dispatch(actions.downloadInterrogationCompleted())
      }
      dispatch(actions.downloadCompleted)
    } catch (e) {
      dispatch(actions.uploadError())
      throw e
    }
  },

  // Reset data for a specific interrogation
  partialReset:
    (params: { interrogationId: string }) =>
    async (_dispatch, _getState, context) => {
      const { queenApi, dataStore } = context
      const interrogation = await dataStore.getInterrogation(
        params.interrogationId,
      )

      if (!interrogation) {
        console.error(
          `Cannot find interrogation ${interrogation} in the local store`,
        )
        return
      }

      // Retrieve questionnaire from the API
      const questionnaire = await queenApi.getQuestionnaire(
        interrogation.questionnaireId,
      )

      if (!questionnaire) {
        console.error(
          `Cannot find questionnaire ${interrogation.questionnaireId} from the API`,
        )
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

      await dataStore.updateInterrogation(interrogation)
    },

  // Download the fresh data from the server
  download: () => async (dispatch, getState, context) => {
    const { queenApi, dataStore, localSyncStorage } = context
    {
      const state = getState()[name]

      if (state.stateDescription === 'running' && state.type === 'download') {
        return
      }
    }

    dispatch(actions.runningDownload())

    try {
      /**
       * First
       */

      let questionnaireIdsInSuccess: string[] = []
      let questionnaires: LunaticSource[] = []
      let prInterrogations

      // get expected interrogation ids from local storage
      const expectedInterrogationIds = getExpectedInterrogationIds()

      if (expectedInterrogationIds) {
        /*
         * get new interrogations
         */

        const localInterrogations = await dataStore.getAllInterrogations()
        const localInterrogationIds = localInterrogations?.map(
          (interrogation) => interrogation.id,
        )

        // create list of interrogation ids that are not currently in local datastore
        const newInterrogationIds = expectedInterrogationIds.filter(
          (id) => !localInterrogationIds.includes(id),
        )

        dispatch(
          actions.updateDownloadTotalInterrogation({
            totalInterrogation: newInterrogationIds.length,
          }),
        )

        // get only new interrogations
        const newInterrogations = await Promise.all(
          newInterrogationIds.map((id) =>
            queenApi.getInterrogation(id).catch((error) => {
              if (
                error instanceof AxiosError &&
                error.response &&
                [400, 403, 404, 500].includes(error.response.status)
              ) {
                console.error(
                  `An error occurred while fetching interrogation : ${id}, synchronization continue`,
                  error,
                )
                return
              }
              throw error
            }),
          ),
        )

        const interrogations = newInterrogations.filter(
          (interrogation): interrogation is Interrogation => !!interrogation,
        )

        /*
         * questionnaires
         */

        const questionnaireIds = deduplicate(
          interrogations.map(({ questionnaireId }) => questionnaireId),
        )

        const questionnaireResults = await Promise.all(
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
                  ` Questionnaire : An error occurred and we were unable to retrieve survey ${questionnaireId}`,
                )
                return {
                  success: false as const,
                  questionnaireId,
                  questionnaire: undefined,
                }
              }),
          ),
        )

        for (const questionnaireResult of questionnaireResults) {
          if (questionnaireResult.success) {
            questionnaireIdsInSuccess.push(questionnaireResult.questionnaireId)
            questionnaires.push(questionnaireResult.questionnaire)
          }
        }

        /**
         * store interrogations
         */

        prInterrogations = Promise.all(
          interrogations.map((interrogation) => {
            dataStore.updateInterrogation({
              ...interrogation,
              hasBeenUpdated: false,
            })
            if (
              questionnaireIdsInSuccess.includes(interrogation.questionnaireId)
            ) {
              localSyncStorage.addIdToInterrogationsSuccess(interrogation.id)
            }
            dispatch(actions.downloadInterrogationCompleted())
          }),
        )
      } else {
        // we could not find the list from local storage, so we start the legacy strategy
        ;({ questionnaireIdsInSuccess, questionnaires, prInterrogations } =
          await legacyDownload({ dispatch, context }))
      }

      /*
       * Nomenclature
       */

      const suggestersNames = deduplicate(
        questionnaires
          .map((q) => q?.suggesters)
          .flat()
          .map((suggester) => suggester?.name),
      )

      dispatch(
        actions.setDownloadTotalNomenclature({
          totalNomenclature: suggestersNames.length,
        }),
      )

      //We don't store the data, but instead, we simply initiate the request for the service worker to cache the response
      const prNomenclatures = Promise.all(
        suggestersNames.map((nomenclatureId) =>
          queenApi
            .getNomenclature(nomenclatureId)
            .catch((error) => {
              console.error(
                `Nomenclature : An error occurred and we were unable to retrieve nomenclature ${nomenclatureId}`,
                error,
              )
            })
            .finally(() => {
              dispatch(actions.downloadNomenclatureCompleted())
            }),
        ),
      )

      /*
       * External special ressources
       */

      // we sychronize the external ressource only if there is a url for getting them
      if (EXTERNAL_RESOURCES_URL) {
        // get the list of external questionnaires
        const externalQuestionnaires = await getExternalQuestionnaires().catch(
          (error) => {
            if (
              error instanceof AxiosError &&
              error.response &&
              [400, 403, 404, 500].includes(error.response.status)
            ) {
              console.error(
                `An error occurred while fetching external questionnaires list`,
                error,
              )
            }
            throw error
          },
        )

        const { neededQuestionnaires, notNeededQuestionnaires } =
          getExternalQuestionnaireFiltered(
            questionnaireIdsInSuccess,
            externalQuestionnaires,
          )

        // set the total of needed external questionnaires for progress bar
        dispatch(
          actions.setDownloadTotalExternalResources({
            totalExternalResources: neededQuestionnaires.length,
          }),
        )

        // add in cache the missing external resources for needed questionnaires
        const prGetExternalResources = (neededQuestionnaires || []).reduce(
          async (previousPromise, questionnaire) => {
            await previousPromise

            return getResourcesFromExternalQuestionnaire({
              questionnaire: questionnaire,
              callBackTotal: (total: number) =>
                dispatch(
                  actions.setDownloadTotalExternalResourcesByQuestionnaire({
                    totalExternalResourcesByQuestionnaire: total,
                  }),
                ),
              callBackReset: () =>
                dispatch(actions.downloadExternalResourceReset()),
              callBackUnit: () =>
                dispatch(
                  actions.downloadExternalResourceByQuestionnaireCompleted(),
                ),
            })
              .then(() => {
                dispatch(actions.setDownloadExternalResourcesCompleted())
              })
              .catch((error) =>
                console.error(
                  `An error occurred while fetching external resources of questionnaire ${questionnaire.id}`,
                  error,
                ),
              )
          },
          Promise.resolve(),
        )

        // delete the cache of every not needed external questionnaires
        const prDeleteExternalResources = Promise.all(
          notNeededQuestionnaires.map((questionnaire) =>
            caches.delete(questionnaire.cacheName),
          ),
        )

        // delete the root-cache of external resources if no external questionnaire is needed
        const prDeleteExternalRootCache =
          neededQuestionnaires.length === 0
            ? caches.delete(EXTERNAL_RESOURCES_ROOT_CACHE_NAME)
            : Promise.resolve()

        // delete old caches (that are not in external questionnaires list but sill in browser) :
        const oldExternalCacheNames =
          await getOldExternalCacheNames(neededQuestionnaires)

        const prDeleteOldExternalCaches = Promise.all(
          oldExternalCacheNames.map((cacheName) => caches.delete(cacheName)),
        )

        // We await untill the promises for external resources are finished
        await Promise.all([
          prGetExternalResources,
          prDeleteExternalResources,
          prDeleteExternalRootCache,
          prDeleteOldExternalCaches,
        ])
      }

      // We await untill all the promises are finished
      await Promise.all([prInterrogations, prNomenclatures])

      clearInterrogationIds()

      dispatch(actions.downloadCompleted())
    } catch (error) {
      console.error(
        'An unknown error occurred while we were fetching data so we stop the synchronization.',
        error,
      )
      localSyncStorage.addError(true)
      clearInterrogationIds()
      dispatch(actions.downloadFailed())
      throw error
    }
  },

  // Clean up interrogations by removing those not in local storage
  cleanupInterrogations: () => async (_dispatch, _getState, context) => {
    const { dataStore } = context

    try {
      // Get interrogation IDs from local storage (provided by pilotage)
      const localStorageInterrogationIds = getExpectedInterrogationIds()

      // No interrogation IDs found in local storage, skipping cleanup
      if (!localStorageInterrogationIds) {
        return
      }

      // Get all interrogations from the browser questionnaire database (indexedDB)
      const allInterrogations = await dataStore.getAllInterrogations()

      // No interrogations found in database, skipping cleanup'
      if (!allInterrogations || allInterrogations.length === 0) {
        return
      }

      // Create a Set of IDs from local storage for faster lookup
      const localStorageIdsSet = new Set(localStorageInterrogationIds)

      // Find interrogations that are in the database but not in local storage
      const interrogationsToDelete = allInterrogations.filter(
        (interrogation) => !localStorageIdsSet.has(interrogation.id),
      )

      // No differential interrogations found, skipping cleanup
      if (interrogationsToDelete.length === 0) {
        return
      }

      // Delete the differential interrogations
      await Promise.all(
        interrogationsToDelete.map((interrogation) =>
          dataStore.deleteInterrogation(interrogation.id),
        ),
      )
    } catch (error) {
      console.error('Error during interrogation cleanup:', error)
      throw error
    }
  },

  // Upload the data to the server
  upload:
    () =>
    async (...args) => {
      const [dispatch, getState, { dataStore, queenApi, localSyncStorage }] =
        args

      const state = getState()[name]

      if (state.stateDescription === 'running' && state.type === 'upload') {
        return
      }

      dispatch(actions.runningUpload())

      //  If localStorageData exists, we refresh it; otherwise, we initialize it.
      localSyncStorage.saveObject({
        error: false,
        interrogationsInTempZone: [],
        interrogationsSuccess: [],
      })

      try {
        /*
         * Interrogations
         */

        const interrogations = await dataStore.getAllInterrogations()
        const allParadata = await dataStore.getAllParadata()
        // Track deleted paradata IDs
        const deletedParadataIds = new Set<string>()

        if (interrogations) {
          // Filter interrogations to only upload those that have been updated
          const interrogationsToUpload = interrogations.filter(
            (interrogation) => (interrogation.hasBeenUpdated ?? true) === true,
          )

          dispatch(
            actions.setUploadTotalInterrogation({
              totalInterrogation: interrogationsToUpload.length ?? 0,
            }),
          )

          const interrogationPromises = interrogationsToUpload.map(
            (localInterrogation) => {
              // Create a copy of the interrogation without the hasBeenUpdated field for API
              const interrogation =
                interrogationFromLocalInterrogation(localInterrogation)

              return queenApi
                .putInterrogation(interrogation)
                .catch((error: AxiosError) => {
                  // handle response 423 as a success
                  if (error.response!.status === 423) {
                    return Promise.resolve()
                  }
                  if (
                    error.response &&
                    [400, 403, 404, 500].includes(error.response.status)
                  ) {
                    return queenApi
                      .postInterrogationInTemp(interrogation)
                      .then(() => {
                        localSyncStorage.addIdToInterrogationsInTempZone(
                          interrogation.id,
                        )
                        dataStore.deleteParadata(interrogation.id)
                        deletedParadataIds.add(interrogation.id)
                      })
                      .catch((postError: Error) => {
                        console.error(
                          'Error: Unable to post interrogation in tempZone',
                          postError,
                        )
                        throw postError
                      })
                  }
                  throw error
                })
                .then(() => {
                  // Set locally the interrogation as not updated after successful upload.
                  return dataStore.updateInterrogation({
                    ...localInterrogation,
                    hasBeenUpdated: false,
                  })
                })
                .then(() => {
                  dispatch(actions.uploadInterrogationCompleted())
                })
                .catch((error) => {
                  console.error('Error: Unable to upload data', error)
                  throw error
                })
            },
          )
          await Promise.all(interrogationPromises)
        }

        /*
         * Paradata
         */

        if (IS_TELEMETRY_ENABLED) {
          // filter allParadata to only send those that weren’t deleted before
          const paradataToUpload = allParadata?.filter(
            (paradata) => !deletedParadataIds.has(paradata.idInterrogation),
          )

          if (paradataToUpload) {
            dispatch(
              actions.setUploadTotalParadata({
                totalParadata: paradataToUpload.length ?? 0,
              }),
            )

            const paradataPromises = paradataToUpload.map((paradata) =>
              queenApi
                .postParadata(paradata)
                .then(() => dataStore.deleteParadata(paradata.idInterrogation))
                .then(() => {
                  dispatch(actions.uploadParadataCompleted())
                })
                .catch((error) => {
                  console.error(
                    `Error: Unable to upload paradata for interrogation ${paradata.idInterrogation}`,
                    error,
                  )
                }),
            )

            await Promise.all(paradataPromises)
          }
        }

        dispatch(actions.uploadCompleted())
      } catch (e) {
        localSyncStorage.addError(true)
        dispatch(actions.uploadError())
        throw e
      }
    },
} satisfies Thunks

/**
 * Remove undefined values from an array and remove duplicates
 */
function deduplicate<T>(items: (T | undefined)[]): T[] {
  return [...new Set(items.filter((data) => !!data))] as T[]
}

/**
 * Get the list of interrogations ids from local storage
 */
function getExpectedInterrogationIds() {
  const localStorageInterrogationsValue = localStorage.getItem(
    INTERROGATIONS_LIST_LOCAL_STORAGE_KEY,
  )

  if (!localStorageInterrogationsValue) {
    return undefined
  }

  try {
    const parsedInterrogationIds = JSON.parse(localStorageInterrogationsValue)

    if (!Array.isArray(parsedInterrogationIds)) {
      return undefined
    }

    return parsedInterrogationIds.filter(
      (interrogationId): interrogationId is string =>
        typeof interrogationId === 'string',
    )
  } catch (error) {
    console.error('Unable to parse interrogation ids from localStorage', error)
    return undefined
  }
}

/**
 * Clear the list of interrogation ids from local storage
 */
function clearInterrogationIds() {
  localStorage.removeItem(INTERROGATIONS_LIST_LOCAL_STORAGE_KEY)
}

/**
 * Legacy strategy for getting questionnaires & interrogations from api using campaigns
 */
async function legacyDownload({
  dispatch,
  context,
}: {
  dispatch: any
  context: {
    queenApi: QueenApi
    dataStore: DataStore
    localSyncStorage: LocalSyncStorage
  }
}) {
  const { queenApi, dataStore, localSyncStorage } = context
  const campaigns = await queenApi.getCampaigns()

  const campaignsIds = campaigns.map(({ id }) => id) ?? []

  //extract all questionnaireIds without duplicate
  const questionnaireIds = [
    ...new Set(
      campaigns.map(({ questionnaireIds }) => questionnaireIds).flat() ?? [],
    ),
  ]

  dispatch(
    actions.setDownloadTotalSurvey({
      totalSurvey: questionnaireIds.length,
    }),
  )

  /*
   * Survey
   */

  //We need surveyResults before fetching Interrogation so we await.
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
            ` Questionnaire : An error occurred and we were unable to retrieve survey ${questionnaireId}`,
          )
          return {
            success: false as const,
            questionnaireId,
            questionnaire: undefined,
          }
        }),
    ),
  )

  const { questionnaireIdsInSuccess, questionnaires } = surveyResults.reduce(
    (acc, result) => {
      if (result.success) {
        acc.questionnaireIdsInSuccess.push(result.questionnaireId)
        acc.questionnaires.push(result.questionnaire)
      }
      return acc
    },
    { questionnaireIdsInSuccess: [], questionnaires: [] } as {
      questionnaireIdsInSuccess: string[]
      questionnaires: Questionnaire[]
    },
  )

  /*
   * Interrogation
   */
  const prInterrogations = await Promise.all(
    campaignsIds.map((campaignId) =>
      queenApi
        .getInterrogationsIdsAndQuestionnaireIdsByCampaign(campaignId)
        .then((arrayOfIds) => {
          dispatch(
            actions.updateDownloadTotalInterrogation({
              totalInterrogation: arrayOfIds.length,
            }),
          )
          return Promise.all(
            arrayOfIds.map(({ id }) =>
              queenApi
                .getInterrogation(id)
                .then((interrogation) => {
                  dataStore.updateInterrogation(interrogation)
                  return questionnaireIdsInSuccess.includes(
                    interrogation.questionnaireId,
                  )
                })
                .then((isSurveyWellDownload) => {
                  if (isSurveyWellDownload) {
                    localSyncStorage.addIdToInterrogationsSuccess(id)
                  }
                  dispatch(actions.downloadInterrogationCompleted())
                })
                .catch((error) => {
                  if (
                    error instanceof AxiosError &&
                    error.response &&
                    [400, 403, 404, 500].includes(error.response.status)
                  ) {
                    console.error(
                      `An error occurred while fetching interrogation : ${id}, synchronization continue`,
                      error,
                    )
                    return
                  }
                  throw error
                }),
            ),
          )
        }),
    ),
  )

  return {
    questionnaireIdsInSuccess,
    questionnaires,
    prInterrogations,
  }
}
