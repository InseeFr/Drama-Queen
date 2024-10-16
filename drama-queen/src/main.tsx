import('./bootstrap').then(({ mount, mountExternalResources }) => {
  const localRoot = document.getElementById('drama-queen')

  mount({
    mountPoint: localRoot!,
    routingStrategy: 'browser',
  })

  if (import.meta.env.VITE_EXTERNAL_RESOURCES_URL)
    mountExternalResources(import.meta.env.VITE_EXTERNAL_RESOURCES_URL)
})

export {}
