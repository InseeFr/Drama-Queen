import type { Thunks } from "core/bootstrap";
import { actions, name } from "./state";
import type { AxiosError } from "axios";

export const thunks = {
  download:
    () =>
    async (...args) => {
      const [dispatch, getState, { queenApi, dataStore }] = args;

      {
        const state = getState()[name];

        if (state.stateDescription === "running") {
          return;
        }
      }

      dispatch(actions.runningDownload());

      /**
       * Pre-requis
       */
      const campaigns = await queenApi.getCampaigns();

      const campaignsIds = campaigns.map(({ id }) => id) ?? [];
      const questionnaireIds = [
        ...new Set(
          campaigns.map(({ questionnaireIds }) => questionnaireIds).flat() ?? []
        ),
      ];

      dispatch(
        actions.setDownloadTotalSurvey({ totalSurvey: questionnaireIds.length })
      );

      /*
       * SurveyUnit
       */

      const surveyUnitSuccess: string[] = [];

      const prSurveyUnit = campaignsIds.map((campaignId) =>
        queenApi
          .getSurveyUnitsIdsAndQuestionnaireIdsByCampaign(campaignId)
          .then((arrayOfIds) => {
            dispatch(
              actions.updateDownloadTotalSurveyUnit({
                totalSurveyUnit: arrayOfIds.length,
              })
            );
            return Promise.all(
              arrayOfIds.map(({ id }) =>
                queenApi
                  .getSurveyUnit(id)
                  .then((surveyUnit) => dataStore.updateSurveyUnit(surveyUnit))
                  .then(() => {
                    surveyUnitSuccess.push(id);
                    dispatch(actions.downloadSurveyUnitCompleted());
                  })
              )
            );
          })
      );

      await Promise.all(prSurveyUnit);

      //TODO -> Save surveyUnitSuccess
      /*
       * Survey
       */

      const questionnaires = await Promise.all(
        questionnaireIds.map((questionnaireId) =>
          queenApi
            .getQuestionnaire(questionnaireId)
            .then((questionnaire) => {
              dispatch(actions.downloadSurveyCompleted());
              return questionnaire;
            })
            .catch(() => {
              //TODO Handle error
              console.error(
                ` Questionnaire : An error occurred and we were unable to retrieve survey ${questionnaireId}`
              );
              return undefined;
            })
        )
      );

      /*
       * Nomenclature
       */

      const suggestersNames = deduplicate(
        questionnaires
          .map((q) => q?.suggesters)
          .flat()
          .map((suggester) => suggester?.name)
      );

      dispatch(
        actions.setDownloadTotalNomenclature({
          totalNomenclature: suggestersNames.length,
        })
      );

      //We don't store the data, but instead, we simply initiate the request for the service worker to cache the response
      await Promise.all(
        suggestersNames.map((nomenclatureId) =>
          queenApi
            .getNomenclature(nomenclatureId)
            .catch(() => {
              //TODO Handle Errors
              console.error(
                `Nomenclature : An error occurred and we were unable to retrieve nomenclature ${nomenclatureId}`
              );
            })
            .finally(() => dispatch(actions.downloadNomenclatureCompleted()))
        )
      );

      dispatch(actions.downloadCompleted());
    },
  upload:
    () =>
    async (...args) => {
      const [dispatch, getState, { dataStore, queenApi }] = args;

      {
        const state = getState()[name];

        if (state.stateDescription === "running") {
          return;
        }
      }

      dispatch(actions.runningUpload());

      try {
        const prSurveyUnits = dataStore.getAllSurveyUnits();
        const surveyUnits = await prSurveyUnits;
        const surveyUnitsInTemp: string[] = [];

        if (surveyUnits) {
          dispatch(actions.setUploadTotal({ total: surveyUnits.length ?? 0 }));

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
                    .then(() => surveyUnitsInTemp.push(surveyUnit.id));
                } else {
                  throw error;
                }
              })
              .then((result) => {
                return dataStore.deleteSurveyUnit(surveyUnit.id);
              })
              .then(() => {
                dispatch(actions.uploadSurveyUnitCompleted());
              })
              .catch((error) => {
                // TODO: Handle the error as needed -> Save LocalStorage
                console.error(error);
                dispatch(actions.uploadError());
              })
          );
          await Promise.all(surveyUnitPromises);
        }

        dispatch(actions.uploadCompleted());
        dispatch(thunks.download());
      } catch (error) {
        // TODO : Handle errors from prSurveyUnits
        console.error(error);
        dispatch(actions.uploadError());
      }
    },
} satisfies Thunks;

/**
 * Remove undefined values from an array and remove duplicates
 */
function deduplicate<T>(items: (T | undefined)[]): T[] {
  return [...new Set(items.filter((data) => !!data))] as T[];
}
