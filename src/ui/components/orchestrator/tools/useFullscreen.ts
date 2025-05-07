import { useEffect, useState } from 'react'

interface DocumentElementWithFullscreen extends HTMLElement {
  msRequestFullscreen?: () => Promise<void>
  mozRequestFullScreen?: () => Promise<void>
  webkitRequestFullscreen?: () => Promise<void>
}

interface DocumentWithFullscreen extends Document {
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  webkitFullscreenElement?: Element
  msExitFullscreen?: () => Promise<void>
  mozCancelFullScreen?: () => Promise<void>
  webkitExitFullscreen?: () => Promise<void>
}

// Check if the document is in fullscreen mode
const isDocumentFullscreen = (): boolean => {
  const doc = document as DocumentWithFullscreen
  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement
  )
}

// Request fullscreen mode
const requestFullscreen = async (element: DocumentElementWithFullscreen) => {
  if (element.requestFullscreen) await element.requestFullscreen()
  else if (element.msRequestFullscreen) await element.msRequestFullscreen()
  else if (element.webkitRequestFullscreen)
    await element.webkitRequestFullscreen()
  else if (element.mozRequestFullScreen) await element.mozRequestFullScreen()
}

// Exit fullscreen mode
const exitFullscreen = async (doc: DocumentWithFullscreen) => {
  if (doc.exitFullscreen) await doc.exitFullscreen()
  else if (doc.msExitFullscreen) await doc.msExitFullscreen()
  else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen()
  else if (doc.mozCancelFullScreen) await doc.mozCancelFullScreen()
}

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = async (): Promise<void> => {
    if (!isFullscreen) {
      await requestFullscreen(document.documentElement)
    } else {
      await exitFullscreen(document)
    }
    setIsFullscreen(!isFullscreen)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(isDocumentFullscreen())
    }

    // Add event listeners for fullscreen change across different browsers
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      // Remove event listeners when component unmounts
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      )
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      )
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Exit fullscreen when the component unmounts
  useEffect(() => {
    return () => {
      exitFullscreen(document)
    }
  }, [])

  return { toggleFullscreen, isFullscreen }
}
