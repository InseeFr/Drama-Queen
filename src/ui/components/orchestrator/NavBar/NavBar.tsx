import Stack from '@mui/material/Stack'
import { tss } from 'tss-react/mui'

import { PrevNext } from '../buttons/PrevNext/PrevNext'
import type { Overview } from '../lunaticType'
import { PageCount } from './PageCount'
import { StepProgressBar } from './StepProgressBar'

type NavBarProps = {
  overview: Overview
  page: number
  maxPage: number
  subPage: number | undefined
  nbSubPages: number | undefined
  isPreviousEnabled: boolean
  isNextEnabled: boolean
  onPrevious: () => void
  onNext: () => void
}

export function NavBar(props: Readonly<NavBarProps>) {
  const {
    overview,
    page,
    maxPage,
    subPage,
    nbSubPages,
    isPreviousEnabled,
    isNextEnabled,
    onPrevious,
    onNext,
  } = props
  const { classes } = useStyles()

  const currentSequenceIndex = overview.findIndex(
    (sequence) => sequence.current,
  )

  const nbMaxSequence = overview.length

  const currentSubPage = subPage === undefined ? subPage : subPage + 1

  return (
    <Stack className={classes.root}>
      <Stack className={classes.progressBar}>
        <StepProgressBar
          currentStep={currentSequenceIndex + 1}
          maxStep={nbMaxSequence}
        />
      </Stack>
      <PageCount currentPage={currentSubPage} maxPage={nbSubPages} />
      <PageCount currentPage={page} maxPage={maxPage} />
      <PrevNext
        isPreviousEnabled={isPreviousEnabled}
        isNextEnabled={isNextEnabled}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </Stack>
  )
}

const useStyles = tss.create(() => ({
  root: {
    gap: '2em',
    alignItems: 'center',
    width: '60px',
    height: '100%',
    marginTop: '2em',
  },
  progressBar: {
    display: 'flex',
    flexGrow: 1,
    '@media (max-height: 500px)': {
      display: 'none',
    },
  },
}))
