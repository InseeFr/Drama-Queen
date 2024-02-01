import { Stack } from '@mui/material'
import { tss } from 'tss-react/mui'
import { OverviewItem } from '@inseefr/lunatic/lib/src/use-lunatic/commons/getOverview'
import { MenuNavigationButton } from '../../buttons/MenuNavigationButton/MenuNavigationButton'

type subSequenceNavigationProps = {
  sequence: OverviewItem
  subSequenceOnClick: (subSequence: OverviewItem) => void
}

export function SubSequenceNavigation(props: subSequenceNavigationProps) {
  const { sequence, subSequenceOnClick } = props
  const { classes } = useStyles()

  function isSubSequenceDisabled(subSequence: OverviewItem) {
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

const useStyles = tss.create(({ theme }) => ({
  navigationContainer: { gap: '1.5em' },
}))
