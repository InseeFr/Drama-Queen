import { useLunatic } from '@inseefr/lunatic'
import { Button, Stack, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

type LoopPanelProps = {
  loopVariables: string[]
  page: string
  subPage: number | undefined
  iteration: number | undefined
  lastReachedPage: string | undefined
  getData: ReturnType<typeof useLunatic>['getData']
  goToPage: ReturnType<typeof useLunatic>['goToPage']
}

export function LoopPanel(props: LoopPanelProps) {
  const { loopVariables, page, iteration, lastReachedPage, getData, goToPage } =
    props
  const { classes } = useStyles({})

  if (!loopVariables[0] || !lastReachedPage) {
    return null
  }

  const data = getData(true)
  // find the depending variable of the loop
  const titleVariable = loopVariables[0]
  // get its collected value for every iteration
  const titleData = data.COLLECTED[titleVariable]?.COLLECTED as string[]

  // check if the first subPage of an iteration is before lastReachedPage
  function isIterationReachable(
    currentPage: string,
    lastReachedPage: string,
    iteration: number
  ) {
    const numberCurrentPage = parseInt(currentPage)
    const maxPage = parseInt(lastReachedPage.split('.')[0])
    const maxIteration = parseInt(lastReachedPage.split('#')[1]) - 1
    if (numberCurrentPage < maxPage) {
      // no need to check iteration or subPage because we already reached the next page (out of the loop)
      return true
    }
    // numberCurrentPage = maxPage , so we check if we already reached the iteration
    if (iteration <= maxIteration) {
      // no need to check subPage beacause we just want to reach the first subPage of the iteration
      return true
    }
    return false
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
          className={`${classes.panelButton} ${
            index === iteration
              ? classes.currentIteration
              : classes.notCurrentIteration
          }`}
          disabled={isDisabledButton(index)}
          disableRipple
          endIcon={<ChevronRightIcon />}
          onClick={goToIteration(index)}
        >
          <Typography>{value}</Typography>
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
