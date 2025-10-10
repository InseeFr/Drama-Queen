import ReactHotkeys from 'react-hot-keys'

type ShortCutProps = {
  shortCutKey: string
  onClickMethod: () => void
}

/** Allow to add an action that will be triggered through a hotkey. */
export function ShortCut({
  shortCutKey,
  onClickMethod,
}: Readonly<ShortCutProps>) {
  function onClickShortCut(onClickMethod: () => void) {
    return (_keyName: string, event: KeyboardEvent) => {
      onClickMethod()
      event.preventDefault()
    }
  }

  const handleShortCut = onClickShortCut(onClickMethod)

  // filter ables to overload native navigation
  return (
    <ReactHotkeys
      key={shortCutKey}
      keyName={shortCutKey}
      onKeyDown={handleShortCut}
      filter={() => true}
    />
  )
}
