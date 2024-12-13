import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tss } from 'tss-react/mui'

import { MenuNavigationButton } from '../../buttons/MenuNavigationButton/MenuNavigationButton'
import type { Overview, OverviewItem } from '../../lunaticType'

type SequenceNavigationProps = {
  questionnaireTitle: string
  overview: Overview
  selectedSequence: OverviewItem | undefined
  sequenceOnClick: (sequence: OverviewItem) => void
}

export function SequenceNavigation(props: SequenceNavigationProps) {
  const { questionnaireTitle, overview, selectedSequence, sequenceOnClick } =
    props
  const { classes } = useStyles()

  // display endIcon only if sequence leads to a subSequences menu
  const getSequenceEndIcon = (sequence: OverviewItem) =>
    sequence.children.length > 0 ? <ChevronRightIcon /> : undefined

  return (
    <Stack className={classes.navigationContainer}>
      <Typography variant="overline" className={classes.typography}>
        {questionnaireTitle}
      </Typography>
      <Stack>
        {overview.map((sequence) => (
          // we can only navigate to a sequence that has already been reached
          <MenuNavigationButton
            key={sequence.id}
            className={
              selectedSequence === sequence ? classes.sequenceOpen : ''
            }
            label={sequence.label}
            disabled={!sequence.reached}
            endIcon={getSequenceEndIcon(sequence)}
            onClick={() => sequenceOnClick(sequence)}
          />
        ))}
      </Stack>
    </Stack>
  )
}

const useStyles = tss.create(({ theme }) => ({
  navigationContainer: { gap: '1.5em' },
  typography: {
    lineHeight: '1.5em',
    paddingLeft: '1.2em',
  },
  sequenceOpen: { backgroundColor: theme.palette.background.button.light },
}))
