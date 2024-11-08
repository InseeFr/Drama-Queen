import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import {
  filterTransformedManifest,
  getExternalQuestionnaireFiltered,
  getExternalQuestionnaires,
  getOldExternalCacheNames,
  getTransformedManifest,
} from './externalResources'
import { fetchUrl } from './fetchUrl'
import type {
  ExternalQuestionnaire,
  ExternalQuestionnaires,
  ExternalQuestionnairesFiltered,
  ExternalQuestionnairesWrapper,
  Manifest,
} from 'core/model'
import { EXTERNAL_RESOURCES_URL } from 'core/constants'

vi.mock('./fetchUrl', () => {
  return {
    fetchUrl: vi.fn(),
  }
})

describe('getExternalQuestionnaires', () => {
  it('should fetch and return list of external questionnaires', async () => {
    // we must mock the response of fetch, expected to be ExternalQuestionnairesWrapper type
    const questionnairesList: ExternalQuestionnairesWrapper = {
      questionnaires: [
        { id: 'q1', cacheName: 'cache1' },
        { id: 'q2', cacheName: 'cache2' },
      ],
      version: '1.0.0',
    }

    // Mock fetchUrl to return the mockQuestionnaires
    vi.mocked(fetchUrl).mockResolvedValueOnce(questionnairesList)

    const result = await getExternalQuestionnaires()

    // Assert fetchUrl was called with the correct url
    expect(fetchUrl).toHaveBeenCalledWith({
      url: `${EXTERNAL_RESOURCES_URL}/gide-questionnaires.json`,
    })

    expect(result).toEqual(questionnairesList.questionnaires)
  })

  it('should return a empty list', async () => {
    const emptyQuestionnaires: ExternalQuestionnairesWrapper = {
      questionnaires: [],
    }
    vi.mocked(fetchUrl).mockResolvedValueOnce(emptyQuestionnaires)

    const result = await getExternalQuestionnaires()

    expect(result).toEqual([])
  })
})

describe('getTransformedManifest', () => {
  const questionnaireId = 'questionnaire-2024'

  it('should fetch and transform the manifest for a questionnaire', async () => {
    // we must mock the response of fetch, expected to be Manifest type
    const manifest: Manifest = {
      resource1: 'qt/resource1',
      resource2: 'qt/resource2',
    }

    // Mock fetchUrl to return the mockManifest
    vi.mocked(fetchUrl).mockResolvedValueOnce(manifest)

    const result = await getTransformedManifest(questionnaireId)

    // Assert fetchUrl was called with the correct URL
    expect(fetchUrl).toHaveBeenCalledWith({
      url: `${EXTERNAL_RESOURCES_URL}/${questionnaireId}/assets-manifest.json`,
    })

    const expectedResult = [
      `${EXTERNAL_RESOURCES_URL}/qt/resource1`,
      `${EXTERNAL_RESOURCES_URL}/qt/resource2`,
    ]

    expect(result).toEqual(expectedResult)
  })

  it('should return a empty manifest', async () => {
    const emptyManifest: Manifest = {}
    vi.mocked(fetchUrl).mockResolvedValueOnce(emptyManifest)

    const result = await getTransformedManifest(questionnaireId)

    expect(result).toEqual([])
  })
})

describe('filterTransformedManifest', () => {
  const mockCaches: Record<string, any> = {}

  const getMockCache = (cacheName: string) => {
    if (!mockCaches[cacheName]) {
      mockCaches[cacheName] = {
        keys: vi.fn().mockResolvedValue([]), // Initialize with an empty keys method
      }
    }
    return mockCaches[cacheName]
  }

  beforeAll(() => {
    // Mock the global caches object
    ;(global as any).caches = {
      open: vi.fn().mockImplementation(async (cacheName: string) => {
        return getMockCache(cacheName)
      }),
    }
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return an array with uncached resources', async () => {
    const cacheName = 'testCache'
    const transformedManifest = [
      'https://example.com/resource1',
      'https://example.com/resource3',
      'https://example.com/resource4',
    ]

    const mockCache = getMockCache(cacheName)

    // Initialize the cached resources for the specific cacheName
    mockCache.keys.mockResolvedValueOnce([
      new Request('https://example.com/resource1'),
      new Request('https://example.com/resource2'),
    ])

    const result = await filterTransformedManifest(
      cacheName,
      transformedManifest
    )

    const expectedResult = [
      'https://example.com/resource3',
      'https://example.com/resource4',
    ]

    expect(result).toEqual(expectedResult)
  })

  it('should return all transformedManifest if cache is empty', async () => {
    const cacheName = 'emptyCache'
    const transformedManifest = [
      'https://example.com/resource1',
      'https://example.com/resource3',
    ]

    const mockCache = getMockCache(cacheName)

    // Initialize the cached resources (empty list) for the specific cacheName
    mockCache.keys.mockResolvedValueOnce([])

    const result = await filterTransformedManifest(
      cacheName,
      transformedManifest
    )

    expect(result).toEqual(transformedManifest)
  })

  it('should return an empty array if transformedManifest is empty', async () => {
    const cacheName = 'testCache'
    const transformedManifest: string[] = []

    const result = await filterTransformedManifest(
      cacheName,
      transformedManifest
    )

    expect(result).toEqual([])
  })
})

describe('getExternalQuestionnaireFiltered', () => {
  it('should separate needed and not needed questionnaires', () => {
    const neededIds = ['quest-2024-v2', 'quest-2025']
    const externalQuestionnaires: ExternalQuestionnaires = [
      { id: 'quest-2024', cacheName: 'cache1' },
      { id: 'quest-2025', cacheName: 'cache2' },
      { id: 'quest-2026', cacheName: 'cache3' },
    ]

    const result: ExternalQuestionnairesFiltered =
      getExternalQuestionnaireFiltered(neededIds, externalQuestionnaires)

    expect(result.neededQuestionnaires).toEqual([
      { id: 'quest-2024', cacheName: 'cache1' },
      { id: 'quest-2025', cacheName: 'cache2' },
    ])
    expect(result.notNeededQuestionnaires).toEqual([
      { id: 'quest-2026', cacheName: 'cache3' },
    ])
  })

  it('should return all questionnaires as needed', () => {
    const neededIds = ['quest-2024-v2', 'quest-2025']
    const externalQuestionnaires: ExternalQuestionnaires = [
      { id: 'quest-2024', cacheName: 'cache1' },
      { id: 'quest-2025', cacheName: 'cache2' },
    ]

    const result: ExternalQuestionnairesFiltered =
      getExternalQuestionnaireFiltered(neededIds, externalQuestionnaires)

    expect(result.neededQuestionnaires).toEqual(externalQuestionnaires)
    expect(result.notNeededQuestionnaires).toEqual([])
  })

  it('should return all questionnaires as not needed if none match', () => {
    const neededIds = ['quest-2024-v2', 'quest-2025']
    const externalQuestionnaires: ExternalQuestionnaires = [
      { id: 'quest-2026', cacheName: 'cache1' },
      { id: 'quest-2027', cacheName: 'cache2' },
    ]

    const result: ExternalQuestionnairesFiltered =
      getExternalQuestionnaireFiltered(neededIds, externalQuestionnaires)

    expect(result.neededQuestionnaires).toEqual([])
    expect(result.notNeededQuestionnaires).toEqual(externalQuestionnaires)
  })

  it('should handle empty external questionnaires list', () => {
    const neededIds: string[] = ['quest-2024-v2', 'quest-2025']
    const externalQuestionnaires: ExternalQuestionnaires = []

    const result: ExternalQuestionnairesFiltered =
      getExternalQuestionnaireFiltered(neededIds, externalQuestionnaires)

    expect(result.neededQuestionnaires).toEqual([])
    expect(result.notNeededQuestionnaires).toEqual([])
  })

  it('should be case insensitive when matching IDs', () => {
    const neededIds = ['QUEST-2024-v2']
    const externalQuestionnaires: ExternalQuestionnaires = [
      { id: 'quest-2024', cacheName: 'cache1' },
      { id: 'quest-2026', cacheName: 'cache2' },
    ]

    const result: ExternalQuestionnairesFiltered =
      getExternalQuestionnaireFiltered(neededIds, externalQuestionnaires)

    expect(result.neededQuestionnaires).toEqual([
      { id: 'quest-2024', cacheName: 'cache1' },
    ])
    expect(result.notNeededQuestionnaires).toEqual([
      { id: 'quest-2026', cacheName: 'cache2' },
    ])
  })
})

describe('getOldExternalCacheNames', () => {
  const mockCaches = {
    keys: vi.fn(),
  }

  beforeAll(() => {
    // Mock the global caches object
    ;(global as any).caches = mockCaches
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return old cache names not in the needed questionnaires', async () => {
    const neededQuestionnaires: ExternalQuestionnaire[] = [
      { id: 'q1', cacheName: 'gide-cache1' },
    ]

    // Mock the caches.keys to return a list of cache names
    mockCaches.keys.mockResolvedValueOnce([
      'cache1',
      'gide-cache1',
      'cache2',
      'gide-cache2',
    ])

    const result = await getOldExternalCacheNames(neededQuestionnaires)

    expect(result).toEqual(['gide-cache2'])
  })

  it('should return all cache names containing "gide" if no needed questionnaires', async () => {
    const neededQuestionnaires: ExternalQuestionnaire[] = []

    mockCaches.keys.mockResolvedValueOnce([
      'cache1',
      'gide-cache1',
      'cache2',
      'gide-cache2',
    ])

    const result = await getOldExternalCacheNames(neededQuestionnaires)

    const expectedResult = ['gide-cache1', 'gide-cache2']

    expect(result).toEqual(expectedResult)
  })

  it('should return an empty array if all questionnaires are needed or no cache name contains "gide"', async () => {
    const neededQuestionnaires: ExternalQuestionnaire[] = [
      { id: 'q1', cacheName: 'gide-cache1' },
    ]

    mockCaches.keys.mockResolvedValueOnce(['cache1', 'gide-cache1'])

    const result = await getOldExternalCacheNames(neededQuestionnaires)

    expect(result).toEqual([])
  })

  it('should handle case sensitivity in cache names', async () => {
    const neededQuestionnaires: ExternalQuestionnaire[] = [
      { id: 'q1', cacheName: 'gide-CACHE1' },
    ]

    mockCaches.keys.mockResolvedValueOnce([
      'gide-cache1',
      'gide-CACHE1',
      'GIDE-CACHE2',
    ])

    const result = await getOldExternalCacheNames(neededQuestionnaires)

    expect(result).toEqual(['gide-cache1', 'GIDE-CACHE2'])
  })
})
