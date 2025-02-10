import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tss } from 'tss-react/mui'

import { useTranslation } from '@/i18n'

import { PrevNext } from '../buttons/PrevNext/PrevNext'
import type { Overview } from '../lunaticType'
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
  const { t } = useTranslation('navigationMessage')

  const currentSequenceIndex = overview.findIndex(
    (sequence) => sequence.current,
  )

  const nbMaxSequence = overview.length

  type PageType = 'page' | 'subPage'

  const displayPages = [
    {
      type: 'subPage' as PageType,
      current: subPage === undefined ? subPage : subPage + 1,
      max: nbSubPages,
    },
    {
      type: 'page' as PageType,
      current: page,
      max: maxPage,
    },
  ]

  function displayPage(pageType: {
    type: PageType
    current: number | undefined
    max: number | undefined
  }) {
    return (
      <Stack
        className={classes.page}
        key={`progress-${pageType.type}`}
        id={`progress-${pageType.type}`}
        style={{
          visibility: pageType.current === undefined ? 'hidden' : 'visible',
        }}
      >
        <Typography variant="caption">{t('pageNumber')}</Typography>
        <Typography variant="body2" fontWeight={'bold'}>
          {pageType.current}/{pageType.max}
        </Typography>
      </Stack>
    )
  }

  return (
    <Stack className={classes.root}>
      <Stack className={classes.progressBar}>
        <StepProgressBar
          currentStep={currentSequenceIndex + 1}
          maxStep={nbMaxSequence}
        />
      </Stack>
      {displayPages.map((pageType) => displayPage(pageType))}
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
  page: {
    textAlign: 'center',
    borderRadius: '5px',
    width: '57px',
    backgroundColor: 'white',
  },
  progressBar: {
    display: 'flex',
    flexGrow: 1,
    '@media (max-height: 500px)': {
      display: 'none',
    },
  },
}))
