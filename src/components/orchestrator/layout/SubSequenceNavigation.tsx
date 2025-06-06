import Stack from '@mui/material/Stack'
import { tss } from 'tss-react/mui'

import type { OverviewItem } from '@/models/lunaticType'

import { MenuNavigationButton } from './MenuNavigationButton'

type subSequenceNavigationProps = {
  sequence: OverviewItem
  subSequenceOnClick: (subSequence: OverviewItem) => void
}

export function SubSequenceNavigation({
  sequence,
  subSequenceOnClick,
}: Readonly<subSequenceNavigationProps>) {
  const { classes } = useStyles()

  return (
    <Stack className={classes.navigationContainer}>
      <MenuNavigationButton
        key={sequence.id}
        label={sequence.label}
        onClick={() => subSequenceOnClick(sequence)}
      />
      <Stack>
        {sequence.children.map((subSequence) => (
          // we can only navigate to a subSequence that has already been reached
          <MenuNavigationButton
            key={subSequence.id}
            label={subSequence.label}
            disabled={!subSequence.reached}
            onClick={() => subSequenceOnClick(subSequence)}
          />
        ))}
      </Stack>
    </Stack>
  )
}

const useStyles = tss.create(() => ({
  navigationContainer: { gap: '1.5em' },
}))
