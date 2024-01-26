import { Button } from '@mui/material'
import { tss } from 'tss-react/mui'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { OverviewItem } from '@inseefr/lunatic/lib/src/use-lunatic/commons/getOverview'

type SequenceNavigationProps = {
  overview: {
    lunaticId: string
    page: string
    type: string
    label: string
    visible: boolean
    reached: boolean
    children: OverviewItem[]
  }[]
  sequenceOnClick: (sequence: OverviewItem) => void
}

export function SequenceNavigation(props: SequenceNavigationProps) {
  const { overview, sequenceOnClick } = props
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
    <>
      {overview.map((sequence) => (
        <Button
          key={sequence.lunaticId}
          className={classes.navigationButton}
          size="small"
          disableRipple
          disabled={isSequenceDisabled(sequence)}
          endIcon={getSequenceEndIcon(sequence)}
          onClick={() => sequenceOnClick(sequence)}
        >
          {sequence.label}
        </Button>
      ))}
    </>
  )
}

const useStyles = tss.create(({ theme }) => ({
  navigationButton: {
    textTransform: 'none',
    justifyContent: 'flex-start',
    color: theme.palette.primary.main,
    paddingLeft: '15px',
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
}))
