import { useHotkeys } from 'react-hotkeys-hook'

type ShortCutProps = {
  shortCutKey: string
  onClickMethod: () => void
}

export function ShortCut({
  shortCutKey,
  onClickMethod,
}: Readonly<ShortCutProps>) {
  useHotkeys(
    shortCutKey,
    (event) => {
      onClickMethod()
      event.preventDefault()
    },
    { preventDefault: true, enableOnFormTags: ['input', 'select', 'textarea'] },
  )

  return null
}
