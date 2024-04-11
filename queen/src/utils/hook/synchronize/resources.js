import { chunk, getPercent } from 'utils';
import {
  CAMPAIGN_WITH_SOUND_KEYWORD,
  EXTERNAL_RESOURCES_BASE_URL,
  EXTERNAL_RESOURCES_CACHE_NAME,
  EXTERNAL_RESOURCES_ROOT_CACHE_NAME,
} from 'utils/constants';
import { getSpecialResource, useAPI, useAsyncValue } from 'utils/hook';

const getAllQuestionnaireIdsFromCampaign = (listOfCampaigns = []) =>
  listOfCampaigns.reduce((finalIds, { questionnaireIds }) => {
    return [...finalIds, ...questionnaireIds];
  }, []);

const asyncFilter = async (arr, predicate) =>
  arr.reduce(async (memo, e) => ((await predicate(e)) ? [...(await memo), e] : memo), []);

export const usePutResourcesInCache = updateProgress => {
  const { getRequiredNomenclatures, getNomenclature } = useAPI();

  const refreshGetRequiredNomenclatures = useAsyncValue(getRequiredNomenclatures);
  const refreshGetNomenclature = useAsyncValue(getNomenclature);

  const putResourcesInCache = async questionnaireId => {
    const ressourcesFailed = [];
    const { data, error: mainError } = await refreshGetRequiredNomenclatures.current(
      questionnaireId
    );
    if (!mainError) {
      updateProgress(0);
      await (data || []).reduce(async (previousPromise, resourceId) => {
        await previousPromise;
        const putResource = async () => {
          const { error, status, statusText } = await refreshGetNomenclature.current(resourceId);
          if (error) {
            if ([400, 403, 404, 500].includes(status)) {
              ressourcesFailed.push(resourceId);
            } else {
              throw new Error(statusText);
            }
          }
        };

        return putResource();
      }, Promise.resolve());
      updateProgress(100);
      return { success: ressourcesFailed.length === 0, ressourcesFailed };
    } else {
      return { success: false, ressourcesFailed };
    }
  };

  const putAllResourcesInCache = async questionnaireIds => {
    const questionnaireIdsSuccess = [];
    let i = 0;
    updateProgress(0);
    await (questionnaireIds || []).reduce(async (previousPromise, questionnaireId) => {
      await previousPromise;
      const putAllResources = async () => {
        const { success } = await putResourcesInCache(questionnaireId);
        if (success) questionnaireIdsSuccess.push(questionnaireId);
      };

      i += 1;
      updateProgress(getPercent(i, questionnaireIds.length));
      return putAllResources();
    }, Promise.resolve());
    return questionnaireIdsSuccess;
  };

  return putAllResourcesInCache;
};

/**
 * getExternalQuestionnaireFiltered
 * @param {*} listOfCampaigns ex: [{ "id": "camapaign-toto-2", "questionnaireIds":["gide-toto-2-fsdljfh"] }]
 * @param {*} listOfExternalQuestionnaires ex: [{ "id": "gide-toto-2", "cacheName": "cache-toto-2" }, { "id": "toto-3", "cacheName": "cache-toto-3" }]
 * @returns {} { needed: [{ "id": "gide-toto-2", "cacheName": "cache-toto-2" }], noNeeded: [{ "id": "toto-3", "cacheName": "cache-toto-3" }]}
 */
export const getExternalQuestionnaireFiltered = (
  listOfCampaigns = [],
  listOfExternalQuestionnaires = []
) => {
  const questionnaireIdsFromCampaign = getAllQuestionnaireIdsFromCampaign(listOfCampaigns);

  return {
    needed: listOfExternalQuestionnaires.filter(
      ({ id }) =>
        questionnaireIdsFromCampaign.filter(questionnaireID =>
          `${questionnaireID}`.toLowerCase().includes(`${id}`.toLowerCase())
        ).length > 0
    ),
    noNeeded: listOfExternalQuestionnaires.filter(
      ({ id }) =>
        questionnaireIdsFromCampaign.filter(questionnaireID =>
          `${questionnaireID}`.toLowerCase().includes(`${id}`.toLowerCase())
        ).length === 0
    ),
  };
};

/**
 * Return true if one of questionnaireId of campaign contains id of gide questionnaire
 * Ex: if questionnaireIDs = [ "gide-toto-2-2024-test"] adn id of gide questionnaire = ["gide-toto-2"], these function returns true
 * (because "gide-toto-2" is include inside "gide-toto-2-2024-test")
 */
export const areExternalResourcesNeeded = async (
  listOfCampaigns = [],
  listOfExternalQuestionnaires = []
) => {
  const { needed } = getExternalQuestionnaireFiltered(
    listOfCampaigns,
    listOfExternalQuestionnaires
  );
  return needed.length > 0;
};

export const useSpecialResourcesInCache = updateProgress => {
  // Return all available gide bundle questionnaire list of {id, cacheName}
  const getExternalQuestionnaires = async () => {
    const {
      data: questionnaireData,
      error,
      statusText,
    } = await getSpecialResource(`${EXTERNAL_RESOURCES_BASE_URL}/gide-questionnaires.json`);
    if (error) throw new Error(statusText);
    return questionnaireData.questionnaires;
  };

  const getManifestResources = async questionnaireId => {
    const {
      data: manifest,
      error,
      statusText,
    } = await getSpecialResource(
      `${EXTERNAL_RESOURCES_BASE_URL}/${questionnaireId}/assets-manifest.json`
    );
    if (error) throw new Error(statusText);
    return manifest;
  };

  const getAllResourcesFromManifest = async manifest => {
    // Add capmi url in resources's url
    const transformManifest = Object.entries(manifest).map(([, resourceUrl]) => {
      return `${EXTERNAL_RESOURCES_BASE_URL}/${resourceUrl}`;
    });
    let i = 0;

    // Filter resources from manifest to avoid useless requests in order speed up synchronisation
    // We keep only resources that are not in cache
    const transformManifestFiltered = await asyncFilter(transformManifest, async resourceUrl => {
      const cacheResponse = await caches.match(resourceUrl);
      return !(cacheResponse && cacheResponse.ok);
    });

    const transformManifestFilteredChunked = chunk(transformManifestFiltered, 10);

    updateProgress(0);
    await (transformManifestFilteredChunked || []).reduce(async (previousPromise, subManifest) => {
      await previousPromise;

      const putSubManifestInCache = async () => {
        await Promise.allSettled(
          subManifest.map(async resourceUrl => {
            await getSpecialResource(resourceUrl);
          })
        );
      };

      i += 1;
      updateProgress(getPercent(i, transformManifestFilteredChunked.length));
      return putSubManifestInCache();
    }, Promise.resolve());
    updateProgress(100);
  };

  const getAndCleanExternalResources = async (listOfCampaigns, listOfExternalQuestionnaires) => {
    const { needed = [], noNeeded = [] } = getExternalQuestionnaireFiltered(
      listOfCampaigns,
      listOfExternalQuestionnaires
    );

    // Description of steps
    // (1): put in cache if resources is not present
    // (2): delete cache for questionnaires that are useless
    // (3): delete root-cache (global entry.js and gide-questionnaires.json)
    // (4): delete old caches (with "gide" in name of cache) that are not described by gide-questionnaires.json

    // (1) Retrive all needed external questionnaire's resources : all questionnaire described by needed list
    // (1.1) Merge all manifest files
    const mergedManifest = await needed.reduce(async (previousPromise, { id }) => {
      const finalManifest = await previousPromise;
      const newManifest = await getManifestResources(id);
      const transformManifest = Object.fromEntries(
        Object.entries(newManifest).map(([resourceName, resourceUrl]) => {
          return [`${id}-${resourceName}`, resourceUrl];
        })
      );
      return { ...finalManifest, ...transformManifest };
    }, {});
    // (1.2) Retrieve all resources from mergedManifest
    await getAllResourcesFromManifest(mergedManifest);

    // (2) Delete cache for all no needed questionnaire : all questionnaire described by noNeeded list
    await noNeeded.reduce(async (previousPromise, { cacheName }) => {
      await previousPromise;
      const clearExternalResources = async () => {
        await caches.delete(cacheName);
      };
      return clearExternalResources();
    }, Promise.resolve());

    // (3): optional, if no questionnaire needed, delete root cache
    if (needed.length === 0) {
      await caches.delete(EXTERNAL_RESOURCES_ROOT_CACHE_NAME);
    }
    // (4): delete old caches (that are not in gides-questionnaire.json but sill in browser)
    const neededCaches = needed.map(({ cacheName }) => cacheName);
    // Keep caches from all caches where cacheName include "gide" and that are not in needed cache list
    const oldFideCaches = (await caches.keys()).filter(
      name =>
        name.toLowerCase().includes(CAMPAIGN_WITH_SOUND_KEYWORD) && !neededCaches.includes(name)
    );
    await oldFideCaches.reduce(async (previousPromise, cacheName) => {
      await previousPromise;
      const clearExternalResources = async () => {
        await caches.delete(cacheName);
      };
      return clearExternalResources();
    }, caches.delete(EXTERNAL_RESOURCES_CACHE_NAME));
  };

  return { getAndCleanExternalResources, getExternalQuestionnaires };
};
