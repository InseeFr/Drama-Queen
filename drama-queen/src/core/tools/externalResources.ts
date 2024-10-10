import type {
  ExternalQuestionnaire,
  ExternalQuestionnaires,
  ExternalQuestionnairesWrapper,
  Manifest,
} from 'core/model'
import { fetchUrl } from './fetchUrl'

export async function getExternalQuestionnaires(
  baseUrl: string
): Promise<ExternalQuestionnaires> {
  const questionnairesWrapper = await fetchUrl<ExternalQuestionnairesWrapper>({
    url: `${baseUrl}/gide-questionnaires.json`,
  })

  return questionnairesWrapper.questionnaires
}

export async function getTransformedManifest(
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

async function asyncFilter<T>(
  arr: T[],
  predicate: (element: T) => Promise<boolean>
): Promise<T[]> {
  // Map each element to a promise that resolves to a boolean
  const results = await Promise.all(arr.map(predicate))

  // Return elements where the corresponding result is true
  return arr.filter((_, index) => results[index])
}

// Filter resources from manifest that are already cached, to avoid useless requests (overly large files).
export async function filterTransformedManifest(
  cacheName: string,
  transformedManifest: string[]
): Promise<string[]> {
  // Open the specified cache
  const cacheForManifest = await caches.open(cacheName)

  // If the cache is available, filter the transformedManifest for keeping only files that are not cached yet
  if (cacheForManifest) {
    return await asyncFilter(transformedManifest, async (resourceUrl) => {
      const cacheResponse = await cacheForManifest.match(resourceUrl)
      return !cacheResponse?.ok
    })
  }

  // If cache is not available, return a copy of transformedManifest
  return [...transformedManifest]
}

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
