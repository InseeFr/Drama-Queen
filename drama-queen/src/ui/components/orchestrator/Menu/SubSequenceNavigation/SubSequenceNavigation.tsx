import { Button } from '@mui/material'
import { tss } from 'tss-react/mui'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { OverviewItem } from '@inseefr/lunatic/lib/src/use-lunatic/commons/getOverview'

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
    <>
      <Button
        key={sequence?.lunaticId}
        className={classes.navigationButton}
        size="small"
        disableRipple
        onClick={() => subSequenceOnClick(sequence)}
      >
        {sequence?.label}
      </Button>

      {sequence?.children.map((subSequence) => (
        <Button
          key={sequence.lunaticId}
          className={classes.navigationButton}
          size="small"
          disableRipple
          disabled={isSubSequenceDisabled(subSequence)}
          onClick={() => subSequenceOnClick(subSequence)}
        >
          {subSequence.label}
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
