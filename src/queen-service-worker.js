/**
 * self._DRAMAQUEEN_URL has to be defined by parent app, like Pearl-Jam
 */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js',
)

/**
 * Load all functions needed by all service-workers
 */
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { registerRoute } = workbox.routing
const { NetworkFirst, CacheFirst } = workbox.strategies
const { RangeRequestsPlugin } = workbox.rangeRequests

/**
 * Load env variable with swEnv.js (manage by vite-envs plugin)
 */
importScripts(`${self._DRAMAQUEEN_URL}/swEnv.js`)

/**
 * Load external resource service-worker, we load env according main env variable, its name is defined in vite.config.ts (vite-envs plugin)
 */
if (self.__QUEEN_ENVS.VITE_EXTERNAL_RESOURCES_URL) {
  // In external service-worker, self._QUEEN_CAPMI_URL has to be defined to get root url of externalResourcesUrl
  self._QUEEN_CAPMI_URL = self.__QUEEN_ENVS.VITE_EXTERNAL_RESOURCES_URL
  importScripts(`${self._QUEEN_CAPMI_URL}/queen-service-worker.js`)
}

const getDramaQueenUrlRegex = (url) => {
  return url
    .replace('http', '^http')
    .concat('/(.*)((.js)|(.png)|(.svg)|(.css))')
}

const getQuestionnaireUrlRegex = () => '^http.*/api/questionnaire/(.){1,}'

const getResourceUrlRegex = () => '^http.*/api/nomenclature/(.){1,}'

const dramaQueenCacheName = 'drama-queen-cache'

console.log('Loading Drama Queen SW')

registerRoute(
  new RegExp(getDramaQueenUrlRegex(self._DRAMAQUEEN_URL)),
  new NetworkFirst({
    cacheName: dramaQueenCacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)

// used by synchro for getting questionnaires
registerRoute(
  new RegExp(getQuestionnaireUrlRegex()),
  new NetworkFirst({
    cacheName: 'queen-questionnaire',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)

// used by synchro for getting nomenclatures
registerRoute(
  new RegExp(getResourceUrlRegex()),
  new CacheFirst({
    cacheName: 'queen-resource',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)

const dramaPrecacheController = async () => {
  const cache = await caches.open(dramaQueenCacheName)
  const urlsToPrecache = self.__WB_MANIFEST.reduce(
    (_, { url }) => [..._, `${self._DRAMAQUEEN_URL}/${url}`],
    [],
  )
  await cache.addAll(urlsToPrecache)
}

self.addEventListener('install', (event) => {
  console.log('Drama Queen  sw : installing configuration..')
  event.waitUntil(dramaPrecacheController())
})

self.addEventListener('activate', () => {
  console.log('Drama Queen sw : activating ...')
})
