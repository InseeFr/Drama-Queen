const injectBodyScript = (url: string) => {
  const script = document.createElement('script')
  script.src = url
  document.body.appendChild(script)
}
export const injectLegacyEntryQueen = () => {
  try {
    injectBodyScript(`${import.meta.env.VITE_QUEEN_URL}/entry.js`)
  } catch (error) {
    console.error(
      'An error occurred during loading of Queen v1. It will be unavailable.',
      error
    )
  }
}
