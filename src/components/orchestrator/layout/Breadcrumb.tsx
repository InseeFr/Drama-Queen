import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { tss } from 'tss-react/mui'

import type { GoToPage, OverviewItem } from '@/models/lunaticType'

type BreadcrumbProps = {
  sequence: OverviewItem | undefined
  subSequence: OverviewItem | undefined
  goToPage: GoToPage
}

export function Breadcrumb({
  sequence,
  subSequence,
  goToPage,
}: Readonly<BreadcrumbProps>) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()

  const goToSequencePage = () => sequence && goToPage({ page: sequence.page })
  const goToSubSequencePage = () =>
    subSequence && goToPage({ page: subSequence.page })

  return (
    <Breadcrumbs separator={''} aria-label="breadcrumb">
      {sequence && (
        <Button
          className={cx(
            classes.breadcrumbButton,
            !subSequence && classes.lastButton,
          )}
          title={`${t('navigation.header.goToSequence')} ${sequence.label}`}
          disableRipple
          onClick={goToSequencePage}
        >
          {sequence.label}
        </Button>
      )}
      {subSequence && (
        <Button
          className={cx(
            classes.breadcrumbButton,
            classes.subsequenceButton,
            classes.lastButton,
          )}
          title={`${t('navigation.header.goToSubSequence')} ${subSequence.label}`}
          disableRipple
          onClick={goToSubSequencePage}
        >
          {subSequence.label}
        </Button>
      )}
    </Breadcrumbs>
  )
}

const useStyles = tss.create(({ theme }) => ({
  breadcrumbButton: {
    color: theme.palette.common.black,
    borderRadius: 0,
    paddingBottom: 0,
    fontSize: '95%',
    '&:hover': {
      fontWeight: 'bold',
      backgroundColor: 'transparent',
    },
    '&::before': {
      content: "'\u3009'",
      marginRight: '0.8em',
      fontWeight: 'bold',
    },
  },
  subsequenceButton: {
    marginLeft: '0.8em',
  },
  lastButton: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}))
