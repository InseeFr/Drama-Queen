import { useHotkeys } from 'react-hotkeys-hook'

/**
 * Custom hook to bind a keyboard shortcut to a callback.
 * @param shortCutKey - The keyboard shortcut string (e.g., "ctrl+s").
 * @param onClickMethod - The method to execute when the shortcut is pressed.
 * @param isShortcutEnabled - A boolean indicating whether the shortcut is enabled.
 */
export function useShortcut(
  shortCutKey: string,
  onClickMethod: () => void,
  isShortcutEnabled: boolean = true,
) {
  const requiresAlt = shortCutKey.toLowerCase().includes('alt+')
  const requiresCtrl = shortCutKey.toLowerCase().includes('ctrl+')
  const requiresShift = shortCutKey.toLowerCase().includes('shift+')

  useHotkeys(
    shortCutKey,
    (event) => {
      // With `useKey` option activated, currently shortcut is triggered even if ctrl/alt/shift key is not pressed.
      // This is a quick fix to remove when it will be handled by the library.
      // See https://github.com/JohannesKlauss/react-hotkeys-hook/issues/1274
      if (
        (requiresAlt && !event.altKey) ||
        (requiresCtrl && !event.ctrlKey) ||
        (requiresShift && !event.shiftKey)
      ) {
        return
      }

      event.preventDefault()
      onClickMethod()
    },
    {
      enabled: isShortcutEnabled,
      enableOnFormTags: ['input', 'select', 'textarea'],
      enableOnContentEditable: true,
      preventDefault: true,
      // useKey is needed, else it's configured for qwerty keyboard.
      // Warning : currently both keys (qwerty and user keyboard) trigger the shortcut.
      // See https://github.com/JohannesKlauss/react-hotkeys-hook/issues/1239
      useKey: true,
    },
    [onClickMethod, isShortcutEnabled],
  )
}
