import { EXTERNAL_RESOURCES_URL } from 'core/constants'

import('./bootstrap').then(({ mount, mountExternalResources }) => {
  const localRoot = document.getElementById('drama-queen')

  mount({
    mountPoint: localRoot!,
    routingStrategy: 'browser',
  })

  if (EXTERNAL_RESOURCES_URL) mountExternalResources(EXTERNAL_RESOURCES_URL)
})

export {}
