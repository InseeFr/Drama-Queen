/**
 * self._DRAMAQUEEN_URL has to be defined by parent app, like Pearl-Jam
 */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js'
)

const { CacheableResponsePlugin } = workbox.cacheableResponse
const { registerRoute } = workbox.routing
const { NetworkFirst, CacheFirst } = workbox.strategies

const getDramaQueenUrlRegex = (url) => {
  return url
    .replace('http', '^http')
    .concat('/(.*)((.js)|(.png)|(.svg)|(.css))')
}

const getDramaQueenUrlRegexJson = (url) => {
  return url.replace('http', '^http').concat('/(.*)(.json)')
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
  })
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
  })
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
  })
)

const dramaPrecacheController = async () => {
  const cache = await caches.open(dramaQueenCacheName)
  const urlsToPrecache = self.__WB_MANIFEST.reduce(
    (_, { url }) => [..._, `${self._DRAMAQUEEN_URL}/${url}`],
    []
  )
  await cache.addAll(urlsToPrecache)
}

self.addEventListener('install', (event) => {
  console.log('Drama Queen  sw : installing configuration..')
  event.waitUntil(dramaPrecacheController())
})

self.addEventListener('activate', (event) => {
  console.log('Drama Queen sw : activating ...')
})
