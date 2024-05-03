import { useLunatic } from '@inseefr/lunatic'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tss } from 'tss-react/mui'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { isIterationReachable } from 'ui/components/orchestrator/tools/functions'
import type { PageTag, SurveyUnitData } from 'core/model'

type LoopPanelProps = {
  loopVariables: string[]
  page: number
  subPage: number | undefined
  iteration: number | undefined
  lastReachedPage: PageTag | undefined
  data: SurveyUnitData
  goToPage: ReturnType<typeof useLunatic>['goToPage']
}

export function LoopPanel(props: LoopPanelProps) {
  const { loopVariables, page, iteration, lastReachedPage, data, goToPage } =
    props
  const { classes, cx } = useStyles()

  if (!loopVariables[0] || !lastReachedPage || !data.COLLECTED) {
    return null
  }

  // find the depending variable of the loop
  const titleVariable = loopVariables[0]

  // get its collected value for every iteration
  const titleData = data.COLLECTED[titleVariable]?.COLLECTED as unknown[]

  if (!titleData) {
    return null
  }

  // panel is disabled if you cannot reach the first subPage of the iteration
  const isDisabledButton = (iteration: number) =>
    !isIterationReachable(page, lastReachedPage, iteration)

  // redirects to the first subPage of an iteration (in the same loop so "page" does not change)
  const goToIteration = (index: number) => () =>
    goToPage({ page: page, subPage: 0, iteration: index })

  return (
    <Stack className={classes.panelContainer}>
      {titleData.map((value, index) => (
        <Button
          key={`panel-${index}`}
          className={cx(
            classes.panelButton,
            index === iteration
              ? classes.currentIteration
              : classes.notCurrentIteration
          )}
          disabled={isDisabledButton(index)}
          disableRipple
          endIcon={<ChevronRightIcon />}
          onClick={goToIteration(index)}
        >
          <Typography>{`${value}`}</Typography>
        </Button>
      ))}
    </Stack>
  )
}

const useStyles = tss.create(({ theme }) => ({
  panelContainer: {
    gap: '1em',
    padding: '1.5em',
  },
  panelButton: {
    padding: '1em',
    justifyContent: 'space-between',
    '&:disabled': {
      background: 'transparent',
      borderColor: theme.palette.info.main,
      border: '1px solid rgba(0, 0, 0, .125)',
    },
  },
  currentIteration: {
    backgroundColor: '#455a79',
    color: 'white',
    '&:hover,&:focus': {
      backgroundColor: 'white',
      color: '#455a79',
    },
  },
  notCurrentIteration: {
    backgroundColor: '#6f90c0',
    color: 'white',
    '&:hover,&:focus': {
      backgroundColor: 'white',
      color: '#6f90c0',
    },
  },
}))
