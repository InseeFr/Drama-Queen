import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tss } from 'tss-react/mui'

import { useTranslation } from '@/i18n'

import { PrevNext } from '../buttons/PrevNext/PrevNext'

type NavBarProps = {
  page: number
  maxPage: number
  subPage: number | undefined
  nbSubPages: number | undefined
  isPreviousEnabled: boolean
  isNextEnabled: boolean
  onPrevious: () => void
  onNext: () => void
}

export function NavBar(props: NavBarProps) {
  const {
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

  const displayPages = [
    {
      current: subPage === undefined ? subPage : subPage + 1,
      max: nbSubPages,
    },
    {
      current: page,
      max: maxPage,
    },
  ]

  function displayPage(
    pageType: {
      current: number | undefined
      max: number | undefined
    },
    index: number,
  ) {
    if (pageType.current !== undefined) {
      return (
        <Stack className={classes.page} key={`displayPages-${index}`}>
          <Typography variant="caption">{t('pageNumber')}</Typography>
          <Typography variant="body2" fontWeight={'bold'}>
            {pageType.current}/{pageType.max}
          </Typography>
        </Stack>
      )
    }
  }

  return (
    <Stack className={classes.root}>
      {displayPages.map((pageType, index) => displayPage(pageType, index))}
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
  },
  page: {
    textAlign: 'center',
    borderRadius: '5px',
    width: '57px',
    backgroundColor: 'white',
  },
}))
