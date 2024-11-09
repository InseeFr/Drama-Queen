import { EXTERNAL_RESOURCES_URL } from 'core/constants'

export function ExternalRessources() {
  const mountExternalResources = (externalResourcesUrl: string) => {
    console.log('Mount External resources')
    const script = document.createElement('script')
    script.src = `${externalResourcesUrl}/entry.js`
    script.defer = true // wait
    document.body.appendChild(script)
  }

  mountExternalResources(EXTERNAL_RESOURCES_URL)
  // Nothing to return, is the loaded script which create html-element.
  return
}
