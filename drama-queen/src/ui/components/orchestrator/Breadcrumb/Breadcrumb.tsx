import { tss } from 'tss-react/mui'

type BreadCrumbProps = {}

export function BreadCrumb(props: BreadCrumbProps) {
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <div aria-label="breadcrumb">
        <button
          type="button"
          className={classes.breadcrumbButton}
          title={`Aller vers Séquence`}
        >
          Séquence
        </button>
        <button
          className={`${classes.breadcrumbButton} ${classes.subsequenceButton}`}
          type="button"
          title={`Aller vers Sous-Séquence`}
        >
          Sous-Séquence
        </button>
      </div>
    </div>
  )
}

const useStyles = tss.create(() => ({
  root: {
    color: 'black',
    marginTop: '0.3em',
  },
  breadcrumbButton: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    textTransform: 'uppercase',
    fontSize: '95%',
    '&:hover': {
      fontWeight: 'bold',
    },

    '&::before': {
      content: "'\u3009'",
      marginRight: '0.8em',
      fontWeight: 'bold',
    },
  },
  subsequenceButton: {
    '&::before': {
      content: "'\u3009'",
      marginRight: '0.9em',
      fontWeight: 'bold',
    },

    marginLeft: '0.8em',
    display: 'inline',
    paddingBottom: '3px',
    borderBottom: `2px solid #085394`,
  },
}))
