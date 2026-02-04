import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { tss } from 'tss-react/mui'

type PageCountProps = {
  currentPage: number | undefined
  maxPage: number | undefined
}

export function PageCount({ currentPage, maxPage }: Readonly<PageCountProps>) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  return (
    <Stack
      className={classes.pageCount}
      id={`page-count`}
      style={{
        visibility: currentPage === undefined ? 'hidden' : 'visible',
      }}
    >
      <Typography variant="caption">
        {t('navigation.navigationBar.pageNumber')}
      </Typography>
      <Typography variant="body2" fontWeight={'bold'}>
        {currentPage}/{maxPage}
      </Typography>
    </Stack>
  )
}

const useStyles = tss.create(() => ({
  pageCount: {
    textAlign: 'center',
    borderRadius: '5px',
    width: '57px',
    backgroundColor: 'white',
  },
}))
