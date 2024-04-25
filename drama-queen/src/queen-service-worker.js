/* eslint-disable no-restricted-globals */
/**
 * self._DRAMAQUEEN_URL has to be defined by parent app, like Pearl-Jam
 * Actally, functions as (registerRoute,NetworkFirst, NetworkFirst, etc) from workbox as imported by legacy queen.
 * When we will remove legacy queen, we have to add these functions like this
    | importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');
    | const { CacheableResponsePlugin } = workbox.cacheableResponse;
    | const { registerRoute } = workbox.routing;
    | const { NetworkFirst, CacheFirst } = workbox.strategies;
 */

importScripts(`${self._DRAMAQUEEN_URL}/swEnv.js`)
self._QUEEN_URL = self.__VITE_ENVS.VITE_QUEEN_URL

importScripts(`${self._QUEEN_URL}/queen-service-worker.js`)

const getDramaQueenUrlRegex = (url) => {
  return url
    .replace('http', '^http')
    .concat('/(.*)((.js)|(.png)|(.svg)|(.css))')
}
const dramaQueenCacheName = 'drama-queen-cache'

console.log('Loading Drama Queen SW into another SW')

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
