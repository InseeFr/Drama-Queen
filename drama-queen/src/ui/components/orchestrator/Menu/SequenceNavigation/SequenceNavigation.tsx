import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tss } from 'tss-react/mui'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
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

  function getSequenceEndIcon(sequence: OverviewItem) {
    // display endIcon only if sequence leads to a subSequences menu
    if (sequence.children.length > 0) {
      return <ChevronRightIcon />
    }
  }

  function isSequenceDisabled(sequence: OverviewItem) {
    // we can only navigate to a sequence that as already been reached
    return !(sequence.reached && sequence.visible)
  }

  return (
    <Stack className={classes.navigationContainer}>
      <Typography variant="overline" className={classes.typography}>
        {questionnaireTitle}
      </Typography>
      <Stack>
        {overview.map((sequence) => (
          <MenuNavigationButton
            key={sequence.lunaticId}
            className={
              selectedSequence === sequence ? classes.sequenceOpen : ''
            }
            label={sequence.label}
            disabled={isSequenceDisabled(sequence)}
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
