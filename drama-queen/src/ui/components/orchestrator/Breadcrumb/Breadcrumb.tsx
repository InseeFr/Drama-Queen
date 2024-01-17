import { Breadcrumbs, Button } from '@mui/material'
import { tss } from 'tss-react/mui'

type BreadCrumbProps = {
  hierarchy?: {
    sequence?: {
      label: React.ReactNode
      id: string
      page: string
    }
    subSequence?:
      | {
          label: React.ReactNode
          id: string
          page: string
        }
      | undefined
  }
  goToPage: (page: {
    page: string
    iteration?: number | undefined
    nbIterations?: number | undefined
    subPage?: number | undefined
  }) => void
}

export function BreadCrumb(props: BreadCrumbProps) {
  const { hierarchy, goToPage } = props
  const { classes } = useStyles()
  const { sequence, subSequence } = hierarchy ?? {}

  return (
    <Breadcrumbs separator={''} aria-label="breadcrumb">
      {sequence && (
        <Button
          className={`${classes.breadcrumbButton} ${
            !subSequence ? classes.lastButton : null
          }`}
          title={`Aller vers la séquence ${sequence.label}`}
          disableRipple
          onClick={() => goToPage({ page: sequence.page })}
        >
          {sequence.label}
        </Button>
      )}
      {subSequence && (
        <Button
          className={`${classes.breadcrumbButton} ${classes.subsequenceButton} ${classes.lastButton}`}
          title={`Aller vers la sous-séquence ${subSequence.label}`}
          disableRipple
          onClick={() => goToPage({ page: subSequence.page })}
        >
          {subSequence.label}
        </Button>
      )}
    </Breadcrumbs>
  )
}

const useStyles = tss.create(() => ({
  breadcrumbButton: {
    color: 'black',
    backgroundColor: 'transparent',
    border: 'none',
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
    borderBottom: `2px solid #085394`,
  },
}))
