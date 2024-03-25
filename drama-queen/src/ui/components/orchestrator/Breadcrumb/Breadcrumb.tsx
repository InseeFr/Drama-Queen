import type { useLunatic } from '@inseefr/lunatic'
import Button from '@mui/material/Button'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { type ReactNode } from 'react'
import { tss } from 'tss-react/mui'

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
  goToPage: ReturnType<typeof useLunatic>['goToPage']
}

export function BreadCrumb(props: BreadCrumbProps) {
  const { hierarchy, goToPage } = props
  const { classes, cx } = useStyles()
  const { sequence, subSequence } = hierarchy ?? {}

  const goToSequencePage = () => sequence && goToPage({ page: sequence.page })
  const goToSubSequencePage = () =>
    subSequence && goToPage({ page: subSequence.page })

  return (
    <Breadcrumbs separator={''} aria-label="breadcrumb">
      {sequence && (
        <Button
          className={cx(
            classes.breadcrumbButton,
            !subSequence && classes.lastButton
          )}
          title={`Aller vers la séquence ${sequence.label}`}
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
          title={`Aller vers la sous-séquence ${subSequence.label}`}
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
