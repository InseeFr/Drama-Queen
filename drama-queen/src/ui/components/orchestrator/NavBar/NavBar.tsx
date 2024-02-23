import { tss } from 'tss-react/mui'
import { PrevNext } from '../buttons/PrevNext/PrevNext'
import { Stack, Typography } from '@mui/material'

type NavBarProps = {
  page: string
  maxPage: string
  subPage: number | undefined
  nbSubPages: number | undefined
  isFirstPage: boolean
  isLastPage: boolean
  isLastReachedPage: boolean
  readonly: boolean
  goPrevious: () => void
  goNext: (payload?: {} | undefined) => void
}

export function NavBar(props: NavBarProps) {
  const {
    page,
    maxPage,
    subPage,
    nbSubPages,
    isFirstPage,
    isLastPage,
    isLastReachedPage,
    readonly,
    goPrevious,
    goNext,
  } = props
  const { classes } = useStyles()

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
      current: string | number | undefined
      max: string | number | undefined
    },
    index: number
  ) {
    if (pageType.current !== undefined) {
      return (
        <Stack className={classes.page} key={`displayPages-${index}`}>
          <Typography variant="caption">n° page</Typography>
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
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        isLastReachedPage={isLastReachedPage}
        readonly={readonly}
        goPrevious={goPrevious}
        goNext={goNext}
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
