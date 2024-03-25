import Stack from '@mui/material/Stack'
import { tss } from 'tss-react/mui'
import { MenuNavigationButton } from '../../buttons/MenuNavigationButton/MenuNavigationButton'
import type { OverviewItem } from '../../lunaticType'

type subSequenceNavigationProps = {
  sequence: OverviewItem
  subSequenceOnClick: (subSequence: OverviewItem) => void
}

export function SubSequenceNavigation(props: subSequenceNavigationProps) {
  const { sequence, subSequenceOnClick } = props
  const { classes } = useStyles()

  function isSubSequenceDisabled(subSequence: OverviewItem) {
    // we can only navigate to a subSequence that as already been reached
    return !(subSequence.reached && subSequence.visible)
  }

  return (
    <Stack className={classes.navigationContainer}>
      <MenuNavigationButton
        key={sequence.lunaticId}
        label={sequence.label}
        onClick={() => subSequenceOnClick(sequence)}
      />
      <Stack>
        {sequence.children.map((subSequence) => (
          <MenuNavigationButton
            key={subSequence.lunaticId}
            label={subSequence.label}
            disabled={isSubSequenceDisabled(subSequence)}
            onClick={() => subSequenceOnClick(subSequence)}
          />
        ))}
      </Stack>
    </Stack>
  )
}

const useStyles = tss.create(({}) => ({
  navigationContainer: { gap: '1.5em' },
}))
