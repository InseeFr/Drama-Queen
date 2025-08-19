import { useHotkeys } from 'react-hotkeys-hook'

/**
 * Custom hook to bind a keyboard shortcut to a callback.
 * @param shortCutKey - The keyboard shortcut string (e.g., "ctrl+s").
 * @param onClickMethod - The method to execute when the shortcut is pressed.
 * @param shortcutEnabled - A boolean indicating whether the shortcut is enabled.
 */
export function useShortCut(
  shortCutKey: string,
  onClickMethod: () => void,
  shortcutEnabled: boolean = true,
) {
  useHotkeys(
    shortCutKey,
    (event) => {
      onClickMethod()
      event.preventDefault()
    },
    {
      preventDefault: true,
      enableOnFormTags: ['input', 'select', 'textarea'],
      enableOnContentEditable: true,
      enabled: shortcutEnabled,
    },
  )
}
