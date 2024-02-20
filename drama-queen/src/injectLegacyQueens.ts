const injectBodyScript = (url: string) => {
  const script = document.createElement('script')
  script.src = url
  document.body.appendChild(script)
}
export const injectLegacyEntryQueens = () => {
  injectBodyScript(`${import.meta.env.VITE_QUEEN_URL}/entry.js`)
}
