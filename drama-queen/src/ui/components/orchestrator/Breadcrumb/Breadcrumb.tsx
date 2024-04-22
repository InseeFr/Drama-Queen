import Button from '@mui/material/Button'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { type ReactNode } from 'react'
import { tss } from 'tss-react/mui'
import type { GoToPage } from '../lunaticType'
import { useTranslation } from 'i18n'

type BreadCrumbProps = {
  //This type should be extracted from lunatic
  hierarchy?: {
    sequence: {
      label: ReactNode
      id: string
      page: string
    }
    subSequence?: {
      label: ReactNode
      id: string
      page: string
    }
  }
  goToPage: GoToPage
  iteration: number | undefined
}

export function BreadCrumb(props: BreadCrumbProps) {
  const { hierarchy, iteration, goToPage } = props
  const { classes, cx } = useStyles()
  const { t } = useTranslation('navigationMessage')
  const { sequence, subSequence } = hierarchy ?? {}

  // given a page inside a subsequence, return the page keeping the current iteration
  const getPageWithIteration = (page: string) => {
    // page inside a subsequence, and current page is in an iteration
    if (page.includes('.') && iteration !== undefined) {
      // return the new page for the same iteration
      return `${page}#${iteration + 1}`
    }
    return page
  }

  const goToSequencePage = () =>
    sequence && goToPage({ page: getPageWithIteration(sequence.page) })
  const goToSubSequencePage = () =>
    subSequence && goToPage({ page: getPageWithIteration(subSequence.page) })

  return (
    <Breadcrumbs separator={''} aria-label="breadcrumb">
      {sequence && (
        <Button
          className={cx(
            classes.breadcrumbButton,
            !subSequence && classes.lastButton
          )}
          title={`${t('goToSequence')} ${sequence.label}`}
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
            classes.lastButton
          )}
          title={`${t('goToSubSequence')} ${subSequence.label}`}
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
