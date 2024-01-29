import { Button, Stack, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { OverviewItem } from '@inseefr/lunatic/lib/src/use-lunatic/commons/getOverview'

type SequenceNavigationProps = {
  questionnaireTitle: string
  overview: {
    lunaticId: string
    page: string
    type: string
    label: string
    visible: boolean
    reached: boolean
    children: OverviewItem[]
  }[]
  selectedSequence: OverviewItem | undefined
  sequenceOnClick: (sequence: OverviewItem) => void
}

export function SequenceNavigation(props: SequenceNavigationProps) {
  const { questionnaireTitle, overview, selectedSequence, sequenceOnClick } =
    props
  const { classes } = useStyles()

  function getSequenceEndIcon(sequence: OverviewItem) {
    if (sequence.children.length > 0) {
      return <ChevronRightIcon />
    }
  }

  function isSequenceDisabled(sequence: OverviewItem) {
    return !(sequence.reached && sequence.visible)
  }

  return (
    <Stack className={classes.navigationContainer}>
      <Typography variant="overline" className={classes.typography}>
        {questionnaireTitle}
      </Typography>
      <Stack>
        {overview.map((sequence) => (
          <Button
            key={sequence.lunaticId}
            className={`${classes.navigationButton} ${
              selectedSequence === sequence && classes.itemOpen
            }`}
            size="small"
            disableRipple
            disabled={isSequenceDisabled(sequence)}
            endIcon={getSequenceEndIcon(sequence)}
            onClick={() => sequenceOnClick(sequence)}
          >
            {sequence.label}
          </Button>
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
  navigationButton: {
    textTransform: 'none',
    justifyContent: 'flex-start',
    textAlign: 'left',
    color: theme.palette.primary.main,
    paddingLeft: '1.2em',
    borderRadius: 0,
    '&:hover, &:focus': {
      fontWeight: 'bold',
      backgroundColor: theme.palette.background.button.light,
    },
    '& .MuiButton-endIcon': {
      position: 'absolute',
      right: '10px',
    },
  },
  itemOpen: { backgroundColor: theme.palette.background.button.light },
}))
