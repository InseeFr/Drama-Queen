import ReactHotkeys from 'react-hot-keys'

type ShortCutProps = {
  shortCutKey: string
  onClickMethod: () => void
}

export function ShortCut(props: ShortCutProps) {
  const { shortCutKey, onClickMethod } = props

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
      filter={(event) => true}
    ></ReactHotkeys>
  )
}
