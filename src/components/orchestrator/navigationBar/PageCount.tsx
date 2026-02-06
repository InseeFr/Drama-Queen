import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

type PageCountProps = {
  currentPage: number | undefined
  maxPage: number | undefined
}

export function PageCount({ currentPage, maxPage }: Readonly<PageCountProps>) {
  const { t } = useTranslation()

  return (
    <Stack
      className="text-center rounded-[5px] w-[57px] bg-white"
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