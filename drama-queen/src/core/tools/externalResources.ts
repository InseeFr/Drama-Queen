import type {
  ExternalQuestionnaire,
  ExternalQuestionnaires,
  ExternalQuestionnairesFiltered,
  ExternalQuestionnairesWrapper,
  Manifest,
} from 'core/model'
import { fetchUrl } from './fetchUrl'

// Get the list of external questionnaires from url
export async function getExternalQuestionnaires(
  baseUrl: string
): Promise<ExternalQuestionnaires> {
  const questionnairesWrapper = await fetchUrl<ExternalQuestionnairesWrapper>({
    url: `${baseUrl}/gide-questionnaires.json`,
  })

  return questionnairesWrapper.questionnaires
}

// Get the list of external resource URLs for a questionnaireId from url
async function getTransformedManifest(
  baseUrl: string,
  questionnaireId: string
): Promise<string[]> {
  // get the manifest for a questionnaireId
  const manifest = await fetchUrl<Manifest>({
    url: `${baseUrl}/${questionnaireId}/assets-manifest.json`,
  })

  // Transform the manifest values into resource URLs, and get an array of these resource URLs
  const transformedManifest = Object.values(manifest).map(
    (resourceUrl) => `${baseUrl}/${resourceUrl}`
  )

  return transformedManifest
}

// Filter resources from manifest that are already cached, to avoid useless requests (overly large files).
async function filterTransformedManifest(
  cacheName: string,
  transformedManifest: string[]
): Promise<string[]> {
  // Open the specified cache
  const cacheForManifest = await caches.open(cacheName)

  // If cache is not available, return a copy of transformedManifest
  if (!cacheForManifest) {
    return [...transformedManifest]
  }

  // Get all urls from the cache
  const cachedUrls = (await cacheForManifest.keys()).map(
    (request) => request.url
  )

  // filter the transformedManifest for keeping only files that are not cached yet
  const uncachedResources = transformedManifest.filter(
    (resourceUrl) => !cachedUrls.includes(resourceUrl)
  )

  return uncachedResources
}

// Cache every external resources (not already cached) for a particular questionnaire
export async function getResourcesFromExternalQuestionnaire(
  baseUrl: string,
  questionnaire: ExternalQuestionnaire
): Promise<void> {
  const transformedManifest = await getTransformedManifest(
    baseUrl,
    questionnaire.id
  )

  const filteredTransformedManifest = await filterTransformedManifest(
    questionnaire.cacheName,
    transformedManifest
  )

  const manifestCache = await caches.open(questionnaire.cacheName)
  return await manifestCache.addAll(filteredTransformedManifest)
}

// Separate, from the list of external questionnaires, those that are needed and those that are not needed
export function getExternalQuestionnaireFiltered(
  neededQuestionnaireIds: string[] = [],
  externalQuestionnaires: ExternalQuestionnaires = []
): ExternalQuestionnairesFiltered {
  return externalQuestionnaires.reduce(
    (result, questionnaire) => {
      // Check if the current questionnaire's id matches any of the needed IDs
      const isNeeded = neededQuestionnaireIds.some((neededId) =>
        neededId.toLowerCase().includes(questionnaire.id.toLowerCase())
      )

      // If the external questionnaire is needed
      if (isNeeded) {
        result.neededQuestionnaires.push(questionnaire)
      }
      // If it's not needed
      else {
        result.notNeededQuestionnaires.push(questionnaire)
      }

      // Return the updated result object after processing this questionnaire
      return result
    },
    // Initial value of result: an object with two empty arrays (needed and noNeeded)
    {
      neededQuestionnaires: [],
      notNeededQuestionnaires: [],
    } as ExternalQuestionnairesFiltered
  )
}
