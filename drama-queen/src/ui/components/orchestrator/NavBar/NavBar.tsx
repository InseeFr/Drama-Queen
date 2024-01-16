import { tss } from 'tss-react/mui'
import { PrevNext } from '../buttons/PrevNext/PrevNext'

type NavBarProps = {
  page: string
  maxPage: string
  subPage: number | undefined
  nbSubPages: number | undefined
  goPrevious: () => void
  goNext: (payload?: {} | undefined) => void
}

export function NavBar(props: NavBarProps) {
  const { page, maxPage, subPage, nbSubPages, goPrevious, goNext } = props
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

  function displayPage(pageType: {
    current: string | number | undefined
    max: string | number | undefined
  }) {
    if (pageType.current !== undefined) {
      return (
        <div className={classes.page}>
          <div className={classes.labelPage}>n° page</div>
          <div>
            <b>
              {pageType.current} / {pageType.max}
            </b>
          </div>
        </div>
      )
    }
  }

  return (
    <div className={classes.root}>
      {displayPages.map((pageType) => displayPage(pageType))}
      <PrevNext goPrevious={goPrevious} goNext={goNext} />
    </div>
  )
}

const useStyles = tss.create(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: '2em',
    paddingBottom: '2em',
    alignItems: 'center',
    borderLeft: '1px solid #777777',
    width: '60px',
  },
  page: {
    marginTop: '0.3em',
    paddingTop: '0.3em',
    paddingBottom: '0.3em',
    fontSize: '80%',
    textAlign: 'center',
    borderRadius: '5px',
    width: '57px',
    backgroundColor: 'white',
  },
  labelPage: { fontSize: '90%', marginBottom: '4px' },
}))
