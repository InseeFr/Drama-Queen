import { Stack, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'

import { useTranslation } from '@/i18n'

type PageCountProps = {
  currentPage: number | undefined
  maxPage: number | undefined
}

export function PageCount(props: Readonly<PageCountProps>) {
  const { currentPage, maxPage } = props
  const { classes } = useStyles()
  const { t } = useTranslation('navigationMessage')

  return (
    <Stack
      className={classes.pageCount}
      id={`page-count`}
      style={{
        visibility: currentPage === undefined ? 'hidden' : 'visible',
      }}
    >
      <Typography variant="caption">{t('pageNumber')}</Typography>
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
